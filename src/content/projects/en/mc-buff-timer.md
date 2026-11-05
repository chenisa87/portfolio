---
title: Minecraft Buff Timer Mod
summary: A Fabric 1.21.11 client mod that overlays each skill buff's remaining seconds right on its skill slot, flashing red with a ping near the end so you recast at the right moment and save mana.
date: 2026-11-04
tags: [Java, Fabric, Minecraft Mod]
category: Fabric 1.21.11
status: in-progress
group: minecraft
---

## Why

The server only shows buff timers as tiny icons crammed into the top-right corner, which are easy to miss mid-fight. I kept recasting too early (wasting mana) or too late (losing the buff). I wanted the seconds right on the skill icons I'm already looking at.

## Finding the data

I first assumed they were vanilla status effects, but they don't show in the inventory. It turned out the server writes buffs into team prefixes on the right-side scoreboard as `[skill name|time left]`, with times like `24`, `1:30` or `16m`.

## Features

- **Skill-slot mode**: the seconds sit above each skill icon, with a remaining-time bar along the icon's bottom edge; positions auto-align with another QoL mod's skill HUD
- **Automatic skill ↔ buff pairing**: most buffs share the skill's name, but many don't (e.g. "Black Hound" gives "Wolf Summon", "Holy War Cry" gives "Beast Form"), so I built a ~40-skill table from the official talent trees; each buff goes to only one slot
- **Adjustable**: in the editor, drag the timers, click a slot to pick its buff manually, scroll to resize
- Turns red and flashes with a sound under a threshold (only for slot buffs); shows tenths under 10 s
- On/off button and hotkey, a list-panel mode, and `/bt debug` to dump scoreboard and hotbar data to a file

## Tech

- Minecraft **1.21.11** + **Fabric Loader**, official Mojang mappings
- Reads the scoreboard every 0.25 s and interpolates the countdown on screen (the scoreboard only updates once a second)
- Parsing and pairing live in a Minecraft-free `core` package, tested against real captured data

## Notes

The first version guessed pairings by shared characters and often got them wrong; I also found the skill HUD's four slots actually map to hotbar slots 2–5. Dumping real data with `/bt debug` and checking it against the official talent trees is what finally made pairing accurate. Lesson: get the real data before writing rules.

Still verifying that every pairing is correct in play — screenshots coming later.
