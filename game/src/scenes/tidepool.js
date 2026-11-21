// Scene 7 — The Tidepool Lab. Wing 3, hard. 12 differences.
// Tanks, shells, starfish, a microscope and one very patient crab.
import { backdrop, circle, drawStarfish, ellipse, line, poly, rect, roundRect, star, text } from '../props.js';

export const tidepool = {
  id: 'tidepool',
  title: 'The Tidepool Lab',
  subtitle: 'Wing 3 · Hard · 12 differences',
  timeLimit: 360,
  differences: [
    { id: 'fish', x: 152, y: 122, r: 24, label: 'a fish in the tank' },
    { id: 'arm', x: 302, y: 302, r: 24, label: "the starfish's arm" },
    { id: 'shell', x: 92, y: 252, r: 30, label: 'the shell spiral' },
    { id: 'label', x: 422, y: 152, r: 20, label: 'the jar label' },
    { id: 'coral', x: 478, y: 266, r: 28, label: 'a coral branch' },
    { id: 'knob', x: 240, y: 202, r: 18, label: 'the microscope knob' },
    { id: 'net', x: 362, y: 92, r: 22, label: 'a hole in the net' },
    { id: 'boot', x: 528, y: 344, r: 26, label: 'a rubber boot' },
    { id: 'arrow', x: 185, y: 314, r: 28, label: 'the chart arrow' },
    { id: 'bubbles', x: 222, y: 132, r: 30, label: 'bubbles in the tank' },
    { id: 'claw', x: 398, y: 320, r: 26, label: "the crab's claw" },
    { id: 'thermo', x: 68, y: 130, r: 32, markR: 20, label: 'the thermometer' },
  ],
  paint(ctx, v) {
    backdrop(ctx, 560, 400, '#dceef2', '#b8dbe2', 330, '#8a6d45');
    // Main tank. The water level is the same in both panels; the difference
    // is the thermometer on the tank's right wall (below).
    rect(ctx, 60, 60, 200, 140, 'rgba(127,179,213,0.35)', '#3f6d8e');
    ctx.fillStyle = 'rgba(63,109,142,0.45)';
    ctx.fillRect(62, 80, 196, 118);
    // Thermometer on the tank's LEFT wall (the right wall would sit under the
    // bubbles' hit-box): the red column is higher in the original panel,
    // lower in the altered one. (A whole-tank water-level change would need
    // a hit-box the size of the tank; this is local and fair.)
    rect(ctx, 64, 100, 8, 60, 'rgba(255,255,255,0.6)', '#3f6d8e');
    const redTop = v.has('thermo') ? 140 : 120;
    rect(ctx, 66, redTop, 4, 160 - redTop, '#d64541');
    circle(ctx, 68, 162, 5, '#d64541');
    // Fish.
    const fish = (x, y, c) => {
      ellipse(ctx, x, y, 14, 8, c);
      poly(ctx, [[x + 12, y], [x + 22, y - 7], [x + 22, y + 7]], c);
      circle(ctx, x - 8, y - 2, 1.8, '#1c2420');
    };
    fish(110, 130, '#e8821e');
    fish(200, 160, '#e05a8a');
    if (!v.has('fish')) fish(152, 122, '#7dbb4a');
    // Bubbles.
    const nBub = v.has('bubbles') ? 3 : 5;
    const bubPts = [[222, 102], [232, 118], [214, 130], [228, 142], [218, 156]];
    for (let i = 0; i < nBub; i += 1) {
      circle(ctx, bubPts[i][0], bubPts[i][1], 3.5, 'rgba(255,255,255,0.75)');
    }
    // Tank plants.
    ctx.strokeStyle = '#2f7a4d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(90, 196);
    ctx.quadraticCurveTo(84, 170, 94, 152);
    ctx.moveTo(240, 196);
    ctx.quadraticCurveTo(246, 172, 236, 158);
    ctx.stroke();
    // Fishing net on the wall.
    ctx.strokeStyle = '#5a4632';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i += 1) {
      line(ctx, 320 + i * 18, 60, 320 + i * 18, 130, '#5a4632', 1.5);
      line(ctx, 320, 60 + i * 18, 392, 60 + i * 18, '#5a4632', 1.5);
    }
    line(ctx, 320, 60, 392, 60, '#5a4632', 3);
    if (v.has('net')) {
      ctx.fillStyle = '#dceef2';
      ctx.beginPath();
      ctx.arc(362, 92, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    // Specimen jar with label.
    roundRect(ctx, 400, 110, 48, 70, 8, 'rgba(255,255,255,0.5)', '#3f6d8e');
    rect(ctx, 400, 104, 48, 8, '#3f6d8e');
    rect(ctx, 408, 140, 32, 22, '#f4ead6');
    text(ctx, v.has('label') ? 'SAND' : 'SALT', 424, 152, 9, '#1c2420');
    // Microscope.
    rect(ctx, 220, 230, 60, 8, '#3a3a44');
    line(ctx, 236, 230, 236, 180, '#3a3a44', 6);
    ctx.save();
    ctx.translate(250, 180);
    ctx.rotate(0.4);
    roundRect(ctx, -8, -26, 16, 34, 5, '#3a3a44');
    ctx.restore();
    circle(ctx, 262, 200, 7, '#b8c4c9');
    if (!v.has('knob')) circle(ctx, 230, 202, 5, '#c9a227');
    // Coral.
    ctx.strokeStyle = '#e05a4a';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(482, 300);
    ctx.quadraticCurveTo(478, 270, 468, 252);
    ctx.moveTo(482, 300);
    ctx.quadraticCurveTo(492, 272, 500, 258);
    if (!v.has('coral')) {
      ctx.moveTo(482, 282);
      ctx.quadraticCurveTo(466, 268, 458, 250);
    }
    ctx.stroke();
    // Shells on the bench.
    rect(ctx, 40, 280, 480, 12, '#7a5a28');
    rect(ctx, 56, 292, 12, 38, '#5a4632');
    rect(ctx, 492, 292, 12, 38, '#5a4632');
    ctx.save();
    ctx.translate(92, 252);
    ctx.strokeStyle = '#e8a13a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    // The spiral winds the other way in the altered panel (a real mirror:
    // negating the angle inside cos() alone would draw the same spiral).
    const flip = v.has('shell') ? -1 : 1;
    for (let a = 0; a < Math.PI * 3.4; a += 0.2) {
      const r = 3 + a * 2.4;
      const x = Math.cos(a) * r * flip;
      const y = Math.sin(a) * r * 0.8;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
    // Starfish.
    drawStarfish(ctx, 302, 302, 20, '#e8821e', v.has('arm') ? 4 : 5);
    // Crab.
    ellipse(ctx, 402, 322, 16, 11, '#d64541');
    circle(ctx, 394, 312, 3, '#1c2420');
    circle(ctx, 410, 312, 3, '#1c2420');
    ctx.strokeStyle = '#d64541';
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (v.has('claw')) {
      ctx.moveTo(388, 318);
      ctx.lineTo(378, 330);
    } else {
      ctx.moveTo(388, 318);
      ctx.lineTo(378, 306);
    }
    ctx.moveTo(416, 318);
    ctx.lineTo(426, 308);
    ctx.stroke();
    circle(ctx, v.has('claw') ? 378 : 378, v.has('claw') ? 330 : 306, 5, '#d64541');
    circle(ctx, 426, 308, 5, '#d64541');
    // Chart with arrow.
    rect(ctx, 140, 296, 90, 50, '#f4ead6', '#7a5a28');
    line(ctx, 150, 336, 220, 336, '#b8a888', 2);
    line(ctx, 150, 322, 200, 322, '#b8a888', 2);
    if (v.has('arrow')) {
      line(ctx, 210, 312, 180, 312, '#b5523a', 3);
      poly(ctx, [[180, 312], [190, 306], [190, 318]], '#b5523a');
    } else {
      line(ctx, 160, 312, 190, 312, '#b5523a', 3);
      poly(ctx, [[190, 312], [180, 306], [180, 318]], '#b5523a');
    }
    // Rubber boots.
    poly(ctx, [[500, 330], [514, 330], [514, 360], [500, 360]], '#2f7a4d');
    rect(ctx, 496, 356, 22, 8, '#2f7a4d');
    if (!v.has('boot')) {
      poly(ctx, [[522, 330], [536, 330], [536, 360], [522, 360]], '#2f7a4d');
      rect(ctx, 518, 356, 22, 8, '#2f7a4d');
    }
    text(ctx, 'low tide · 06:40', 280, 384, 13, 'rgba(0,0,0,0.35)', 'center', '400');
  },
};
