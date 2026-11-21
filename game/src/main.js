// SPOTLIGHT — The Curator's Case: bootstrap and screen flow.
// One file, one job: wire the systems together, run the frame loop, and own
// the screens (menu, play, complete, time-up, pause). The rules live in the
// engine; the pixels live in the renderer; this file only connects them.
import { GameEngine, STATE_COMPLETE, STATE_MENU, STATE_PAUSED, STATE_PLAYING, STATE_TIMEUP } from './engine.js';
import { DualPanelRenderer } from './render.js';
import { HudController } from './hud.js';
import { InputController } from './input.js';
import { SoundBank } from './audio.js';
import { StarLedger } from './progress.js';
import { SCENES, dailyCase, sceneById, totalDifferences } from './scenes/index.js';
import { stageShot } from './shots.js';

const sound = new SoundBank();
const ledger = new StarLedger();
const engine = new GameEngine(sound, ledger);
const renderer = new DualPanelRenderer(
  document.getElementById('panel-left'),
  document.getElementById('panel-right'),
);
const hud = new HudController({
  totalStars: 'total-stars',
  counter: 'counter',
  remain: 'remain',
  score: 'score',
  combo: 'combo',
  timerText: 'timer-text',
  timerBar: 'timer-bar',
  hintBtn: 'hint-btn',
  dots: 'dots',
  toast: 'toast',
});

const app = { engine, renderer, hud, sound, ledger };
window.__spotlight = app;

function buildSceneGrid() {
  const grid = document.getElementById('scene-grid');
  grid.innerHTML = '';
  for (const scene of SCENES) {
    const stars = ledger.starsFor(scene.id);
    const best = ledger.bestTimeFor(scene.id);
    const card = document.createElement('button');
    card.className = 'scene-card';
    card.dataset.scene = scene.id;
    card.innerHTML =
      `<span class="scene-title">${scene.title}</span>` +
      `<span class="scene-sub">${scene.subtitle}</span>` +
      `<span class="scene-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>` +
      `<span class="scene-best">${best === null ? 'not cleared yet' : `best ${Math.floor(best / 60)}:${String(best % 60).padStart(2, '0')}`}</span>`;
    card.addEventListener('click', () => {
      sound.click();
      startScene(scene.id);
    });
    grid.appendChild(card);
  }
  const total = document.getElementById('total-diffs');
  if (total) total.textContent = `${totalDifferences()} differences across ${SCENES.length} exhibits`;
}

function startScene(id) {
  const scene = sceneById(id);
  if (!scene) return;
  engine.startScene(scene);
  renderer.loadScene(scene);
  hud.buildDots(scene.differences.length);
  document.getElementById('scene-name').textContent = scene.title;
  hud.show('play');
  hud.toast(`Find all ${scene.differences.length} differences — good hunting, Curator.`);
}

function startDaily() {
  const { scene } = dailyCase();
  sound.click();
  startScene(scene.id);
}

function fillComplete(data) {
  document.getElementById('complete-title').textContent = `${data.scene.title} — restored!`;
  document.getElementById('complete-stars').textContent = '★'.repeat(data.stars) + '☆'.repeat(3 - data.stars);
  document.getElementById('complete-score').textContent = data.score.toLocaleString('en-US');
  const mm = String(Math.floor(data.secondsUsed / 60)).padStart(2, '0');
  const ss = String(data.secondsUsed % 60).padStart(2, '0');
  document.getElementById('complete-stats').textContent =
    `Time ${mm}:${ss} · Time bonus +${data.timeBonus} · Best combo ×${data.bestCombo} · ` +
    `Wrong clicks ${data.wrongs} · Hints used ${data.hintsUsed}`;
  const idx = SCENES.findIndex((s) => s.id === data.scene.id);
  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = idx >= 0 && idx < SCENES.length - 1 ? '' : 'none';
  nextBtn.onclick = () => {
    sound.click();
    startScene(SCENES[idx + 1].id);
  };
}

