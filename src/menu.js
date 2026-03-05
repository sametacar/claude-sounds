import { get } from './themes/index.js';
import * as claudeCode from './adapters/claude-code.js';

const MENU_ITEMS = [
  { id: 'none', name: 'Sounds Off' },
  null,
  { id: 'sc-terran',   name: 'StarCraft: Terran' },
  { id: 'sc-protoss',  name: 'StarCraft: Protoss' },
  { id: 'wc',          name: 'Warcraft' },
  { id: 'mk',          name: 'Mortal Kombat' },
  { id: 'ao2-britons', name: 'Age of Empires 2: Britons' },
  { id: 'ao2-franks',  name: 'Age of Empires 2: Franks' },
  { id: 'ao2-turks',   name: 'Age of Empires 2: Turks' }
];

// Navigable items (non-null)
const NAV_ITEMS = MENU_ITEMS.filter(Boolean);

function write(s) {
  process.stdout.write(s);
}

export function showMenu() {
  if (!process.stdin.isTTY) {
    console.error('No TTY available. Use: claude-sounds use <theme>');
    process.exit(1);
  }

  const activeId = claudeCode.current() ?? 'none';
  let selected = Math.max(0, NAV_ITEMS.findIndex(item => item.id === activeId));

  write('\x1b[?1049h'); // enter alt screen
  write('\x1b[?25l');   // hide cursor

  const cleanup = () => {
    write('\x1b[?25h');   // show cursor
    write('\x1b[?1049l'); // exit alt screen
    process.stdin.setRawMode(false);
    process.stdin.pause();
  };

  const draw = () => {
    write('\x1b[H\x1b[2J\x1b[H');

    write('\x1b[1;36mclaude-sounds\x1b[0m\n');
    write('\x1b[2m────────────────────────────────────────\x1b[0m\n');
    write('\n');
    write('  \x1b[2m↑↓\x1b[0m navigate   \x1b[2mEnter\x1b[0m select   \x1b[2mq\x1b[0m quit\n');
    write('\n');

    let navIndex = 0;

    for (const item of MENU_ITEMS) {
      if (item === null) {
        write('\x1b[2m  ────────────────────────\x1b[0m\n');
        continue;
      }

      const isSelected = navIndex === selected;
      const isActive   = item.id === activeId;
      const suffix     = item.full ? '\x1b[2m [full]\x1b[0m' : '';
      navIndex++;

      if (isSelected && isActive) {
        write(`  \x1b[1;32m> ${item.name.padEnd(22)}${suffix}\x1b[2m [active]\x1b[0m\n`);
      } else if (isSelected) {
        write(`  \x1b[1;32m> ${item.name}${suffix}\x1b[0m\n`);
      } else if (isActive) {
        write(`  \x1b[33m  ${item.name.padEnd(22)}${suffix}\x1b[2m [active]\x1b[0m\n`);
      } else {
        write(`    ${item.name}${suffix}\n`);
      }
    }
  };

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  draw();

  process.stdin.on('data', key => {
    if (key === '\x03' || key === 'q' || key === 'Q') {
      cleanup();
      process.exit(0);
    }

    if (key === '\x1b[A') {
      selected = (selected - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
      draw();
    } else if (key === '\x1b[B') {
      selected = (selected + 1) % NAV_ITEMS.length;
      draw();
    } else if (key === '\r') {
      const item = NAV_ITEMS[selected];
      cleanup();

      if (item.id === 'none') {
        claudeCode.off();
        write('\x1b[1;33m✓ Sounds disabled\x1b[0m\n');
      } else {
        const theme = get(item.id);
        claudeCode.ensureGlobalInstall();
        claudeCode.apply(theme);
        const fullNote = theme.full ? ' (full)' : '';
        write(`\x1b[1;32m✓ Applied "${theme.name}"${fullNote}\x1b[0m\n`);
      }

      process.exit(0);
    }
  });
}
