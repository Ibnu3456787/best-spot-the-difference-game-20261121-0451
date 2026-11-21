// DualPanelRenderer: the two pictures side by side. One file, one job:
// paint the scene twice (original left, altered right), draw the markers
// on every found difference, and run the find/hint/wrong effects.
// Each panel is painted once to an offscreen canvas per scene; every frame
// only blits the cache and draws the live effects on top.
import { COLORS, PANEL_H, PANEL_W, TIMING } from './config.js';

export class DualPanelRenderer {
  constructor(leftCanvas, rightCanvas) {
    this.left = leftCanvas;
    this.right = rightCanvas;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    for (const c of [leftCanvas, rightCanvas]) {
      c.width = PANEL_W * this.dpr;
      c.height = PANEL_H * this.dpr;
    }
    this.cacheLeft = null;
    this.cacheRight = null;
    this.effects = [];
    this.sceneId = null;
  }

  loadScene(scene) {
    this.sceneId = scene.id;
    this.effects = [];
    this.cacheLeft = this.paintOffscreen(scene, new Set());
    const all = new Set(scene.differences.map((d) => d.id));
    this.cacheRight = this.paintOffscreen(scene, all);
  }

  paintOffscreen(scene, variant) {
    const c = document.createElement('canvas');
    c.width = PANEL_W * this.dpr;
    c.height = PANEL_H * this.dpr;
    const ctx = c.getContext('2d');
    ctx.scale(this.dpr, this.dpr);
    scene.paint(ctx, variant);
    return c;
  }

  /** A burst of golden sparks where a difference was found. */
  burst(x, y, now) {
    const parts = [];
    for (let i = 0; i < 14; i += 1) {
      const a = (Math.PI * 2 * i) / 14;
      parts.push({ a, speed: 30 + (i % 5) * 14, size: 2 + (i % 3) });
    }
    this.effects.push({ type: 'burst', x, y, t0: now, parts });
  }

  /** A red X flash where a wrong click landed (on the clicked panel only). */
  wrongMark(x, y, now, canvas) {
    this.effects.push({ type: 'wrong', x, y, t0: now, canvas });
  }

  draw(engine, now) {
    if (!this.cacheLeft || !engine.scene) return;
    const registry = engine.registry;
    const found = registry ? registry.foundList() : [];
    this.drawPanel(this.left, this.cacheLeft, found, engine, now);
    this.drawPanel(this.right, this.cacheRight, found, engine, now);
    this.effects = this.effects.filter((e) => now - e.t0 < TIMING.confettiMs);
  }

  drawPanel(canvas, cache, found, engine, now) {
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cache, 0, 0);
    ctx.scale(this.dpr, this.dpr);
    // Found markers: a golden ring with a check, pulsing briefly after the find.
    // A difference may set markR to decouple its marker size from its hit radius.
    for (const d of found) {
      const age = now - (d.foundAt || 0);
      const pulse = age < TIMING.markerPulseMs ? 1 + 0.25 * Math.sin((age / TIMING.markerPulseMs) * Math.PI) : 1;
      const mr = d.markR || d.r;
      const r = mr * pulse;
      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS.foundRing;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(d.x, d.y, r + 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 180, 0, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = COLORS.found;
      ctx.beginPath();
      ctx.arc(d.x + mr * 0.7, d.y - mr * 0.7, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1c2420';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(d.x + mr * 0.7 - 4, d.y - mr * 0.7);
      ctx.lineTo(d.x + mr * 0.7 - 1, d.y - mr * 0.7 + 3.5);
      ctx.lineTo(d.x + mr * 0.7 + 4.5, d.y - mr * 0.7 - 3.5);
      ctx.stroke();
    }
    // HintBeacon: a breathing cyan ring around the hinted difference.
    if (engine.hintActive && engine.hintTarget) {
      const d = engine.hintTarget;
      const mr = d.markR || d.r;
      const breathe = 1 + 0.12 * Math.sin(now / 180);
      ctx.beginPath();
      ctx.arc(d.x, d.y, mr * breathe + 6, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS.hint;
      ctx.lineWidth = 3.5;
      ctx.setLineDash([10, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(d.x, d.y, mr * breathe + 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(89, 216, 255, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    // Effects: bursts on both panels, wrong marks on the clicked panel only.
    for (const e of this.effects) {
      const t = (now - e.t0) / TIMING.confettiMs;
      if (e.type === 'burst') {
        for (const p of e.parts) {
          const dist = p.speed * t * 1.4;
          ctx.fillStyle = `rgba(255, 200, 60, ${1 - t})`;
          ctx.beginPath();
          ctx.arc(e.x + Math.cos(p.a) * dist, e.y + Math.sin(p.a) * dist, p.size * (1 - t * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (e.type === 'wrong' && canvas === e.canvas) {
        ctx.strokeStyle = `rgba(255, 93, 77, ${1 - t})`;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        const s = 10;
        ctx.beginPath();
        ctx.moveTo(e.x - s, e.y - s);
        ctx.lineTo(e.x + s, e.y + s);
        ctx.moveTo(e.x + s, e.y - s);
        ctx.lineTo(e.x - s, e.y + s);
        ctx.stroke();
      }
    }
  }
}