function fillTimeUp(data) {
  document.getElementById('timeup-text').textContent =
    `Time ran out with ${data.found} of ${data.total} differences found. The exhibit waits — try again.`;
}

const actions = {
  hint() {
    if (engine.state !== STATE_PLAYING) return;
    const diff = engine.useHint();
    if (!diff && engine.hintsLeft <= 0) hud.toast('No hints left in this exhibit.');
  },
  togglePause() {
    if (engine.state === STATE_PLAYING) {
      engine.pause();
      hud.show('pause');
    } else if (engine.state === STATE_PAUSED) {
      engine.resume();
      hud.show('play');
    }
  },
  toggleMute() {
    sound.muted = !sound.muted;
    ledger.data.muted = sound.muted;
    ledger.save();
    document.getElementById('mute-btn').textContent = sound.muted ? '🔇 Sound off' : '🔊 Sound on';
  },
  escape() {
    if (engine.state === STATE_PLAYING || engine.state === STATE_PAUSED) {
      engine.toMenu();
      buildSceneGrid();
      hud.show('menu');
    }
  },
  pickScene(index) {
    if (engine.state === STATE_MENU && SCENES[index]) startScene(SCENES[index].id);
  },
};

new InputController(document.getElementById('panel-left'), document.getElementById('panel-right'), engine, renderer, actions);

engine.on('found', ({ diff, gained, combo }) => {
  hud.toast(combo > 1 ? `Found: ${diff.label} — +${gained} (combo ×${combo})` : `Found: ${diff.label} — +${gained}`);
});
engine.on('wrong', () => hud.toast('Not quite — 5 seconds lost. Look closer.'));
engine.on('hint', ({ diff }) => hud.toast(`Hint: look near "${diff.label}"…`));
engine.on('lowtime', () => hud.toast('Ten seconds left — hurry, Curator!'));
engine.on('complete', (data) => {
  fillComplete(data);
  buildSceneGrid();
  hud.show('complete');
});
engine.on('timeup', (data) => {
  fillTimeUp(data);
  hud.show('timeup');
});

document.getElementById('hint-btn').addEventListener('click', () => actions.hint());
document.getElementById('pause-btn').addEventListener('click', () => actions.togglePause());
document.getElementById('menu-btn').addEventListener('click', () => actions.escape());
document.getElementById('mute-btn').addEventListener('click', () => actions.toggleMute());
document.getElementById('daily-btn').addEventListener('click', startDaily);
document.getElementById('resume-btn').addEventListener('click', () => actions.togglePause());
document.getElementById('retry-btn').addEventListener('click', () => {
  sound.click();
  if (engine.scene) startScene(engine.scene.id);
});
document.getElementById('complete-menu-btn').addEventListener('click', () => {
  sound.click();
  engine.toMenu();
  buildSceneGrid();
  hud.show('menu');
});
document.getElementById('timeup-menu-btn').addEventListener('click', () => {
  sound.click();
  engine.toMenu();
  buildSceneGrid();
  hud.show('menu');
});
document.getElementById('pause-menu-btn').addEventListener('click', () => {
  sound.click();
  engine.toMenu();
  buildSceneGrid();
  hud.show('menu');
});

if (ledger.data.muted) {
  sound.muted = true;
  document.getElementById('mute-btn').textContent = '🔇 Sound off';
}

buildSceneGrid();

// Screenshot staging: ?shot=cover|start|hint|end&seed=N
const params = new URLSearchParams(window.location.search);
const shot = params.get('shot');
if (shot && shot !== 'start') {
  const screen = stageShot(shot, app, params.get('seed') || '1');
  if (shot === 'end') {
    // stageShot already completed the scene; the complete event fired.
  } else {
    document.getElementById('scene-name').textContent = engine.scene.title;
    hud.show(screen);
  }
} else {
  hud.show('menu');
}
hud.update(engine, ledger);

// Frame loop: advance the clock, repaint the panels, refresh the HUD.
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  engine.update(dt, now);
  renderer.draw(engine, now);
  hud.update(engine, ledger);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
