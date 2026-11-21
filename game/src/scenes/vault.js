// Scene 8 — The Curator's Vault. The Vault, hardest. 12 differences.
// The museum's heart: a vault door, gem pedestals, paintings and a chandelier.
import { backdrop, circle, ellipse, framedPicture, line, poly, rect, roundRect, star, text } from '../props.js';

export const vault = {
  id: 'vault',
  title: "The Curator's Vault",
  subtitle: 'The Vault · Hardest · 12 differences',
  timeLimit: 360,
  differences: [
    { id: 'gem', x: 282, y: 162, r: 36, label: 'the great gem' },
    { id: 'frame', x: 136, y: 64, r: 18, label: 'the painting frame' },
    { id: 'keys', x: 420, y: 286, r: 26, label: 'a key on the ring' },
    { id: 'candle', x: 312, y: 40, r: 22, label: 'a chandelier candle' },
    { id: 'fringe', x: 173, y: 384, r: 24, label: 'the rug fringe' },
    { id: 'number', x: 152, y: 282, r: 22, label: 'the pedestal number' },
    { id: 'bookmark', x: 492, y: 184, r: 18, label: 'the ledger bookmark' },
    { id: 'spokes', x: 62, y: 202, r: 26, label: 'the vault wheel' },
    { id: 'feather', x: 512, y: 104, r: 22, label: 'the feather' },
    { id: 'signature', x: 204, y: 182, r: 18, label: "the painter's signature" },
    { id: 'facet', x: 352, y: 222, r: 20, label: 'the gem facet' },
    { id: 'rivet', x: 46, y: 322, r: 18, label: 'a door rivet' },
  ],
  paint(ctx, v) {
    backdrop(ctx, 560, 400, '#2b2118', '#1d150e', 330, '#4a3413');
    // Chandelier.
    line(ctx, 282, 0, 282, 34, '#c9a227', 3);
    ellipse(ctx, 282, 44, 60, 10, '#c9a227');
    const candles = v.has('candle') ? 4 : 5;
    for (let i = 0; i < candles; i += 1) {
      const x = 242 + i * 20;
      rect(ctx, x - 3, 28, 6, 16, '#f4ead6');
      ellipse(ctx, x, 24, 3, 5, '#ffd94d');
    }
    // Vault door with wheel.
    rect(ctx, 20, 120, 90, 180, '#3a3a44', '#1c2420');
    circle(ctx, 62, 202, 26, '#55555e', '#1c2420');
    const spokes = v.has('spokes') ? 5 : 6;
    for (let i = 0; i < spokes; i += 1) {
      const a = (Math.PI * 2 * i) / spokes;
      line(ctx, 62, 202, 62 + Math.cos(a) * 24, 202 + Math.sin(a) * 24, '#1c2420', 4);
    }
    circle(ctx, 62, 202, 7, '#c9a227');
    const rivets = v.has('rivet') ? 3 : 4;
    for (let i = 0; i < rivets; i += 1) circle(ctx, 30 + i * 8, 322, 2.5, '#c9a227');
    // Painting on the wall, with a gold corner flourish in the original.
    framedPicture(ctx, 130, 60, 120, 90, '#7fb3d5');
    poly(ctx, [[160, 130], [190, 84], [220, 130]], '#3c9a5f');
    circle(ctx, 232, 82, 10, '#ffd94d');
    if (!v.has('frame')) {
      poly(ctx, [[136, 54], [142, 62], [136, 70], [130, 62]], '#f0c94a');
    }
    if (!v.has('signature')) text(ctx, 'A.R.', 202, 182, 9, 'rgba(0,0,0,0.55)', 'left', '400');
    // Guard's hat with feather on a stand.
    line(ctx, 502, 200, 502, 150, '#5a4632', 5);
    ellipse(ctx, 502, 202, 20, 5, '#5a4632');
    poly(ctx, [[482, 150], [522, 150], [514, 116], [490, 116]], '#1c2a4a');
    ellipse(ctx, 502, 150, 24, 5, '#1c2a4a');
    if (!v.has('feather')) {
      ctx.strokeStyle = '#e05a4a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(512, 118);
      ctx.quadraticCurveTo(524, 100, 516, 86);
      ctx.stroke();
    }
    // Central pedestal with the great gem.
    rect(ctx, 252, 230, 60, 70, '#6b4f2a', '#4a3413');
    rect(ctx, 244, 224, 76, 8, '#7a5a28');
    const gemColor = v.has('gem') ? '#3c9a5f' : '#d64541';
    poly(ctx, [[282, 128], [306, 152], [282, 196], [258, 152]], gemColor);
    poly(ctx, [[258, 152], [282, 128], [282, 196]], 'rgba(255,255,255,0.25)');
    poly(ctx, [[282, 128], [306, 152], [282, 152]], 'rgba(255,255,255,0.35)');
    // Small gem on the side table.
    rect(ctx, 330, 240, 60, 50, '#6b4f2a', '#4a3413');
    poly(ctx, [[352, 206], [368, 222], [352, 238], [336, 222]], '#59d8ff');
    if (!v.has('facet')) line(ctx, 336, 222, 368, 222, 'rgba(255,255,255,0.6)', 2);
    // Pedestal with its number plate (plate drawn after the pedestal so it shows).
    rect(ctx, 120, 240, 64, 60, '#6b4f2a', '#4a3413');
    circle(ctx, 152, 222, 12, '#e8c86a', '#7a5a28');
    rect(ctx, 132, 268, 40, 26, '#c9a227', '#7a5a28');
    text(ctx, v.has('number') ? '1' : '7', 152, 282, 16, '#1c2420');
    // Keys on a ring.
    circle(ctx, 422, 282, 14, 'rgba(0,0,0,0)', '#c9a227');
    const nKeys = v.has('keys') ? 2 : 3;
    for (let i = 0; i < nKeys; i += 1) {
      const a = 0.6 + i * 0.9;
      const x = 422 + Math.cos(a) * 16;
      const y = 282 + Math.sin(a) * 16;
      line(ctx, 422, 282, x, y, '#c9a227', 2);
      circle(ctx, x, y, 4, '#c9a227');
      line(ctx, x, y, x + 6, y + 10, '#c9a227', 2);
    }
    // Ledger with bookmark.
    rect(ctx, 450, 170, 64, 50, '#7a4a28', '#4a3413');
    rect(ctx, 456, 176, 52, 38, '#f4ead6');
    line(ctx, 462, 186, 502, 186, '#b8a888', 1.5);
    line(ctx, 462, 196, 502, 196, '#b8a888', 1.5);
    if (!v.has('bookmark')) rect(ctx, 494, 170, 6, 26, '#b5523a');
    // Rug with fringe.
    ellipse(ctx, 282, 362, 150, 20, '#7a2a2a');
    ellipse(ctx, 282, 362, 110, 13, '#a03a3a');
    star(ctx, 282, 362, 9, 5, '#c9a227');
    // Rug with fringe. The right-hand fringe is always there; the left-hand
    // fringe is missing in the altered panel (one local difference).
    for (let i = 0; i < 8; i += 1) {
      line(ctx, 380 + i * 6, 380, 380 + i * 6, 388, '#d9cbae', 2);
    }
    if (!v.has('fringe')) {
      for (let i = 0; i < 8; i += 1) {
        line(ctx, 152 + i * 6, 380, 152 + i * 6, 388, '#d9cbae', 2);
      }
    }
    text(ctx, 'vault · level 3', 280, 396, 11, 'rgba(244,234,214,0.45)', 'center', '400');
  },
};
