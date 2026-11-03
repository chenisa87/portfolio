# 吳丞宥的作品集

Astro 打造的中英雙語作品集，推到 `main` 後由 Cloudflare 自動建置並部署。

## 新增一個專案

```bash
npm run new -- my-project "中文標題" "English title"
```

會建立：

- `src/content/projects/zh/my-project.md` — 中文內容（必要）
- `src/content/projects/en/my-project.md` — 英文內容（選填，沒有就顯示中文）
- `public/projects/my-project/` — 封面、截圖、影片放這裡

### Frontmatter 欄位

| 欄位 | 說明 |
| --- | --- |
| `title` / `summary` | 標題、一句話簡介 |
| `date` | 日期，決定排序 |
| `tags` | 技術標籤，首頁可依此篩選 |
| `category` | 類別，例如 課程作業、競賽、遊戲模組 |
| `status` | `completed` / `in-progress` / `archived` |
| `featured` | `true` 會置頂並以大卡片顯示 |
| `draft` | `true` 則不公開 |
| `cover` / `images` | `/projects/<slug>/cover.png` 等 |
| `video` | YouTube 網址或 `/projects/<slug>/demo.mp4` |
| `repo` / `demo` | 原始碼與線上 Demo 連結 |

Markdown 內文就是「開發筆記」，可用標題、表格、程式碼區塊。

## 網站基本資料

改 `src/site.config.mjs`（名字、自我介紹、Email、連結、正式網址）。

## 本機開發

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出到 dist/
```

## 部署

Cloudflare Workers（Workers Builds 連結此 GitHub repo）：

- Build command：`npm run build`
- Deploy command：`npx wrangler deploy`（設定在 `wrangler.jsonc`）

每次 push 到 `main` 就會自動重新部署。GitHub Actions 另外會跑一次 build 檢查。
