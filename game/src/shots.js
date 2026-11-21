// ShotStager: the screenshot scenes behind ?shot=cover|start|hint|end.
// One file, one job: stage real game states for the camera. Each scene plays
// the real rules forward — real clicks through the engine, real scoring —
// from a fixed seed, so the same URL always gives the same frame.
// ?shot=start shows the title; cover/hint/end stage a hunt mid-flight.
import { SCENES } from './scenes/index.js';
import { hashSeed } from './random.js';

function clickDiffs(engine, renderer, count, now) {
  const diffs = engine.registry.all.slice(0, count);
  let t = now;
  for (const d of diffs) {
    t += 1200;
    const found = engine.clickAt(d.x, d.y, t);
    if (found) {
      found.foundAt = t;
      renderer.burst(d.x, d.y, t);
    }
  }
  return t;
}

/**
 * Stage the named shot and return the screen to show.
 * The caller mutes sound during staging and freezes the timer afterwards.
 */
export function stageShot(name, app, seedText) {
  const { engine, renderer, hud, sound } = app;
  const seed = hashSeed(seedText || '1');
  sound.muted = true;
  const now = performance.now();
  if (name === 'hint') {
    const scene = SCENES[3]; // The Glasshouse: green, bright, reads well small.
    engine.startScene(scene, now);
    renderer.loadScene(scene);
    hud.buildDots(scene.differences.length);
    clickDiffs(engine, renderer, 2, now);
    engine.timeLeft = 200;
    const diff = engine.useHint(now + 5000);
    if (diff) engine.hintUntil = now + 60000; // hold the beacon for the camera
    engine.state = 'paused';
    return 'play';
  }
  if (name === 'end') {
    const scene = SCENES[0]; // The Kitchen at Dawn: the first exhibit.
    engine.startScene(scene, now);
    renderer.loadScene(scene);
    hud.buildDots(scene.differences.length);
    clickDiffs(engine, renderer, scene.differences.length - 1, now);
    engine.timeLeft = 96; // a strong clear: 84 seconds used, 3 stars
    const last = engine.registry.all[scene.differences.length - 1];
    const t = now + scene.differences.length * 1200;
    const found = engine.clickAt(last.x, last.y, t);
    if (found) {
      found.foundAt = t;
      renderer.burst(last.x, last.y, t);
    }
    return 'complete';
  }
  if (name === 'cover') {
    const scene = SCENES[2]; // The Night Market: the richest, most colourful scene.
    engine.startScene(scene, now);
    renderer.loadScene(scene);
    hud.buildDots(scene.differences.length);
    clickDiffs(engine, renderer, 4, now);
    engine.timeLeft = 142;
    engine.state = 'paused';
    return 'play';
  }
  return 'menu';
}
