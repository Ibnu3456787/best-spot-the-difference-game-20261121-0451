// Canvas prop library for SPOTLIGHT. One file, one job: the small drawing
// verbs every scene painter speaks, so scenes stay short and readable.
export function rect(ctx, x, y, w, h, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);
  }
}

export function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

export function circle(ctx, x, y, r, fill, stroke) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

export function ellipse(ctx, x, y, rx, ry, fill, stroke, rot = 0) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

export function poly(ctx, points, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i][0], points[i][1]);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

export function line(ctx, x1, y1, x2, y2, color, width = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function star(ctx, x, y, r, points, fill) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI * i) / points - Math.PI / 2;
    const px = x + Math.cos(a) * rad;
    const py = y + Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

export function text(ctx, str, x, y, size, fill, align = 'center', weight = '700') {
  ctx.fillStyle = fill;
  ctx.font = `${weight} ${size}px Georgia, 'Times New Roman', serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(str, x, y);
}

/** A sitting cat silhouette, facing left. */
export function drawCat(ctx, x, y, scale, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ellipse(ctx, 0, 0, 16, 20, color);
  circle(ctx, 2, -26, 11, color);
  poly(ctx, [[-6, -32], [-3, -44], [3, -34]], color);
  poly(ctx, [[8, -34], [13, -44], [14, -32]], color);
  ctx.beginPath();
  ctx.moveTo(14, 8);
  ctx.quadraticCurveTo(30, 2, 26, -16);
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();
  circle(ctx, -1, -28, 1.6, '#f4ead6');
  circle(ctx, 6, -28, 1.6, '#f4ead6');
  ctx.restore();
}

/** A small perched bird. */
export function drawBird(ctx, x, y, scale, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ellipse(ctx, 0, 0, 12, 8, color);
  circle(ctx, 9, -7, 5.5, color);
  poly(ctx, [[13, -8], [20, -6], [13, -4]], '#e8a13a');
  line(ctx, -4, 6, -4, 12, color, 2);
  line(ctx, 3, 6, 3, 12, color, 2);
  ctx.restore();
}

/** A potted plant with `leaves` fronds. Leaf angles are fixed by index, so
 * a plant with one leaf fewer loses exactly one leaf — the others stay put. */
export function drawPlant(ctx, x, y, scale, leaves, potColor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  for (let i = 0; i < leaves; i += 1) {
    const a = -Math.PI / 2 + (i - 2) * 0.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(Math.cos(a) * 14, Math.sin(a) * 18, Math.cos(a) * 22, Math.sin(a) * 30);
    ctx.strokeStyle = '#2f7a4d';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    circle(ctx, Math.cos(a) * 22, Math.sin(a) * 30, 5, '#3c9a5f');
  }
  poly(ctx, [[-14, 0], [14, 0], [10, 18], [-10, 18]], potColor);
  ctx.restore();
}

/** A cog gear with `teeth` teeth. */
export function drawGear(ctx, x, y, r, teeth, fill, hole = true) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = fill;
  for (let i = 0; i < teeth; i += 1) {
    const a = (Math.PI * 2 * i) / teeth;
    ctx.save();
    ctx.rotate(a);
    ctx.fillRect(r - 2, -3, 7, 6);
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  if (hole) circle(ctx, 0, 0, r * 0.35, '#12211c');
  ctx.restore();
}

/** A paper lantern with ribs. */
export function drawLantern(ctx, x, y, r, color) {
  ellipse(ctx, x, y, r, r * 1.15, color, '#8a6d1f');
  for (let i = -2; i <= 2; i += 1) {
    ctx.beginPath();
    ctx.ellipse(x, y + i * r * 0.4, r * 0.92, r * 0.18, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  rect(ctx, x - 4, y - r * 1.15 - 5, 8, 5, '#6b4f1d');
  rect(ctx, x - 4, y + r * 1.15, 8, 5, '#6b4f1d');
}

/** A five-armed starfish. */
export function drawStarfish(ctx, x, y, r, color, arms = 5) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < arms * 2; i += 1) {
    const rad = i % 2 === 0 ? r : r * 0.42;
    const a = (Math.PI * i) / arms - Math.PI / 2;
    const px = Math.cos(a) * rad;
    const py = Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  circle(ctx, 0, 0, r * 0.18, 'rgba(0,0,0,0.18)');
  ctx.restore();
}

/** A wall or floor backdrop: warm plaster with a soft vignette. */
export function backdrop(ctx, w, h, top, bottom, floorY, floorColor) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  if (floorY !== null) {
    ctx.fillStyle = floorColor;
    ctx.fillRect(0, floorY, w, h - floorY);
    line(ctx, 0, floorY, w, floorY, 'rgba(0,0,0,0.25)', 2);
  }
}

/** A framed picture on a wall. */
export function framedPicture(ctx, x, y, w, h, inner, frameColor = '#7a5a28') {
  rect(ctx, x - 5, y - 5, w + 10, h + 10, frameColor, '#4a3413');
  rect(ctx, x, y, w, h, inner);
}
