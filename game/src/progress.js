// StarLedger: the player's museum record. One file, one job: persist stars,
// best times and total finds in localStorage, and read them back safely.
import { STORAGE_KEY } from './config.js';

function blank() {
  return { stars: {}, bestTime: {}, totalFinds: 0, scenesCleared: 0, muted: false };
}

export class StarLedger {
  constructor() {
    this.data = blank();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') this.data = { ...blank(), ...parsed };
      }
    } catch {
      this.data = blank();
    }
  }

  save() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      /* storage unavailable: the game still plays */
    }
  }

  starsFor(sceneId) {
    return this.data.stars[sceneId] || 0;
  }

  bestTimeFor(sceneId) {
    return this.data.bestTime[sceneId] ?? null;
  }

  totalStars() {
    return Object.values(this.data.stars).reduce((a, b) => a + b, 0);
  }

  recordClear(sceneId, stars, secondsUsed) {
    const prev = this.starsFor(sceneId);
    this.data.stars[sceneId] = Math.max(prev, stars);
    const best = this.data.bestTime[sceneId];
    if (best === undefined || secondsUsed < best) this.data.bestTime[sceneId] = secondsUsed;
    if (prev === 0) this.data.scenesCleared += 1;
    this.save();
  }

  recordFind() {
    this.data.totalFinds += 1;
    this.save();
  }
}
