---
title: Taiwan Stock Candlestick Pattern Mining
summary: Mining 2018–2025 daily candles from 50+ Taiwan stocks — 10 candlestick features and weighted similarity matching to find patterns that precede ±5% moves three days later, validated on 2026 data.
date: 2026-10-04
tags: [Python, pandas, yfinance, 資料探勘, GUI]
category: Data Mining
status: in-progress
group: coursework
featured: true
---

## Goal

First assignment for my Data Mining course: find candlestick patterns that tend to appear before the close moves more than ±5% within three days, and check whether they still hold on unseen data.

## Approach

- **Data**: 50+ Taiwan stocks via `yfinance`; 2018–2025 for training, 2026 for testing; ex-dividend days excluded.
- **Features**: 10 per candle — upper/lower shadows, body size, open/close style, volume ratio, 5-day trend (`kline_features.py`).
- **Matching**: a weighted similarity score groups similar patterns.
- **Second-pass filter**: keep patterns with frequency ≥ n and a high hit rate, ranked by profit.
- **Output**: a GUI showing the top 10 bullish / bearish patterns, tested on 2026 and compared across at least 10 stocks.

## Notes

> In progress — results and report coming soon.
