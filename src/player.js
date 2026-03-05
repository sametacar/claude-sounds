import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const SOUNDS_DIR = join(__dirname, '..', 'sounds');

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function playFile(filePath) {
  if (!existsSync(filePath)) return;

  let cmd, args;

  if (process.platform === 'darwin') {
    cmd = 'afplay';
    args = [filePath];
  } else if (process.platform === 'win32') {
    const uri = 'file:///' + filePath.replace(/\\/g, '/');
    cmd = 'powershell';
    args = [
      '-NonInteractive', '-NoProfile', '-WindowStyle', 'Hidden', '-c',
      `Add-Type -AssemblyName PresentationCore; $mp=[System.Windows.Media.MediaPlayer]::new(); $mp.Open([uri]'${uri}'); $mp.Play(); Start-Sleep 10`,
    ];
  } else {
    cmd = 'mpg123';
    args = ['-q', filePath];
  }

  try {
    const child = spawn(cmd, args, { detached: true, stdio: 'ignore' });
    child.unref();
  } catch {
    // silently fail — hooks must not break Claude Code
  }
}

export function playEvent(theme, event) {
  const files = theme.events[event];
  if (!files || files.length === 0) return;
  const file = pickRandom(files);
  const filePath = join(SOUNDS_DIR, theme.soundDir, file);
  playFile(filePath);
}
