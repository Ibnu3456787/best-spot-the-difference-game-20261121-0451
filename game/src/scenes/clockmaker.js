// Scene 5 — The Clockmaker's Loft. Wing 2, tricky. 10 differences.
// Gears, clocks, blueprints and a cat asleep among the springs.
import { backdrop, circle, drawCat, drawGear, ellipse, line, poly, rect, roundRect, star, text } from '../props.js';

export const clockmaker = {
  id: 'clockmaker',
  title: "The Clockmaker's Loft",
  subtitle: 'Wing 2 · Tricky · 10 differences',
  timeLimit: 300,
  differences: [
    { id: 'gear', x: 122, y: 102, r: 40, label: 'the big gear' },
    { id: 'cuckoo', x: 282, y: 76, r: 22, label: 'the cuckoo bird' },
    { id: 'blueprint', x: 415, y: 260, r: 36, label: 'a blueprint line' },
    { id: 'chain', x: 228, y: 296, r: 30, label: 'the watch chain' },
    { id: 'shade', x: 482, y: 142, r: 24, label: 'the lamp shade' },
    { id: 'hand', x: 62, y: 202, r: 24, label: 'the wall clock hand' },
    { id: 'hammer', x: 332, y: 306, r: 26, label: 'the hammer' },
    { id: 'ear', x: 452, y: 322, r: 18, label: "the cat's ear" },
    { id: 'gear2', x: 352, y: 132, r: 30, label: 'the small gear' },
    { id: 'pendulum', x: 282, y: 174, r: 40, label: 'the pendulum' },
  ],
  paint(ctx, v) {
    backdrop(ctx, 560, 400, '#e6d3ac', '#d3b982', 330, '#6b4f2a');
    // Big gear on the wall.
    drawGear(ctx, 122, 102, 30, v.has('gear') ? 7 : 8, '#c9a227');
    drawGear(ctx, 352, 132, 20, 8, v.has('gear2') ? '#b8c4c9' : '#c9a227');
    drawGear(ctx, 170, 150, 14, 6, '#8a6d1f');
    // Cuckoo clock.
    roundRect(ctx, 248, 52, 68, 84, 8, '#7a4a28', '#4a3413');
    poly(ctx, [[244, 56], [282, 30], [320, 56]], '#5a3418');
    circle(ctx, 282, 92, 20, '#fff8e6', '#4a3413');
    line(ctx, 282, 92, 282, 78, '#1c2420', 2);
    line(ctx, 282, 92, 294, 92, '#1c2420', 2);
    if (!v.has('cuckoo')) {
      circle(ctx, 282, 66, 7, '#3f6d8e');
      poly(ctx, [[288, 64], [295, 66], [288, 68]], '#e8a13a');
    }
    // Pendulum below the cuckoo clock.
    line(ctx, 282, 136, v.has('pendulum') ? 296 : 268, 196, '#4a3413', 3);
    circle(ctx, v.has('pendulum') ? 296 : 268, 202, 10, '#c9a227', '#7a5a28');
    // Wall clock.
    circle(ctx, 62, 202, 26, '#fff8e6', '#7a5a28');
    if (v.has('hand')) {
      line(ctx, 62, 202, 62, 184, '#1c2420', 3);
      line(ctx, 62, 202, 78, 202, '#1c2420', 3);
    } else {
      line(ctx, 62, 202, 62, 184, '#1c2420', 3);
      line(ctx, 62, 202, 46, 202, '#1c2420', 3);
    }
    // Lamp.
    line(ctx, 482, 200, 482, 150, '#3a3a44', 5);
    poly(ctx, [[462, 150], [502, 150], [494, 128], [470, 128]], v.has('shade') ? '#3f6d8e' : '#b5523a');
    circle(ctx, 482, 154, 5, '#ffd94d');
    // Workbench.
    rect(ctx, 60, 280, 440, 14, '#7a5a28');
    rect(ctx, 76, 294, 14, 36, '#5a4632');
    rect(ctx, 470, 294, 14, 36, '#5a4632');
    // Blueprint on the bench.
    rect(ctx, 370, 232, 90, 48, '#a8c8e0', '#3f6d8e');
    line(ctx, 380, 244, 450, 244, '#3f6d8e', 2);
    line(ctx, 380, 258, 430, 258, '#3f6d8e', 2);
    if (!v.has('blueprint')) line(ctx, 380, 270, 450, 270, '#3f6d8e', 2);
    circle(ctx, 445, 244, 5, '#b5523a');
    // Pocket watch with chain.
    circle(ctx, 202, 302, 16, '#f0c94a', '#7a5a28');
    circle(ctx, 202, 302, 3, '#1c2420');
    line(ctx, 202, 302, 202, 292, '#1c2420', 2);
    line(ctx, 202, 302, 210, 306, '#1c2420', 2);
    if (!v.has('chain')) {
      ctx.strokeStyle = '#c9a227';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(216, 296);
      ctx.quadraticCurveTo(236, 282, 252, 292);
      ctx.stroke();
      circle(ctx, 252, 292, 4, '#c9a227');
    }
    // Hammer.
    if (!v.has('hammer')) {
      ctx.save();
      ctx.translate(332, 312);
      ctx.rotate(-0.5);
      rect(ctx, -3, -18, 6, 26, '#7a5a28');
      rect(ctx, -12, -24, 24, 10, '#3a3a44');
      ctx.restore();
    }
    // Screwdrivers and springs.
    line(ctx, 120, 300, 150, 292, '#b5523a', 4);
    line(ctx, 120, 310, 152, 310, '#3f6d8e', 4);
    for (let i = 0; i < 4; i += 1) circle(ctx, 420 + i * 10, 300, 4, 'rgba(0,0,0,0)');
    // Cat asleep on a cushion.
    ellipse(ctx, 452, 344, 40, 12, '#b5523a');
    ctx.save();
    ctx.translate(452, 330);
    ellipse(ctx, 0, 0, 22, 11, '#3a3a44');
    circle(ctx, -16, -6, 9, '#3a3a44');
    poly(ctx, [[-22, -12], [-20, -22], [-14, -14]], '#3a3a44');
    if (v.has('ear')) poly(ctx, [[-12, -14], [-6, -18], [-8, -12]], '#3a3a44');
    else poly(ctx, [[-12, -14], [-8, -24], [-4, -14]], '#3a3a44');
    ctx.restore();
    text(ctx, 'tick · tock', 280, 384, 13, 'rgba(0,0,0,0.35)', 'center', '400');
  },
};
