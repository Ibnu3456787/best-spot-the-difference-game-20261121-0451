# SPOTLIGHT — The Curator's Case

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Ibnu3456787/best-spot-the-difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Ibnu3456787/best-spot-the-difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

A complete, original spot-the-difference game. The Museum of Lost Things has
been touched — every exhibit exists twice, and a mischievous sprite changed
things between the two. Find every difference and restore the collection.

**8 exhibits, 78 differences, 3 wings of rising difficulty** — from The Kitchen
at Dawn (7 differences, gentle) to The Curator's Vault (12 differences,
hardest). Every scene is hand-painted in code: one painter draws both panels,
and the right panel carries the differences, so the two pictures are identical
except for exactly the hunt.

## Systems

- **DualPanelRenderer** — each scene painted twice from one painter; markers on both panels
- **DifferenceRegistry** — fair hit-testing; a click on either panel counts
- **HintBeacon** — 3 hints per exhibit, 20s cooldown, breathing ring on the next find
- **ComboChain** — finds within 8 seconds chain for bonus points
- **TimePressure** — countdown per exhibit, heartbeat under 10 seconds, −5s per wrong click
- **SoundBank** — every sound synthesised live with WebAudio; no audio files
- **StarLedger** — 1–3 stars per exhibit by time left, saved in localStorage
- **Daily Case** — one seeded exhibit a day, the same for every player
- **ShotStager** — `?shot=cover|start|hint|end` stages real game states for screenshots

## Run it

```sh
node serve.ts
# open http://localhost:8080 in desktop Chrome
```

No build step, no network request, no dependencies. Keys: **H** hint ·
**P** pause · **M** mute · **Esc** menu · **1–8** pick an exhibit.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `game/` and `screenshots/` to the output directory and
writes `dossier.json` with the kit's vendored library.

---

<sub>Entered on [make.fun](https://make.fun/?ref=zq0xe8tm&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>
