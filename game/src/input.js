// InputController: mouse and keyboard. One file, one job: turn pointer
// clicks on either panel into panel coordinates, and keys into commands.
import { PANEL_H, PANEL_W } from './config.js';

export class InputController {
  constructor(leftCanvas, rightCanvas, engine, renderer, actions) {
    this.engine = engine;
    this.renderer = renderer;
    this.actions = actions;
    this.attach(leftCanvas);
    this.attach(rightCanvas);
    window.addEventListener('keydown', (e) => this.onKey(e));
  }

  attach(canvas) {
    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * PANEL_W;
      const y = ((e.clientY - rect.top) / rect.height) * PANEL_H;
      if (x < 0 || y < 0 || x > PANEL_W || y > PANEL_H) return;
      const now = performance.now();
      const diff = this.engine.clickAt(x, y, now);
      if (diff) {
        diff.foundAt = now;
        this.renderer.burst(diff.x, diff.y, now);
      } else if (this.engine.state === 'playing') {
        this.renderer.wrongMark(x, y, now, canvas);
      }
    });
  }

  onKey(e) {
    if (e.repeat) return;
    const key = e.key.toLowerCase();
    if (key === 'h') this.actions.hint();
    else if (key === 'p') this.actions.togglePause();
    else if (key === 'm') this.actions.toggleMute();
    else if (key === 'escape') this.actions.escape();
    else if (key >= '1' && key <= '8') this.actions.pickScene(Number(key) - 1);
  }
}
