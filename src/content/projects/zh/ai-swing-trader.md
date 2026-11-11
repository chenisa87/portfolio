---
title: AI 美股波段交易機器人
summary: 回測挑出波段策略，再讓 Claude 參考國會議員交易、川普貼文、Reddit 與新聞風向決定要不要買；每天在 GitHub Actions 自動下單（Alpaca 模擬盤），每筆平倉自動做賽後復盤，結果放在彭博終端機風格的網站上。
date: 2026-11-11
tags: [Python, pandas, yfinance, AI, Claude, GitHub Actions, Cloudflare Pages]
category: 自動化交易
status: in-progress
group: side
featured: false
draft: false
cover: /projects/ai-swing-trader/cover.webp
images: [/projects/ai-swing-trader/1.webp, /projects/ai-swing-trader/2.webp, /projects/ai-swing-trader/3.webp, /projects/ai-swing-trader/4.webp]
demo: https://ai-trader-3xr.pages.dev/public/
---

## 專案目標

做一個「會解釋自己、會檢討自己」的交易機器人：每一筆買賣都要留下理由，賺錢或賠錢後都要寫復盤，讓我能看懂它為什麼這樣做。先用 Alpaca 模擬盤跑一個月，用 300 美元的規模測試。

## 做法

- **回測選策略**：自己寫組合層級的回測引擎（隔日開盤成交、碎股、停損、總資金停機、滑價），比較 6 種波段策略，在 ETF 與大型股兩組股票池上切成樣本內（2016–2021）與樣本外（2022 至今）。目前選用樣本外表現最穩定的 MACD 趨勢策略。
- **大老訊號與網路風向**：每天抓川普 Truth Social 貼文、國會議員交易申報、Reddit 熱度（ApeWisdom）與新聞標題，全部用免費來源。
- **AI 判斷**：策略產生候選股後，由 Claude（Claude Code CLI）綜合訊號決定買或跳過，並寫下理由、風險、大老共識分數與風向分數。AI 只能從候選股裡挑，不能自己發明交易，讓回測結果仍然有參考價值。
- **風控**：單檔最多 30%、最多 3 檔、每筆停損 -10%、總資金 -30% 自動出清停機。
- **復盤**：每筆平倉後，Claude 對照持有期間的最大漲跌與同期 SPY，判斷是選股、時機、大盤還是運氣，寫下教訓與規則建議；每週日再出週報。
- **自動化**：GitHub Actions 每個交易日開盤前執行、Discord Bot 推播、網站用 Cloudflare Pages 部署，完整版加密碼，另有只顯示百分比的公開頁。

## 回測結果（樣本外 2022 至今，ETF 股票池）

| 策略 | 報酬 | Sharpe | 最大回撤 |
| --- | --- | --- | --- |
| MACD 趨勢（選用） | +50.3% | 0.85 | -13.5% |
| 均線多頭排列 | +57.7% | 0.75 | -14.3% |
| 動能輪動 | +75.2% | 0.73 | -16.6% |
| SPY 買進持有 | +67.2% | 0.70 | -24.5% |

策略報酬沒有贏過直接買 SPY，但回撤小很多，風險調整後表現較好。

## 截圖

截圖為介面示意，使用範例資料，不是實際交易結果；實際績效請看公開頁。

## 心得

> 進行中。模擬盤跑滿一個月後補上實際績效與復盤觀察。
