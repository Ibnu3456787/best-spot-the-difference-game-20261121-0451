// Scene 1 — The Kitchen at Dawn. Wing 1, gentle. 7 differences.
// A sunny kitchen: window, kettle, pans, a cat on a chair, a fruit bowl.
import { backdrop, circle, drawBird, drawCat, drawPlant, ellipse, framedPicture, line, poly, rect, roundRect, star, text } from '../props.js';

export const kitchen = {
  id: 'kitchen',
  title: 'The Kitchen at Dawn',
  subtitle: 'Wing 1 · Gentle · 7 differences',
  timeLimit: 180,
  differences: [
    { id: 'cat', x: 118, y: 264, r: 36, label: 'the cat on the chair' },
    { id: 'steam', x: 432, y: 145, r: 36, label: 'the kettle steam' },
    { id: 'apple', x: 286, y: 242, r: 26, label: 'an apple in the bowl' },
    { id: 'clock', x: 484, y: 66, r: 26, label: 'the clock hands' },
    { id: 'leaf', x: 70, y: 210, r: 30, label: 'a leaf on the plant' },
    { id: 'pan', x: 202, y: 118, r: 24, label: 'the hanging pan' },
    { id: 'bird', x: 96, y: 142, r: 22, label: 'the bird on the sill' },
  ],
  paint(ctx, v) {
    backdrop(ctx, 560, 400, '#f7e8c8', '#eed9a8', 320, '#b98a52');
    // Window with morning sun.
    framedPicture(ctx, 40, 36, 130, 110, '#a8d8f0');
    circle(ctx, 140, 66, 18, '#ffd94d');
    for (let i = 0; i < 8; i += 1) {
      const a = (Math.PI * 2 * i) / 8;
      line(ctx, 140 + Math.cos(a) * 22, 66 + Math.sin(a) * 22, 140 + Math.cos(a) * 30, 66 + Math.sin(a) * 30, '#ffd94d', 3);
    }
    line(ctx, 105, 36, 105, 146, '#7a5a28', 4);
    line(ctx, 40, 91, 170, 91, '#7a5a28', 4);
    rect(ctx, 32, 146, 146, 8, '#7a5a28');
    if (!v.has('bird')) drawBird(ctx, 96, 140, 0.9, '#4a6fa5');
    // Wall clock.
    circle(ctx, 484, 66, 26, '#fff8e6', '#7a5a28');
    circle(ctx, 484, 66, 3, '#1c2420');
    if (v.has('clock')) {
      line(ctx, 484, 66, 484, 48, '#1c2420', 3);
      line(ctx, 484, 66, 500, 66, '#1c2420', 3);
    } else {
      line(ctx, 484, 66, 484, 48, '#1c2420', 3);
      line(ctx, 484, 66, 468, 66, '#1c2420', 3);
    }
    // Hanging pans on a rail.
    line(ctx, 180, 96, 300, 96, '#5a4632', 4);
    circle(ctx, 202, 122, 18, v.has('pan') ? '#b8c4c9' : '#c96f3a', '#5a4632');
    circle(ctx, 202, 122, 7, 'rgba(0,0,0,0.15)');
    circle(ctx, 248, 122, 16, '#3f6d8e', '#5a4632');
    circle(ctx, 248, 122, 6, 'rgba(0,0,0,0.15)');
    // Plant on the counter.
    rect(ctx, 30, 236, 130, 84, '#8a6d45');
    rect(ctx, 30, 236, 130, 10, '#a8845a');
    drawPlant(ctx, 66, 232, 1.1, v.has('leaf') ? 4 : 5, '#b5523a');
    // Table with fruit bowl.
    rect(ctx, 210, 250, 180, 14, '#7a5a28');
    rect(ctx, 228, 264, 12, 56, '#5a4632');
    rect(ctx, 360, 264, 12, 56, '#5a4632');
    ellipse(ctx, 280, 250, 46, 14, '#3f6d8e');
    circle(ctx, 262, 238, 11, '#d64541');
    circle(ctx, 280, 232, 11, '#e8a13a');
    if (!v.has('apple')) circle(ctx, 298, 238, 11, '#7dbb4a');
    // Kettle on the stove.
    rect(ctx, 390, 240, 120, 80, '#4a4a52');
    rect(ctx, 398, 232, 104, 10, '#2c2c33');
    ellipse(ctx, 450, 216, 34, 22, '#c9a227', '#7a5a28');
    circle(ctx, 450, 192, 6, '#7a5a28');
    poly(ctx, [[480, 208], [500, 196], [498, 214]], '#c9a227');
    if (!v.has('steam')) {
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(430, 178);
      ctx.quadraticCurveTo(420, 158, 432, 142);
      ctx.quadraticCurveTo(442, 128, 432, 112);
      ctx.stroke();
    }
    // Chair with the cat.
    rect(ctx, 88, 280, 60, 8, '#7a5a28');
    rect(ctx, 94, 288, 8, 32, '#5a4632');
    rect(ctx, 134, 288, 8, 32, '#5a4632');
    rect(ctx, 88, 250, 8, 32, '#5a4632');
    if (!v.has('cat')) drawCat(ctx, 118, 272, 0.85, '#3a3a44');
    // Rug.
    ellipse(ctx, 300, 366, 150, 22, '#b5523a');
    ellipse(ctx, 300, 366, 110, 14, '#d9cbae');
    star(ctx, 300, 366, 8, 5, '#c9a227');
    text(ctx, 'dawn', 500, 380, 13, 'rgba(0,0,0,0.35)', 'right', '400');
  },
};
