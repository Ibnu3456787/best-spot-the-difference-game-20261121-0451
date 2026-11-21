// Scene 2 — The Captain's Study. Wing 1, gentle. 8 differences.
// A sea captain's desk: globe, ship painting, telescope, compass, lamp.
import { backdrop, circle, drawCat, ellipse, framedPicture, line, poly, rect, roundRect, star, text } from '../props.js';

export const study = {
  id: 'study',
  title: "The Captain's Study",
  subtitle: 'Wing 1 · Gentle · 8 differences',
  timeLimit: 180,
  differences: [
    { id: 'globe', x: 112, y: 198, r: 28, label: 'the globe' },
    { id: 'book', x: 409, y: 91, r: 20, label: 'a book spine' },
    { id: 'lamp', x: 300, y: 240, r: 38, label: 'the desk lamp' },
    { id: 'scope', x: 484, y: 262, r: 40, label: 'the telescope' },
    { id: 'needle', x: 202, y: 300, r: 20, label: 'the compass needle' },
    { id: 'sail', x: 98, y: 88, r: 32, label: 'a sail on the painting' },
    { id: 'anchor', x: 502, y: 98, r: 32, label: 'the wall anchor' },
    { id: 'ink', x: 332, y: 270, r: 20, label: 'the ink bottle' },
  ],
  paint(ctx, v) {
    backdrop(ctx, 560, 400, '#e8d9b8', '#d9c49a', 320, '#7a5a34');
    // Ship painting.
    framedPicture(ctx, 44, 40, 120, 92, '#7fb3d5');
    poly(ctx, [[80, 108], [80, 66], [104, 108]], '#f4ead6');
    if (!v.has('sail')) poly(ctx, [[108, 108], [108, 74], [128, 108]], '#f4ead6');
    poly(ctx, [[64, 108], [140, 108], [132, 120], [72, 120]], '#5a4632');
    line(ctx, 44, 118, 164, 118, '#3f6d8e', 3);
    // Anchor on the wall.
    if (!v.has('anchor')) {
      ctx.strokeStyle = '#3a3a44';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(502, 78, 9, 0, Math.PI * 2);
      ctx.stroke();
      line(ctx, 502, 87, 502, 118, '#3a3a44', 5);
      line(ctx, 486, 104, 518, 104, '#3a3a44', 5);
      ctx.beginPath();
      ctx.moveTo(488, 108);
      ctx.quadraticCurveTo(502, 128, 516, 108);
      ctx.stroke();
    }
    // Bookshelf.
    rect(ctx, 340, 60, 140, 120, '#6b4f2a');
    rect(ctx, 348, 68, 124, 44, '#4a3413');
    const spines = ['#b5523a', '#3f6d8e', '#2f7a4d', '#c9a227', '#7a4a8e'];
    for (let i = 0; i < 5; i += 1) {
      const col = i === 2 && v.has('book') ? '#7dbb4a' : spines[i];
      rect(ctx, 354 + i * 23, 74, 18, 34, col);
    }
    rect(ctx, 348, 124, 124, 44, '#4a3413');
    for (let i = 0; i < 4; i += 1) rect(ctx, 354 + i * 28, 132, 22, 30, spines[(i + 2) % 5]);
    // Globe on its stand.
    circle(ctx, 112, 198, 34, '#7fb3d5', '#5a4632');
    if (v.has('globe')) {
      ellipse(ctx, 104, 192, 12, 18, '#7dbb4a');
      ellipse(ctx, 124, 210, 9, 12, '#7dbb4a');
    } else {
      ellipse(ctx, 118, 190, 14, 16, '#7dbb4a');
      ellipse(ctx, 100, 212, 8, 10, '#e8c86a');
    }
    line(ctx, 112, 232, 112, 252, '#5a4632', 5);
    ellipse(ctx, 112, 256, 26, 6, '#5a4632');
    // Desk.
    rect(ctx, 60, 268, 440, 16, '#6b4f2a');
    rect(ctx, 76, 284, 16, 36, '#4a3413');
    rect(ctx, 468, 284, 16, 36, '#4a3413');
    rect(ctx, 150, 284, 120, 36, '#7a5a28');
    circle(ctx, 210, 302, 4, '#c9a227');
    // Desk lamp.
    line(ctx, 300, 268, 300, 216, '#3a3a44', 5);
    poly(ctx, [[282, 216], [318, 216], [310, 196], [290, 196]], '#2f7a4d');
    if (!v.has('lamp')) {
      ctx.fillStyle = 'rgba(255, 217, 77, 0.25)';
      ctx.beginPath();
      ctx.moveTo(290, 216);
      ctx.lineTo(310, 216);
      ctx.lineTo(336, 268);
      ctx.lineTo(264, 268);
      ctx.closePath();
      ctx.fill();
      circle(ctx, 300, 220, 5, '#ffd94d');
    }
    // Compass.
    circle(ctx, 202, 300, 20, '#fff8e6', '#7a5a28');
    text(ctx, 'N', 202, 288, 10, '#b5523a');
    if (v.has('needle')) {
      line(ctx, 202, 300, 202, 314, '#b5523a', 3);
      line(ctx, 202, 300, 202, 288, '#1c2420', 3);
    } else {
      line(ctx, 202, 300, 202, 286, '#b5523a', 3);
      line(ctx, 202, 300, 202, 314, '#1c2420', 3);
    }
    // Ink bottle.
    if (!v.has('ink')) {
      rect(ctx, 324, 262, 16, 20, '#1c2a4a');
      rect(ctx, 328, 256, 8, 6, '#0e1626');
    }
    // Telescope on a tripod.
    ctx.save();
    ctx.translate(482, 262);
    ctx.rotate(v.has('scope') ? 0.5 : -0.35);
    roundRect(ctx, -34, -8, 68, 16, 6, '#8a6d1f', '#5a4632');
    circle(ctx, 34, 0, 9, '#3f6d8e');
    ctx.restore();
    line(ctx, 482, 272, 466, 320, '#5a4632', 4);
    line(ctx, 482, 272, 498, 320, '#5a4632', 4);
    line(ctx, 482, 272, 482, 320, '#5a4632', 4);
    // Cat asleep under the desk.
    drawCat(ctx, 420, 330, 0.6, '#8a6d45');
    text(ctx, 'EST. 1897', 280, 380, 13, 'rgba(0,0,0,0.35)', 'center', '400');
  },
};
