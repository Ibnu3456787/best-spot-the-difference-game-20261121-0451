// Scene 3 — The Night Market. Wing 2, lively. 9 differences.
// Lanterns, stalls, a vendor, a bicycle and a moonlit crowd of details.
import { backdrop, circle, drawBird, drawCat, drawLantern, ellipse, line, poly, rect, roundRect, star, text } from '../props.js';

export const market = {
  id: 'market',
  title: 'The Night Market',
  subtitle: 'Wing 2 · Lively · 9 differences',
  timeLimit: 240,
  differences: [
    { id: 'lantern', x: 196, y: 102, r: 22, label: 'a paper lantern' },
    { id: 'sign', x: 300, y: 72, r: 28, label: 'the signboard star' },
    { id: 'moon', x: 484, y: 60, r: 28, label: 'the moon' },
    { id: 'wheel', x: 422, y: 312, r: 26, label: 'the bicycle wheel' },
    { id: 'orange', x: 182, y: 262, r: 26, label: 'an orange in the crate' },
    { id: 'hat', x: 300, y: 178, r: 28, label: "the vendor's hat" },
    { id: 'bulb', x: 420, y: 69, r: 16, label: 'a string-light bulb' },
    { id: 'tail', x: 100, y: 320, r: 26, label: "the cat's tail" },
    { id: 'awning', x: 220, y: 131, r: 26, label: 'the awning stripes' },
  ],
  paint(ctx, v) {
    backdrop(ctx, 560, 400, '#1b2a4a', '#2c3a5e', 330, '#3a2f28');
    // Stars.
    const stars = [[40, 40], [120, 26], [210, 70], [330, 34], [410, 90], [520, 130], [60, 120], [360, 130]];
    for (const [x, y] of stars) star(ctx, x, y, 3, 4, '#f4ead6');
    // Moon.
    if (v.has('moon')) {
      circle(ctx, 482, 62, 22, '#f4ead6');
      circle(ctx, 474, 56, 5, '#d9cbae');
      circle(ctx, 490, 70, 4, '#d9cbae');
    } else {
      circle(ctx, 482, 62, 22, '#f4ead6');
      circle(ctx, 492, 56, 19, '#1b2a4a');
    }
    // String lights.
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.quadraticCurveTo(280, 90, 560, 30);
    ctx.strokeStyle = 'rgba(244, 234, 214, 0.55)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    const bulbs = [60, 150, 240, 330, 420, 500];
    bulbs.forEach((x, i) => {
      const y = 30 + Math.sin((x / 560) * Math.PI) * 44;
      const dark = v.has('bulb') && i === 4;
      circle(ctx, x, y + 8, 7, dark ? '#3a3a44' : '#ffd94d', '#0e1626');
      line(ctx, x, y, x, y + 4, '#0e1626', 2);
    });
    // Distant rooftops along the horizon, behind the stalls.
    ctx.fillStyle = '#232f4d';
    poly(ctx, [[0, 330], [0, 290], [50, 268], [100, 290], [100, 330]], '#232f4d');
    poly(ctx, [[330, 330], [330, 296], [380, 272], [430, 296], [430, 330]], '#232f4d');
    poly(ctx, [[470, 330], [470, 300], [520, 278], [560, 300], [560, 330]], '#232f4d');
    rect(ctx, 44, 282, 12, 14, '#ffd94d');
    rect(ctx, 374, 288, 12, 14, '#ffd94d');
    rect(ctx, 514, 292, 12, 14, '#ffd94d');
    // Sacks of rice beside the stall.
    ellipse(ctx, 356, 312, 20, 16, '#c9b18a');
    ellipse(ctx, 380, 316, 18, 14, '#b89a6e');
    line(ctx, 350, 300, 362, 300, '#5a4632', 3);
    // Hanging paper decoration.
    line(ctx, 360, 40, 360, 66, '#0e1626', 2);
    poly(ctx, [[348, 66], [372, 66], [360, 88]], '#e05a4a');
    // Stall with striped awning: one stripe changes colour in the altered panel.
    for (let i = 0; i < 5; i += 1) {
      const x0 = 120 + i * 40;
      let col = i % 2 === 0 ? '#b5523a' : '#f4ead6';
      if (i === 2 && v.has('awning')) col = '#e8a13a';
      rect(ctx, x0, 118, 40, 26, col);
    }
    line(ctx, 120, 118, 120, 300, '#5a4632', 4);
    line(ctx, 320, 118, 320, 300, '#5a4632', 4);
    rect(ctx, 120, 268, 200, 12, '#7a5a28');
    // Signboard.
    roundRect(ctx, 232, 58, 100, 34, 6, '#f4ead6', '#7a5a28');
    text(ctx, 'KOPI', 282, 76, 18, '#1c2420');
    if (!v.has('sign')) star(ctx, 316, 68, 6, 5, '#c9a227');
    // Lanterns.
    drawLantern(ctx, 150, 102, 14, '#e05a4a');
    if (!v.has('lantern')) drawLantern(ctx, 196, 102, 14, '#e8a13a');
    drawLantern(ctx, 242, 102, 14, '#e05a4a');
    // Vendor.
    circle(ctx, 300, 190, 16, '#e8b48a');
    poly(ctx, [[282, 206], [318, 206], [326, 268], [274, 268]], '#2f7a4d');
    poly(ctx, [[278, 182], [322, 182], [300, 158]], v.has('hat') ? '#3f6d8e' : '#b5523a');
    ellipse(ctx, 300, 182, 26, 5, v.has('hat') ? '#2c4f66' : '#8e3a2c');
    // Crate of oranges.
    rect(ctx, 150, 268, 64, 40, '#8a6d45', '#5a4632');
    circle(ctx, 166, 262, 9, '#e8821e');
    circle(ctx, 184, 258, 9, '#e8821e');
    circle(ctx, 200, 262, 9, '#e8821e');
    if (!v.has('orange')) circle(ctx, 175, 246, 9, '#e8821e');
    // Bicycle: the front wheel is missing in the altered panel.
    if (!v.has('wheel')) {
      ctx.strokeStyle = '#f4ead6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(422, 312, 24, 0, Math.PI * 2);
      ctx.stroke();
      line(ctx, 422, 312, 422, 288, '#f4ead6', 2);
      line(ctx, 422, 312, 398, 312, '#f4ead6', 2);
    }
    circle(ctx, 486, 312, 24, 'rgba(0,0,0,0)', '#f4ead6');
    line(ctx, 454, 288, 486, 312, '#c9a227', 4);
    line(ctx, 454, 288, 422, 312, '#c9a227', 4);
    line(ctx, 442, 288, 470, 288, '#c9a227', 4);
    rect(ctx, 462, 280, 18, 6, '#3a3a44');
    // Cat by the stall.
    ctx.save();
    ctx.translate(92, 322);
    ctx.fillStyle = '#e8d9b8';
    ellipse(ctx, 0, 0, 16, 11, '#e8d9b8');
    circle(ctx, -12, -8, 8, '#e8d9b8');
    ctx.beginPath();
    if (v.has('tail')) {
      ctx.moveTo(14, 0);
      ctx.quadraticCurveTo(26, 8, 22, 16);
    } else {
      ctx.moveTo(14, 0);
      ctx.quadraticCurveTo(28, -6, 26, -20);
    }
    ctx.strokeStyle = '#e8d9b8';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
    drawBird(ctx, 520, 250, 0.8, '#f4ead6');
    text(ctx, 'pasar malam', 280, 384, 13, 'rgba(244,234,214,0.5)', 'center', '400');
  },
};
