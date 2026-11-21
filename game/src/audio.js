// SoundBank: every sound in SPOTLIGHT is synthesised with WebAudio.
// One file, one job: no audio files, no network, original tones only.
// Each effect is a named instrument: chime, thud, shimmer, fanfare, tick.
export class SoundBank {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  tone(freq, dur, type, gain, when = 0, slideTo = null) {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  /** The satisfying find: a bright two-note chime, pitch rising with combo. */
  find(combo = 1) {
    const lift = Math.min(combo, 8) * 30;
    this.tone(740 + lift, 0.16, 'sine', 0.22);
    this.tone(1108 + lift, 0.28, 'sine', 0.18, 0.07);
    this.tone(1480 + lift, 0.2, 'triangle', 0.07, 0.1);
  }

  /** A wrong click: a soft wooden thud, never punishing. */
  wrong() {
    this.tone(160, 0.14, 'triangle', 0.2, 0, 90);
  }

  /** A hint: a glassy shimmer that rises and settles. */
  hint() {
    this.tone(1180, 0.3, 'sine', 0.12, 0, 1760);
    this.tone(1760, 0.4, 'sine', 0.08, 0.12);
  }

  /** A scene cleared: a short brass fanfare. */
  fanfare() {
    [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.34, 'triangle', 0.16, i * 0.11));
    this.tone(1318, 0.6, 'sine', 0.12, 0.48);
  }

  /** The last-ten-seconds heartbeat. */
  tick() {
    this.tone(980, 0.07, 'square', 0.05);
  }

  click() {
    this.tone(620, 0.06, 'sine', 0.1);
  }
}
