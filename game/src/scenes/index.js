// Scene registry for SPOTLIGHT. One file, one job: the eight exhibits in
// order, and the daily case (one scene a day, picked by the date's seed).
import { kitchen } from './kitchen.js';
import { study } from './study.js';
import { market } from './market.js';
import { glasshouse } from './glasshouse.js';
import { clockmaker } from './clockmaker.js';
import { observatory } from './observatory.js';
import { tidepool } from './tidepool.js';
import { vault } from './vault.js';
import { hashSeed, mulberry32 } from '../random.js';

export const SCENES = [kitchen, study, market, glasshouse, clockmaker, observatory, tidepool, vault];

export function sceneById(id) {
  return SCENES.find((s) => s.id === id) || null;
}

export function totalDifferences() {
  return SCENES.reduce((sum, s) => sum + s.differences.length, 0);
}

/** The daily case: one scene, chosen deterministically from the date. */
export function dailyCase(date = new Date()) {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const rng = mulberry32(hashSeed(`spotlight-daily-${key}`));
  const index = Math.floor(rng() * SCENES.length);
  return { scene: SCENES[index], key };
}
