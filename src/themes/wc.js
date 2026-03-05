const base = {
  id: 'wc',
  name: 'Warcraft',
  soundDir: 'wc',
  events: {
    stop: ['PeonBuildingComplete1.mp3'],
    sessionstart: ['PeonReady1.mp3'],
    sessionend: ['PeonPissed2.mp3'],
    question: ['PeonWhat2.mp3'],
    submit: [],
  },
  verbs: [
    '⚔️ Training grunts',
    '⛏️ Sending peons',
    '🩸 Casting bloodlust',
    '⚒️ Building stronghold',
    '👹 Summoning ogres',
    '⛏️ Zug Zug',
    "⚔️ Lok'tar",
    "😈 When my work is finished, I'm coming back for you",
    '🪓 Chop chop!',
    "😩 I don't want to do this!",
    '💬 Zog tog',
    '💬 Dabu!',
    '🫡 You da boss',
    "❓ We're ready, master... I'm not ready!"
  ],
};

export const wc = base;
