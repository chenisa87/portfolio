---
title: Celest PR Tracker — Dungeon Performance Mod
summary: A Fabric 1.21.11 client mod that parses combat stats after every dungeon run, ranks your damage, tanking, healing and clear speed against server-wide official statistics, and keeps personal bests, seasons and charts.
date: 2026-11-01
tags: [Java, Fabric, Minecraft Mod, Cloudflare Workers]
category: Fabric 1.21.11
status: in-progress
group: minecraft
featured: true
---

## Why

The server's dungeon results are just a wall of numbers — hard to tell whether you actually played well. The official site has server-wide stats, but comparing by hand is tedious. This mod tells you your percentile the moment a run ends.

## Features

- **Automatic results**: parses the combat summary in chat (time, damage, damage taken, healing) with zero input
- **Four PRs**: damage, tanking, healing and speed, each compared within its own role (DPS / tank / healer)
- **Beyond the peak**: shows a multiplier when you exceed the server's PR99 (e.g. PR100 ×1.35)
- **Personal bests**: fastest, highest damage, most tanked and most healed run per dungeon, always re-scored against the latest official data
- **Seasons**: detects official balance updates (e.g. V2.2 → V2.3), archives old data and starts a new season automatically
- **Charts**: a local HTML dashboard with per-run trends, best and average
- **Recovery tools**: unrecognised runs are saved for `/prt fix`; mis-recorded runs can be removed with `/prt undo`

## Technical highlights

- Minecraft **1.21.11** + **Fabric**, ~25 Java classes, ~4,600 lines
- Fetching and file I/O run on a background thread so the game never stutters; run history is cached
- Dungeon detection relies on the boss name in the result header, with chat and scoreboard as fallbacks; values over 5× the server PR99 are treated as a misdetection and not recorded
- **Anti-abuse**: manually assigned dungeons must match the boss name; unverified runs only count toward personal records
- A self-hosted backend (Cloudflare Workers + D1) handles usage stats and season settings; the mod works fine offline

## Result

Released publicly on the server and distributed through Discord; updated regularly from player feedback (currently v1.3.4).

## Takeaways

The hard part wasn't computing PR — it was identifying the right dungeon and trusting the data. Message formats vary and the official site sometimes lacks new dungeons, so one misdetection can inflate numbers tenfold. I learned to assume data will be wrong and add checks layer by layer.
