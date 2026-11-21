// DifferenceRegistry: the hunt's bookkeeping. One file, one job: which
// differences exist, which are found, and whether a click lands on one.
// A click on EITHER panel counts: both panels show the same coordinates.
export class DifferenceRegistry {
  constructor(differences) {
    this.all = differences;
    this.found = new Set();
  }

  get total() {
    return this.all.length;
  }

  get foundCount() {
    return this.found.size;
  }

  get remaining() {
    return this.total - this.found.size;
  }

  get done() {
    return this.found.size === this.all.length;
  }

  isFound(id) {
    return this.found.has(id);
  }

  /** The difference at panel point (x, y), or null. Nearest wins on overlap. */
  hitAt(x, y) {
    let best = null;
    let bestDist = Infinity;
    for (const d of this.all) {
      if (this.found.has(d.id)) continue;
      const dx = x - d.x;
      const dy = y - d.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= d.r && dist < bestDist) {
        best = d;
        bestDist = dist;
      }
    }
    return best;
  }

  markFound(id) {
    this.found.add(id);
  }

  /** The next unfound difference, for the hint beacon. */
  nextUnfound() {
    for (const d of this.all) {
      if (!this.found.has(d.id)) return d;
    }
    return null;
  }

  foundList() {
    return this.all.filter((d) => this.found.has(d.id));
  }
}
