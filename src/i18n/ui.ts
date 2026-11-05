export const LANGS = ['zh', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const ui = {
  zh: {
    htmlLang: 'zh-Hant-TW',
    switchTo: 'EN',
    theme: '切換深淺色',
    groups: {
      competition: { title: '比賽', desc: '黑客松與競賽作品。' },
      coursework: { title: '專題與課程', desc: '課堂專題、作業與實驗。' },
      side: { title: 'Side Projects', desc: '自己想做就做的工具和實驗。' },
      minecraft: { title: 'Minecraft', desc: '替伺服器與公會夥伴寫的 Fabric 模組與服務。' },
    },
    status: { completed: '已完成', 'in-progress': '進行中', archived: '已封存' },
    featured: '精選',
    source: '原始碼',
    demo: 'Demo',
    gallery: '截圖',
    back: '所有作品',
    prev: '上一個',
    next: '下一個',
    contact: '聯絡',
    notFound: '找不到這個頁面',
    home: '回首頁',
    untranslated: '此專案尚無英文版，顯示中文內容。',
    builtWith: '以 Astro 打造，部署於 Cloudflare',
    usage: {
      nav: '用量',
      title: 'AI Token 用量',
      kicker: 'AI coding tools',
      lead: '我每天用 AI 工具（Claude Code、Gemini CLI…）寫程式的 token 用量，每天自動更新。',
      byAgent: '依工具',
      total: '總計',
      month: '本月',
      latest: '最近一天',
      active: '使用天數',
      avg: '日平均',
      days: '天',
      calendar: '行事曆',
      monthTotal: '本月合計',
      year: '過去一年',
      months: '每月合計',
      breakdown: '組成',
      input: '輸入',
      output: '輸出',
      cacheWrite: '快取寫入',
      cacheRead: '快取讀取',
      models: '模型',
      noUse: '這天沒有使用',
      pick: '點日期看當天明細',
      empty: '還沒有資料——第一次同步完成後就會出現。',
      updated: '最後更新',
      note: '資料來源：本機 AI 工具的使用紀錄（ccusage），以台北時間分日。總計包含快取讀取。',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      less: '少',
      more: '多',
    },
  },
  en: {
    htmlLang: 'en',
    switchTo: '中文',
    theme: 'Toggle theme',
    groups: {
      competition: { title: 'Competitions', desc: 'Hackathons and contests.' },
      coursework: { title: 'Coursework', desc: 'Course projects, assignments and labs.' },
      side: { title: 'Side projects', desc: 'Tools and experiments I build for fun.' },
      minecraft: { title: 'Minecraft', desc: 'Fabric mods and services for my server and guild.' },
    },
    status: { completed: 'Completed', 'in-progress': 'In progress', archived: 'Archived' },
    featured: 'Featured',
    source: 'Source',
    demo: 'Demo',
    gallery: 'Screenshots',
    back: 'All work',
    prev: 'Previous',
    next: 'Next',
    contact: 'Contact',
    notFound: 'Page not found',
    home: 'Home',
    untranslated: 'No English version yet — showing the Chinese original.',
    builtWith: 'Built with Astro, deployed on Cloudflare',
    usage: {
      nav: 'Usage',
      title: 'AI token usage',
      kicker: 'AI coding tools',
      lead: 'How many tokens I burn coding with AI tools (Claude Code, Gemini CLI…) each day. Updated automatically every day.',
      byAgent: 'By tool',
      total: 'All time',
      month: 'This month',
      latest: 'Latest day',
      active: 'Active days',
      avg: 'Daily avg',
      days: 'days',
      calendar: 'Calendar',
      monthTotal: 'Month total',
      year: 'Past year',
      months: 'By month',
      breakdown: 'Breakdown',
      input: 'Input',
      output: 'Output',
      cacheWrite: 'Cache write',
      cacheRead: 'Cache read',
      models: 'Models',
      noUse: 'No usage this day',
      pick: 'Click a date to see details',
      empty: 'No data yet — it will appear after the first sync.',
      updated: 'Last updated',
      note: 'Source: local AI tool logs via ccusage, grouped by Taipei time. Totals include cache reads.',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      less: 'Less',
      more: 'More',
    },
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

/** '/projects/x' -> '/en/projects/x' for English */
export function localePath(lang: Lang, path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'zh') return p;
  return p === '/' ? '/en/' : `/en${p}`;
}

/** Given current pathname, return the same page in the other language */
export function switchPath(lang: Lang, pathname: string) {
  if (lang === 'zh') return pathname === '/' ? '/en/' : `/en${pathname}`;
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export function formatDate(d: Date, lang: Lang) {
  return lang === 'zh'
    ? `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}
