// GameEngine: the hunt's rules. One file, one job: state, timer, combo,
// hints and scoring. It knows nothing about the DOM or the canvas; the
// renderer and the HUD read its state and it fires events they subscribe to.
import { HINTS_PER_SCENE, SCORING, TIMING } from './config.js';
import { DifferenceRegistry } from './differences.js';

export const STATE_MENU = 'menu';
export const STATE_PLAYING = 'playing';
export const STATE_PAUSED = 'paused';
export const STATE_COMPLETE = 'complete';
export const STATE_TIMEUP = 'timeup';

export class GameEngine {
  constructor(sound, ledger) {
    this.sound = sound;
    this.ledger = ledger;
    this.state = STATE_MENU;
    this.scene = null;
    this.registry = null;
    this.score = 0;
    this.combo = 0;
    this.bestCombo = 0;
    this.lastFindAt = 0;
    this.hintsLeft = HINTS_PER_SCENE;
    this.hintsUsed = 0;
    this.hintReadyAt = 0;
    this.hintTarget = null;
    this.hintUntil = 0;
    this.wrongs = 0;
    this.timeLeft = 0;
    this.startedAt = 0;
    this.listeners = {};
  }

  on(event, fn) {
    (this.listeners[event] ||= []).push(fn);
  }

  emit(event, data) {
    for (const fn of this.listeners[event] || []) fn(data);
  }

  startScene(scene, now = performance.now()) {
    this.scene = scene;
    this.registry = new DifferenceRegistry(scene.differences);
    this.score = 0;
    this.combo = 0;
    this.bestCombo = 0;
    this.lastFindAt = 0;
    this.hintsLeft = HINTS_PER_SCENE;
    this.hintsUsed = 0;
    this.hintReadyAt = 0;
    this.hintTarget = null;
    this.hintUntil = 0;
    this.wrongs = 0;
    this.timeLeft = scene.timeLimit;
    this.startedAt = now;
    this.state = STATE_PLAYING;
    this.emit('scene', { scene });
  }

  get timeLimit() {
    return this.scene ? this.scene.timeLimit : 0;
  }

  get timeFraction() {
    return this.timeLimit ? Math.max(0, this.timeLeft / this.timeLimit) : 0;
  }

  get hintCooldownLeft() {
    return Math.max(0, this.hintReadyAt - performance.now());
  }

  get hintActive() {
    return this.hintTarget !== null && performance.now() < this.hintUntil;
  }

  /** Advance the clock by dt seconds. Returns true when time runs out. */
  update(dt, now = performance.now()) {
    if (this.state !== STATE_PLAYING) return false;
    const before = this.timeLeft;
    this.timeLeft = Math.max(0, this.timeLeft - dt);
    if (this.timeLeft <= 10 && before > 10) this.emit('lowtime', {});
    if (this.timeLeft <= 10 && Math.ceil(before) !== Math.ceil(this.timeLeft)) this.sound.tick();
    if (this.timeLeft <= 0) {
      this.state = STATE_TIMEUP;
      this.emit('timeup', { found: this.registry.foundCount, total: this.registry.total });
      return true;
    }
    return false;
  }

  /** A click at panel coordinates. Returns the found difference or null. */
  clickAt(x, y, now = performance.now()) {
    if (this.state !== STATE_PLAYING) return null;
    const diff = this.registry.hitAt(x, y);
    if (!diff) {
      this.wrongs += 1;
      this.combo = 0;
      this.score = Math.max(0, this.score - SCORING.wrongCost);
      this.timeLeft = Math.max(0, this.timeLeft - TIMING.wrongPenaltySec);
      this.sound.wrong();
      this.emit('wrong', { x, y });
      return null;
    }
    this.registry.markFound(diff.id);
    this.ledger.recordFind();
    const chained = now - this.lastFindAt <= TIMING.comboWindowMs;
    this.combo = chained ? this.combo + 1 : 1;
    this.bestCombo = Math.max(this.bestCombo, this.combo);
    this.lastFindAt = now;
    const gained = SCORING.findBase + SCORING.comboStep * (this.combo - 1);
    this.score += gained;
    this.sound.find(this.combo);
    this.emit('found', { diff, gained, combo: this.combo });
    if (this.registry.done) this.complete(now);
    return diff;
  }

  /** HintBeacon: pulse a ring around the next unfound difference. */
  useHint(now = performance.now()) {
    if (this.state !== STATE_PLAYING) return null;
    if (this.hintsLeft <= 0) return null;
    if (now < this.hintReadyAt) return null;
    const diff = this.registry.nextUnfound();
    if (!diff) return null;
    this.hintsLeft -= 1;
    this.hintsUsed += 1;
    this.score = Math.max(0, this.score - SCORING.hintCost);
    this.hintTarget = diff;
    this.hintUntil = now + 3000;
    this.hintReadyAt = now + TIMING.hintCooldownMs;
    this.sound.hint();
    this.emit('hint', { diff });
    return diff;
  }

  complete(now = performance.now()) {
    this.state = STATE_COMPLETE;
    const secondsUsed = Math.round(this.scene.timeLimit - this.timeLeft);
    const timeBonus = Math.round(this.timeLeft) * SCORING.timeBonusPerSec;
    this.score += timeBonus;
    const fraction = this.timeLeft / this.scene.timeLimit;
    const stars = fraction >= 0.4 ? 3 : fraction >= 0.2 ? 2 : 1;
    this.ledger.recordClear(this.scene.id, stars, secondsUsed);
    this.sound.fanfare();
    this.emit('complete', {
      scene: this.scene,
      score: this.score,
      stars,
      timeBonus,
      secondsUsed,
      wrongs: this.wrongs,
      hintsUsed: this.hintsUsed,
      bestCombo: this.bestCombo,
    });
  }

  pause() {
    if (this.state === STATE_PLAYING) {
      this.state = STATE_PAUSED;
      this.emit('pause', {});
    }
  }

  resume() {
    if (this.state === STATE_PAUSED) {
      this.state = STATE_PLAYING;
      this.emit('resume', {});
    }
  }

  toMenu() {
    this.state = STATE_MENU;
    this.scene = null;
    this.registry = null;
    this.emit('menu', {});
  }
}
