#!/usr/bin/env node
// 建立新專案的骨架（中英兩個 Markdown + 圖片資料夾）
// 用法：npm run new -- <slug> "中文標題" "English title" [competition|coursework|side|minecraft]
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [slug, zhTitle = '新專案', enTitle = zhTitle, group = 'side'] = process.argv.slice(2);
if (!['competition', 'coursework', 'side', 'minecraft'].includes(group)) {
  console.error('分類必須是 competition / coursework / side / minecraft');
  process.exit(1);
}
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('用法：npm run new -- <slug（小寫英數與連字號）> "中文標題" "English title"');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const dir = 'src/content/projects';
const tpl = (title, summary, notes) => `---
title: ${JSON.stringify(title)}
summary: ${JSON.stringify(summary)}
date: ${today}
tags: []
status: in-progress
group: ${group}
# category: 課程或比賽名稱
featured: false
# cover: /projects/${slug}/cover.png
# images: [/projects/${slug}/1.png]
# video: https://youtu.be/xxxxxxxxxxx
# repo: https://github.com/chenisa87/${slug}
# demo: https://example.com
---

${notes}
`;

for (const [lang, file] of [['zh', `${dir}/zh/${slug}.md`], ['en', `${dir}/en/${slug}.md`]]) {
  if (existsSync(file)) { console.error(`已存在：${file}`); process.exit(1); }
  mkdirSync(join(dir, lang), { recursive: true });
}
writeFileSync(`${dir}/zh/${slug}.md`, tpl(zhTitle, '一句話介紹這個專案。', '## 專案目標\n\n## 做法\n\n## 心得\n'));
writeFileSync(`${dir}/en/${slug}.md`, tpl(enTitle, 'One-line summary of the project.', '## Goal\n\n## Approach\n\n## Notes\n'));
mkdirSync(`public/projects/${slug}`, { recursive: true });
writeFileSync(`public/projects/${slug}/.gitkeep`, '');
console.log(`✓ 已建立 ${slug}：src/content/projects/{zh,en}/${slug}.md 與 public/projects/${slug}/`);
