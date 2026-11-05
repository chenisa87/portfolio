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
