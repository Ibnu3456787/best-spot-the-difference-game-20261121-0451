// HudController: the frame around the hunt. One file, one job: keep every
// DOM readout honest — the counter, the timer bar, the score, the combo,
// the hint button and the found-dots. Called once per animation frame.
import { COLORS } from './config.js';

export class HudController {
  constructor(ids) {
    this.el = {};
    for (const [key, id] of Object.entries(ids)) this.el[key] = document.getElementById(id);
  }

  show(screen) {
    // Overlays (complete / time-up / pause) sit on top of the play screen,
    // so the finished hunt stays visible behind the card.
    const overlay = ['complete', 'timeup', 'pause'].includes(screen);
    for (const name of ['menu', 'play', 'complete', 'timeup', 'pause']) {
      const node = document.getElementById(`screen-${name}`);
      if (!node) continue;
      const visible = name === screen || (overlay && name === 'play');
      node.classList.toggle('hidden', !visible);
    }
  }

  update(engine, ledger) {
    const { el } = this;
    if (el.totalStars) el.totalStars.textContent = `★ ${ledger.totalStars()}`;
    if (!engine.scene || !engine.registry) return;
    const reg = engine.registry;
    if (el.counter) el.counter.textContent = `${reg.foundCount} / ${reg.total}`;
    if (el.remain) {
      el.remain.textContent = reg.remaining === 0 ? 'ALL FOUND' : `${reg.remaining} REMAIN`;
      el.remain.classList.toggle('done', reg.remaining === 0);
    }
    if (el.score) el.score.textContent = engine.score.toLocaleString('en-US');
    if (el.combo) {
      el.combo.textContent = engine.combo > 1 ? `COMBO ×${engine.combo}` : '';
      el.combo.classList.toggle('hot', engine.combo >= 3);
    }
    const secs = Math.ceil(engine.timeLeft);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    if (el.timerText) el.timerText.textContent = `${mm}:${ss}`;
    if (el.timerBar) {
      const frac = engine.timeFraction;
      el.timerBar.style.width = `${Math.max(0, frac * 100)}%`;
      el.timerBar.style.background = frac < 0.2 ? COLORS.danger : frac < 0.45 ? '#e8a13a' : COLORS.good;
      el.timerBar.parentElement.classList.toggle('urgent', frac < 0.2);
    }
    if (el.hintBtn) {
      const cooling = engine.hintCooldownLeft > 0;
      const label = engine.hintsLeft <= 0
        ? 'NO HINTS'
        : cooling
          ? `HINT (${Math.ceil(engine.hintCooldownLeft / 1000)}s)`
          : `HINT (${engine.hintsLeft})`;
      el.hintBtn.textContent = label;
      el.hintBtn.disabled = engine.hintsLeft <= 0 || cooling;
    }
    if (el.dots) {
      const dots = el.dots.children;
      for (let i = 0; i < dots.length; i += 1) {
        dots[i].classList.toggle('found', i < reg.foundCount);
      }
    }
  }

  buildDots(total) {
    const dots = this.el.dots;
    if (!dots) return;
    dots.innerHTML = '';
    for (let i = 0; i < total; i += 1) {
      const d = document.createElement('span');
      d.className = 'dot';
      dots.appendChild(d);
    }
  }

  toast(message) {
    const t = this.el.toast;
    if (!t) return;
    t.textContent = message;
    t.classList.add('show');
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => t.classList.remove('show'), 2200);
  }
}
