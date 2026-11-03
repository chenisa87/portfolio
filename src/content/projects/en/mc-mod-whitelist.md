---
title: Minecraft Mod Whitelist & Licensing Service
summary: A self-built cloud licensing service that controls which guild members can use which Minecraft mods, logs usage, alerts on unauthorized use, and later grew a dungeon PR leaderboard. Runs on Cloudflare Workers + D1 within the free tier.
date: 2026-10-14
tags: [JavaScript, Cloudflare Workers, Cloudflare D1, Java, Minecraft Mod]
category: Game mod
status: completed
cover: /projects/mc-mod-whitelist/cover.webp
images: [/projects/mc-mod-whitelist/1.webp, /projects/mc-mod-whitelist/2.webp, /projects/mc-mod-whitelist/3.webp]
---

> Screenshots use test data, not real guild members.

## Goal

I write client-side Minecraft mods for my guild and didn't want them leaking freely. I wanted:

- One website to manage who can use which mod — per mod, or all mods at once (including future ones)
- A single verification method every new mod can reuse
- To know who used a mod and when, and to be alerted the moment someone outside the whitelist tries

The aim was practical: anything installed on someone else's machine can be decompiled. The goal is to **make leaking inconvenient and traceable**, not unbreakable.

## Approach

**Architecture**

```
Mod (Java) ──POST /api/check──▶ Cloudflare Worker ──▶ D1 (SQLite)
                                      │
Admin dashboard (single-page HTML) ◀── /admin/api      Discord webhook (alerts)
```

**Mod side**: a loader-agnostic `LicenseCheck.java` (works with Fabric and Forge) that verifies the player's UUID asynchronously on join, so the game never stalls; it can be configured to allow play when the server is unreachable. Adding it to a new mod is one file and one line.

**Backend (Cloudflare Workers + D1)**

- Whitelist keyed by **UUID**, not name (names can change); admins type a name and the UUID is looked up
- `mod_id = '*'` in the grants table means "all mods", so new mods are covered automatically
- Usage is logged once per player, per mod, per day to keep the database small
- Unauthorized use is pushed to Discord, at most once an hour per player and mod
- Tables are created on first request; later schema changes and data moves run as one-time migrations

**Security**

- Admin password and signing key live in Cloudflare Secrets, never in Git
- HMAC-signed session cookie (HttpOnly, Secure, SameSite=Strict) with timing-safe comparison
- 5 failed logins from one IP locks it for 15 minutes; write APIs require JSON, which together with SameSite blocks cross-site forgery

**Dashboard**: plain HTML + JS, dark theme, mobile friendly. The overview shows unauthorized-use alerts, a 14-day usage chart and per-mod rankings; the whitelist page handles permissions, bans and notes.

## Problems along the way

- **Mojang blocks Cloudflare**: after launch, every name-to-UUID lookup failed. I added fallback lookup services and distinguished "player doesn't exist" from "service temporarily down", retrying the latter automatically.
- **Build vs. runtime variables**: the secrets were first set in Cloudflare's build settings, which the running site can't read; finding the difference fixed login.
- **Adding players without logging in**: a `whitelist.json` in the repo — add a name, push, and after deployment the site looks up the UUID and adds the player, flagging typos in the dashboard. Permissions changed manually in the dashboard are not overwritten by the file.

## Extensions

The service became the shared backend for my other mods:

- **Public mods**: some mods need no whitelist but still log users and versions
- **Update reminders**: newer mod versions are detected automatically and players on old versions are reminded in game
- **Dungeon PR leaderboard**: mods report players' dungeon results; the site re-verifies percentile ranks against the server's public statistics, ranks per season (version number), keeps the top three, and flags suspiciously high values for review
- **Share links**: leaderboard links for specific people, with optional expiry and the ability to revoke

## Results

- Live and used by guild members; every mod shares the same verification
- Whitelisting went from "log in and click" to "edit one line", which an AI assistant can also handle
- Runs entirely on Cloudflare's free tier with no server to maintain

## Reflections

My first service taken from zero to production and then extended over time. The biggest lesson was deciding *how much* protection is enough before deciding how complex to build — and that platform constraints (blocked connections, build vs. runtime environments) often take more time than the code itself.
