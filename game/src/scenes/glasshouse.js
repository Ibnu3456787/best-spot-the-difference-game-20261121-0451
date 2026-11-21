// Scene 4 — The Glasshouse. Wing 2, lively. 10 differences.
// A greenhouse of plants, pots, a bench, a watering can and one butterfly.
import { backdrop, circle, drawPlant, ellipse, line, poly, rect, roundRect, star, text } from '../props.js';

export const glasshouse = {
  id: 'glasshouse',
  title: 'The Glasshouse',
  subtitle: 'Wing 2 · Lively · 10 differences',
  timeLimit: 240,
  differences: [
    { id: 'butterfly', x: 402, y: 122, r: 20, label: 'the butterfly' },
    { id: 'drops', x: 202, y: 280, r: 28, label: 'water drops' },
    { id: 'flower', x: 302, y: 202, r: 20, label: 'the flower' },
    { id: 'pot', x: 510, y: 312, r: 28, label: 'a clay pot' },
    { id: 'vine', x: 58, y: 62, r: 22, label: 'a vine leaf' },
    { id: 'sun', x: 72, y: 62, r: 36, label: 'the sun' },
    { id: 'cushion', x: 355, y: 303, r: 46, label: 'the bench cushion' },
    { id: 'trowel', x: 242, y: 334, r: 20, label: 'the trowel' },
    { id: 'bee', x: 462, y: 182, r: 16, label: 'the bee' },
    { id: 'crack', x: 522, y: 92, r: 18, label: 'a cracked pane' },
  ],
  paint(ctx, v) {
    backdrop(ctx, 560, 400, '#cfe8d8', '#a8d5b5', 330, '#8a6d45');
    // Glasshouse frame.
    ctx.strokeStyle = '#4a6b52';
    ctx.lineWidth = 5;
    ctx.strokeRect(14, 14, 532, 316);
    for (let i = 1; i < 4; i += 1) line(ctx, 14 + i * 133, 14, 14 + i * 133, 330, '#4a6b52', 4);
    line(ctx, 14, 130, 546, 130, '#4a6b52', 4);
    // Sun through the glass.
    circle(ctx, 72, 62, 20, '#ffd94d');
    const rays = v.has('sun') ? 6 : 8;
    for (let i = 0; i < rays; i += 1) {
      const a = (Math.PI * 2 * i) / rays;
      line(ctx, 72 + Math.cos(a) * 25, 62 + Math.sin(a) * 25, 72 + Math.cos(a) * 33, 62 + Math.sin(a) * 33, '#ffd94d', 3);
    }
    // Cracked pane.
    if (v.has('crack')) {
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(522, 92);
      ctx.lineTo(510, 80);
      ctx.moveTo(522, 92);
      ctx.lineTo(534, 80);
      ctx.moveTo(522, 92);
      ctx.lineTo(522, 106);
      ctx.stroke();
    }
    // Vine climbing the left frame.
    ctx.strokeStyle = '#2f7a4d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(30, 330);
    ctx.quadraticCurveTo(60, 220, 40, 130);
    ctx.quadraticCurveTo(30, 80, 60, 50);
    ctx.stroke();
    const vineLeaves = v.has('vine') ? 4 : 5;
    const leafPts = [[44, 280], [52, 210], [38, 150], [48, 100], [58, 60]];
    for (let i = 0; i < vineLeaves; i += 1) ellipse(ctx, leafPts[i][0], leafPts[i][1], 10, 6, '#3c9a5f');
    // Flower bed.
    ellipse(ctx, 302, 250, 90, 16, '#5a4632');
    for (const [fx, fy, fc] of [[250, 210, '#e05a8a'], [280, 196, '#e8821e'], [330, 206, '#7a4a8e'], [352, 220, '#e05a8a']]) {
      line(ctx, fx, 248, fx, fy + 8, '#2f7a4d', 3);
      for (let p = 0; p < 5; p += 1) {
        const a = (Math.PI * 2 * p) / 5;
        circle(ctx, fx + Math.cos(a) * 8, fy + Math.sin(a) * 8, 6, fc);
      }
      circle(ctx, fx, fy, 5, '#ffd94d');
    }
    // The special flower.
    line(ctx, 302, 248, 302, 210, '#2f7a4d', 3);
    const fc = v.has('flower') ? '#ffd94d' : '#e05a8a';
    for (let p = 0; p < 5; p += 1) {
      const a = (Math.PI * 2 * p) / 5;
      circle(ctx, 302 + Math.cos(a) * 9, 202 + Math.sin(a) * 9, 7, fc);
    }
    circle(ctx, 302, 202, 6, v.has('flower') ? '#e05a8a' : '#ffd94d');
    // Butterfly.
    if (!v.has('butterfly')) {
      ctx.save();
      ctx.translate(402, 122);
      ellipse(ctx, -8, -4, 10, 7, '#7a4a8e', null, -0.5);
      ellipse(ctx, 8, -4, 10, 7, '#7a4a8e', null, 0.5);
      ellipse(ctx, -7, 6, 7, 5, '#a06ab8');
      ellipse(ctx, 7, 6, 7, 5, '#a06ab8');
      ellipse(ctx, 0, 0, 3, 9, '#1c2420');
      ctx.restore();
    }
    // Bee.
    if (!v.has('bee')) {
      ellipse(ctx, 462, 182, 8, 6, '#ffd94d');
      line(ctx, 459, 176, 459, 188, '#1c2420', 2);
      line(ctx, 465, 176, 465, 188, '#1c2420', 2);
      ellipse(ctx, 460, 174, 5, 3, 'rgba(255,255,255,0.7)', null, -0.4);
    }
    // Watering can with drops.
    roundRect(ctx, 150, 262, 44, 30, 6, '#3f6d8e', '#2c4f66');
    line(ctx, 194, 272, 214, 258, '#3f6d8e', 6);
    line(ctx, 150, 268, 138, 256, '#3f6d8e', 5);
    if (!v.has('drops')) {
      circle(ctx, 218, 268, 3, '#7fb3d5');
      circle(ctx, 224, 280, 3, '#7fb3d5');
      circle(ctx, 216, 292, 3, '#7fb3d5');
    }
    // Clay pots.
    drawPlant(ctx, 450, 320, 0.9, 4, '#b5523a');
    drawPlant(ctx, 482, 320, 0.9, 3, '#b5523a');
    if (!v.has('pot')) drawPlant(ctx, 514, 320, 0.9, 5, '#b5523a');
    // Bench with cushion.
    rect(ctx, 300, 310, 110, 10, '#7a5a28');
    rect(ctx, 308, 320, 8, 26, '#5a4632');
    rect(ctx, 394, 320, 8, 26, '#5a4632');
    if (!v.has('cushion')) roundRect(ctx, 312, 296, 86, 14, 6, '#e05a8a');
    // Trowel on the path.
    ctx.save();
    ctx.translate(242, 332);
    ctx.rotate(0.5);
    rect(ctx, -4, -14, 8, 18, v.has('trowel') ? '#3f6d8e' : '#b5523a');
    poly(ctx, [[-7, 4], [7, 4], [0, 20]], '#b8c4c9');
    ctx.restore();
    // Pebble path.
    for (let i = 0; i < 6; i += 1) ellipse(ctx, 60 + i * 26, 366 + (i % 2) * 8, 10, 6, '#d9cbae');
    text(ctx, 'glasshouse', 500, 384, 13, 'rgba(0,0,0,0.35)', 'right', '400');
  },
};
