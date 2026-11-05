---
title: Minecraft Guild Shop Prep List Mod
summary: A Fabric 1.21.11 client mod that adds a "Record buy orders" button beside the server's guild shop, reads this week's buy orders automatically, and shows how many of each item you still need.
date: 2026-11-05
tags: [Java, Fabric, Minecraft Mod]
category: Fabric 1.21.11
status: in-progress
group: minecraft
---

## Why

The server's guild shop buys different items every week, in two kinds: regular orders (unit price, budget, how many it still accepts) and limited orders (one-time, fixed reward). I had to hover over every slot to read the tooltip and could never remember what to gather or how many were still missing.

## Features

- When the guild shop opens, a row of buttons appears on its left: **Record**, **Collapse / Expand** and **Clear** (clear needs a double press so it can't be hit by accident)
- "Record" reads every buy order on the current page into a list — no more hovering slot by slot
- A side panel shows **how many are still needed** for each item (accepted amount minus what's in your inventory); finished items turn green with a check mark and move to the bottom
- The panel header estimates the total guild coins you'd earn by delivering everything
- Each time you reopen the shop, remaining amounts update automatically
- `/gs` prints only "item × amount still needed" in chat, usable anywhere

## How

- Fabric Screen API adds the buttons after the container screen initialises; a Mixin accessor reads the screen position so the buttons and panel sit on its left
- Item names and lore are parsed with regular expressions: buy / limited buy, unit price, budget, remaining capacity, "required × amount", reward and inventory count
- Only items named "收購 …" / "限量收購 …" or carrying a "required" line count as orders, so description items and the refresh button aren't picked up
- Parsing lives in Minecraft-independent classes, so it is tested directly against text from screenshots
- The list is saved as local JSON on a background thread (write temp file, then replace) so the game never stutters

## Progress

- 1.0.0: buttons, panel, list, command
- 1.0.1: limited orders supported; fixed description text being read as items; `/gs` trimmed to just items and amounts

In progress — screenshots and notes will be added after using it for a while.
