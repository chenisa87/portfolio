---
title: Minecraft Earnings Tracker Mod
summary: A Fabric 1.21.11 client mod — hit a hotkey to start/stop, and it tallies the money, XP and items you earned on the server, then posts a summary in chat.
date: 2026-10-14
tags: [Java, Fabric, Minecraft Mod]
category: Game mod
status: in-progress
---

## Why

When grinding on the server I wanted to know how much I actually made per hour. Watching the balance is wrong — transfers from other shards get counted too.

## Features

- Hotkey to start / stop tracking
- Counts income by parsing the server's **"+money"** popups (not the balance)
- Also tracks XP and items gained
- Shows elapsed time and prints a summary in chat

## Tech

- Minecraft **1.21.11** + **Fabric Loader**
- Built for my guild; access is controlled by a UUID whitelist service I host on Cloudflare Workers + D1.
