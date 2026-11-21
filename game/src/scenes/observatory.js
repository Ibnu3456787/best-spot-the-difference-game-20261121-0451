// Scene 6 — The Observatory. Wing 3, hard. 10 differences.
// A domed observatory: telescope, star charts, a comet and a patient moon.
import { backdrop, circle, ellipse, line, poly, rect, roundRect, star, text } from '../props.js';

export const observatory = {
  id: 'observatory',
  title: 'The Observatory',
  subtitle: 'Wing 3 · Hard · 10 differences',
  timeLimit: 300,
  differences: [
    { id: 'comet', x: 390, y: 152, r: 36, label: 'the comet' },
    { id: 'stars', x: 150, y: 180, r: 20, label: 'a star in the dome' },
    { id: 'ring', x: 302, y: 122, r: 38, label: "the planet's ring" },
    { id: 'pin', x: 202, y: 222, r: 16, label: 'a pin on the chart' },
    { id: 'cap', x: 417, y: 243, r: 18, label: 'the telescope cap' },
    { id: 'books', x: 92, y: 290, r: 32, label: 'a book in the stack' },
    { id: 'crater', x: 522, y: 202, r: 20, label: 'a moon crater' },
    { id: 'rug', x: 330, y: 360, r: 30, label: 'the rug stripes' },
    { id: 'lamp', x: 482, y: 308, r: 30, label: 'the desk lamp' },
    { id: 'constellation', x: 130, y: 158, r: 42, label: 'a constellation line' },
  ],
  paint(ctx, v) {
    backdrop(ctx, 560, 400, '#141c33', '#1e2c4d', 330, '#3a2f28');
    // Dome window.
    ctx.save();
    ctx.beginPath();
    ctx.arc(280, 330, 250, Math.PI, 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = '#0b1122';
    ctx.fillRect(0, 0, 560, 330);
    // Stars inside the dome's clip circle (centre 280,330, radius 250).
    const starPts = [[150, 180], [220, 140], [280, 100], [340, 150], [420, 180], [120, 240], [200, 230], [300, 200], [380, 230], [460, 220], [240, 180], [320, 100]];
    starPts.forEach(([x, y], i) => {
      if (v.has('stars') && i === 0) return;
      star(ctx, x, y, i % 3 === 0 ? 4 : 2.5, 4, '#f4ead6');
    });
    // Constellation.
    const cons = [[90, 150], [122, 162], [150, 140], [170, 168]];
    if (!v.has('constellation')) {
      ctx.strokeStyle = 'rgba(89,216,255,0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      cons.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.stroke();
    }
    cons.forEach(([x, y]) => circle(ctx, x, y, 3, '#59d8ff'));
    // Planet with ring.
    circle(ctx, 302, 122, 20, '#d98a4a');
    ellipse(ctx, 302, 126, 12, 6, '#b56a32');
    if (!v.has('ring')) {
      ctx.strokeStyle = '#e8c86a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(302, 122, 34, 9, -0.3, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Comet, inside the dome.
    if (!v.has('comet')) {
      const g = ctx.createLinearGradient(360, 170, 410, 140);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(1, 'rgba(255,255,255,0.9)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(360, 170);
      ctx.lineTo(406, 143);
      ctx.stroke();
      circle(ctx, 410, 140, 6, '#ffffff');
    }
    ctx.restore();
    // Dome arch.
    ctx.strokeStyle = '#4a5a7a';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(280, 330, 250, Math.PI, 0);
    ctx.stroke();
    // Moon chart on the wall.
    rect(ctx, 496, 176, 48, 52, '#f4ead6', '#7a5a28');
    circle(ctx, 520, 202, 14, '#d9cbae');
    circle(ctx, 515, 197, 3, '#b8a888');
    if (!v.has('crater')) circle(ctx, 525, 207, 3, '#b8a888');
    // Star chart with pin.
    rect(ctx, 150, 190, 110, 70, '#f4ead6', '#7a5a28');
    star(ctx, 180, 215, 8, 5, '#c9a227');
    star(ctx, 220, 235, 6, 5, '#3f6d8e');
    line(ctx, 180, 215, 220, 235, '#b5523a', 2);
    line(ctx, 170, 245, 240, 245, '#b8a888', 2);
    if (!v.has('pin')) circle(ctx, 202, 222, 5, '#b5523a');
    // Telescope.
    ctx.save();
    ctx.translate(382, 262);
    ctx.rotate(-0.5);
    roundRect(ctx, -40, -9, 80, 18, 7, '#e8e4da', '#5a4632');
    if (v.has('cap')) circle(ctx, 40, 0, 9, '#b5523a');
    else circle(ctx, 40, 0, 8, '#1b2a4a');
    ctx.restore();
    line(ctx, 382, 272, 360, 330, '#5a4632', 5);
    line(ctx, 382, 272, 404, 330, '#5a4632', 5);
    line(ctx, 382, 272, 382, 330, '#5a4632', 5);
    // Book stack.
    const bookCols = ['#b5523a', '#3f6d8e', '#2f7a4d', '#c9a227'];
    const nBooks = v.has('books') ? 3 : 4;
    for (let i = 0; i < nBooks; i += 1) rect(ctx, 62, 312 - i * 12, 60, 11, bookCols[i], '#1c2420');
    // Desk lamp.
    line(ctx, 482, 330, 482, 296, '#3a3a44', 5);
    poly(ctx, [[466, 296], [498, 296], [490, 278], [474, 278]], '#2f7a4d');
    if (!v.has('lamp')) {
      ctx.fillStyle = 'rgba(255, 217, 77, 0.22)';
      ctx.beginPath();
      ctx.moveTo(474, 296);
      ctx.lineTo(490, 296);
      ctx.lineTo(510, 330);
      ctx.lineTo(454, 330);
      ctx.closePath();
      ctx.fill();
      circle(ctx, 482, 300, 5, '#ffd94d');
    }
    // Rug with stripes.
    ellipse(ctx, 282, 362, 130, 18, '#7a4a8e');
    ellipse(ctx, 282, 362, 96, 12, '#a06ab8');
    line(ctx, 220, 354, 220, 370, '#f4ead6', 3);
    line(ctx, 282, 350, 282, 374, '#f4ead6', 3);
    if (!v.has('rug')) line(ctx, 344, 354, 344, 370, '#f4ead6', 3);
    text(ctx, 'ad astra', 280, 392, 12, 'rgba(244,234,214,0.5)', 'center', '400');
  },
};
