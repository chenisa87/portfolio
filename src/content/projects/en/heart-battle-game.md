---
title: "Heart Battle: A Confession Battle Game"
summary: A Pokémon-style 2D turn-based battle web game that builds up through type matchups, hidden moves and an "attack the trainer" twist, ending with a real Poké Ball handed over in person. Single HTML file, original characters and synthesized sound, deployed on Cloudflare Pages.
date: 2026-10-22
tags: [HTML, CSS, JavaScript, Web Audio API, Cloudflare Pages, 遊戲]
category: Personal project
status: completed
featured: false
draft: true
cover: /projects/heart-battle-game/cover.webp
images: [/projects/heart-battle-game/1.webp, /projects/heart-battle-game/cover.webp, /projects/heart-battle-game/2.webp]
---

## Goal

A small phone-friendly game built around Pokémon, which the player loves, that slowly turns into a confession. The focus is pacing: it starts as a normal battle, gets a little strange halfway, and the final moment steps off the screen into real life.

## Flow

1. **Trainer sign-up**: six short questions (birthday, favorite Pokémon…). The answers come back later in battle lines and the ending.
2. **Type battles**: three original monsters per side, with type matchups, critical hits, paralysis, healing and shields. Moves are tagged "▲ super / ▼ weak", so early fights are won on type advantage.
3. **Hidden move**: the 4th "flirt" move unlocks only after the first enemy faints, revealing that the trainer has a "heart guard" bar too.
4. **Attack the trainer**: after two knockouts (or three flirt moves) the player can target the trainer directly; the trainer "pretends to stay calm" and recovers once to keep the tension up.
5. **Capture**: only four heart balls exist in the game and they all fail. The fifth is handed over in real life. Pressing "I threw it!" plays the ending and a memory album typed out character by character.

## How it was built

- **One HTML file**: every character is hand-written inline SVG. No official Pokémon art or music is used.
- **Turn pipeline**: `async/await` chains move → animation → dialogue → faint/switch checks; the typewriter dialogue can be tapped to skip.
- **8-bit synthesized audio**: all music (four tracks switched by story beat) and sound effects are generated live with the Web Audio API, no audio files. Includes a remembered mute toggle.
- **Balance testing**: a Playwright script simulates three play styles (attack-only, flirt-only, random) to tune unlock rules so every style lands around 20–30 turns.
- **Deployment**: GitHub + Cloudflare Pages with automatic deploys on push; layout checked at 375px phone width.

## Problems solved

- **Second monster invisible**: the faint animation used `fill: 'forwards'`, which kept opacity at 0 after the next monster appeared. Fixed by cancelling old animations before each entrance.
- **No sound in iPhone silent mode**: Web Audio follows the hardware mute switch, so the player has to be reminded beforehand.
- **Stuck deploy**: delayed GitHub events made a Cloudflare build time out; a manual retry fixed it.

## Takeaways

The hardest part wasn't the code but deciding when the player should discover the next secret. Moving the flirt unlock from "use it three times" to "beat one enemy first" is what finally made the pacing work.
