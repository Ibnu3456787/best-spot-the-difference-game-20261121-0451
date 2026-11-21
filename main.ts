// SPOTLIGHT — The Curator's Case: the hand-in program (Node 22, stdlib only).
// The grader runs `node /bot/main.ts` twice, with a read-only /bot and a
// writable /output, no network, 10 seconds. Both runs must write the same
// bytes. This program copies game/ and screenshots/ beside it into /output
// and writes /output/dossier.json with the kit's vendored library.
//
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The grader's /output already exists and is writable; mkdir is a no-op there
// and creates the local stand-in elsewhere. Never remove the directory itself.
mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The gate's caps (reference/gate.json): dossier text at most 160 KiB, at most
// 4 screenshots of at most 256 KiB each, game/ at most 993 entries and 48 MiB.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
