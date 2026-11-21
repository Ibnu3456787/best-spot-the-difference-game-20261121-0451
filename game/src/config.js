// SPOTLIGHT — The Curator's Case: shared constants.
// One file, one job: every number the game agrees on lives here.
export const PANEL_W = 560;
export const PANEL_H = 400;

export const COLORS = {
  bg: '#12211c',
  bg2: '#0c1714',
  paper: '#f4ead6',
  paperDim: '#d9cbae',
  brass: '#c9a227',
  brassBright: '#f0c94a',
  teal: '#1e5f52',
  tealDark: '#143f37',
  ink: '#1c2420',
  found: '#ffb400',
  foundRing: '#ffd94d',
  hint: '#59d8ff',
  danger: '#ff5d4d',
  good: '#7ddb6a',
};

export const TIMING = {
  hintCooldownMs: 20000,
  comboWindowMs: 8000,
  wrongPenaltySec: 5,
  markerPulseMs: 900,
  confettiMs: 1400,
};

export const SCORING = {
  findBase: 100,
  comboStep: 50,
  timeBonusPerSec: 10,
  hintCost: 25,
  wrongCost: 15,
};

export const HINTS_PER_SCENE = 3;
export const STORAGE_KEY = 'spotlight-curator-case-v1';
