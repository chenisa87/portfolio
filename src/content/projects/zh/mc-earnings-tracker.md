---
title: Minecraft 收益追蹤模組
summary: Fabric 1.21.11 用戶端模組，一鍵開始／停止計時，自動統計這段時間從伺服器賺到的金錢、經驗與物品，結束時在聊天欄輸出摘要。
date: 2026-10-14
tags: [Java, Fabric, Minecraft Mod]
category: Fabric 1.21.11
status: in-progress
group: minecraft
---

## 為什麼做

在伺服器刷資源時，想知道「這一小時到底賺了多少」。看餘額不準——從其他分流轉帳進來的錢也會被算進去。

## 功能

- 快捷鍵開始／停止追蹤
- 解析伺服器跳出的 **「+金錢」** 提示來累計收入（不看餘額）
- 同時統計經驗值與獲得的物品
- 顯示經過時間，結束時在聊天欄輸出總結

## 技術

- Minecraft **1.21.11** + **Fabric Loader**
- 這個模組是給公會成員用的，搭配我自己架的 白名單驗證服務（Cloudflare Workers + D1）控管使用者。
