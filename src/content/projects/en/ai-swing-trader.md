---
title: AI US-Stock Swing Trading Bot
summary: A backtested swing strategy proposes trades, then Claude weighs congressional trading disclosures, Trump's posts, Reddit buzz and news sentiment before buying. Runs daily on GitHub Actions against an Alpaca paper account, writes a post-mortem for every closed trade, and reports to a Bloomberg-terminal-style dashboard.
date: 2026-11-11
tags: [Python, pandas, yfinance, AI, Claude, GitHub Actions, Cloudflare Pages]
category: Automated Trading
status: in-progress
group: side
featured: false
draft: false
cover: /projects/ai-swing-trader/cover.webp
images: [/projects/ai-swing-trader/1.webp, /projects/ai-swing-trader/2.webp, /projects/ai-swing-trader/3.webp, /projects/ai-swing-trader/4.webp]
demo: https://ai-trader-3xr.pages.dev/public/
---

## Goal

A trading bot that explains and reviews itself: every trade records why it was made, and every win or loss gets a post-mortem. It runs on an Alpaca paper account sized at $300 for a one-month trial.

## Approach

- **Strategy selection**: a portfolio-level backtester (next-open fills, fractional shares, stop-loss, account kill switch, slippage) comparing six swing strategies on ETF and large-cap universes, split into in-sample (2016–2021) and out-of-sample (2022–now). The MACD trend strategy was chosen for its steadiest out-of-sample results.
- **Big-player and sentiment signals**: Trump's Truth Social posts, congressional trade disclosures, Reddit buzz (ApeWisdom) and news headlines — all free sources.
- **AI judgment**: Claude (via the Claude Code CLI) decides buy or skip for each candidate, writing reasons, risks, a consensus score and a sentiment score. It can only pick from strategy candidates, so the backtest stays meaningful.
- **Risk**: ≤30% per position, ≤3 positions, -10% stop per trade, full liquidation and halt at -30% account drawdown.
- **Post-mortems**: after each exit, Claude compares the trade with its max gain/drawdown and SPY over the same period, classifies the cause (selection, timing, market, luck) and suggests rule changes; a weekly report follows every Sunday.
- **Automation**: GitHub Actions before each US open, a Discord bot for notifications, and a Cloudflare Pages dashboard (password-protected, with a public percent-only page).

## Backtest (out-of-sample 2022–now, ETF universe)

| Strategy | Return | Sharpe | Max drawdown |
| --- | --- | --- | --- |
| MACD trend (selected) | +50.3% | 0.85 | -13.5% |
| SMA 20/50 | +57.7% | 0.75 | -14.3% |
| Momentum rotation | +75.2% | 0.73 | -16.6% |
| SPY buy & hold | +67.2% | 0.70 | -24.5% |

The strategy did not beat simply holding SPY on return, but with much smaller drawdowns and better risk-adjusted performance.

## Screenshots

Screenshots show the interface with sample data, not real trading results; see the public page for live performance.

## Notes

> In progress. Live paper-trading results and post-mortem findings will be added after the first month.
