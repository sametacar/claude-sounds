# claude-sounds

[![npm version](https://img.shields.io/npm/v/claude-sounds.svg)](https://www.npmjs.com/package/claude-sounds)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Retro game sounds for [Claude Code](https://claude.ai/code) hooks. Plays nostalgic sound effects when Claude finishes a response, starts a session, sends a notification, and more.

Works on **macOS**, **Windows**, and **Linux**.

![Retro game sounds preview](assets/image-retro-sounds-small.webp)

## Installation

```bash
npx claude-sounds
```

That's it. Pick a theme from the menu — if needed, it installs itself globally so hooks keep working.

## Available Themes

| Theme | Game |
|-------|------|
| `sc` | 🚀 StarCraft |
| `sc-terran` | 🚀 StarCraft: Terran |
| `sc-protoss` | 🚀 StarCraft: Protoss |
| `wc` | 🪓 Warcraft |
| `mk` | 🕺 Mortal Kombat |
| `ao2-britons` | 🏰 Age of Empires 2: Britons |
| `ao2-franks` | 🏰 Age of Empires 2: Franks |
| `ao2-turks` | 🏰 Age of Empires 2: Turks |


## Usage

### Interactive menu

```bash
claude-sounds
```

Use `↑↓` to navigate, `Enter` to select, `q` to quit.

### CLI commands

```bash
claude-sounds list              # list all themes
claude-sounds use <theme>       # apply a theme
claude-sounds use ao2-turks     # example
claude-sounds off               # disable sounds
claude-sounds current           # show active theme
```

## Themed Spinner Verbs

Each theme also replaces Claude Code's spinner verbs with game-themed phrases. While Claude is thinking, you'll see lines like *"Spawning zerglings"* or *"Summoning ogres"* instead of the defaults.

## How It Works

`claude-sounds use <theme>` writes hooks and spinner verbs to `~/.claude/settings.json`. Claude Code triggers sounds on these events:

| Event | When |
|-------|------|
| `sessionstart` | A session begins |
| `stop` | Claude finishes a response |
| `question` | Claude sends a notification |
| `sessionend` | A session ends |
| `submit` | You send a message |

## Requirements

- Node.js 18+
- Claude Code
- **macOS**: built-in `afplay` (no extra deps)
- **Windows**: built-in PowerShell (no extra deps)
- **Linux**: `mpg123` (`sudo apt install mpg123`)
