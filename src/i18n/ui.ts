export const LANGS = ['zh', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const ui = {
  zh: {
    htmlLang: 'zh-Hant-TW',
    navProjects: '作品',
    navAbout: '關於',
    navContact: '聯絡',
    switchTo: 'EN',
    heroPrompt: 'ls ~/projects',
    projectsTitle: '所有作品',
    projectsCount: '個專案',
    tagsCount: '種技術',
    featured: '精選',
    all: '全部',
    search: '搜尋專案或技術…',
    empty: '沒有符合條件的專案',
    status: { completed: '已完成', 'in-progress': '進行中', archived: '已封存' },
    source: '原始碼',
    demo: '線上 Demo',
    video: '示範影片',
    gallery: '截圖',
    notes: '開發筆記',
    back: '回到作品列表',
    prev: '上一個',
    next: '下一個',
    aboutTitle: '關於我',
    contactTitle: '一起做點什麼？',
    contactText: '對我的專案有興趣、想合作或有問題，都歡迎來信。',
    builtWith: '以 Astro 打造，部署於 Cloudflare',
    notFound: '找不到這個頁面',
    home: '回首頁',
    untranslated: '此專案尚無英文版，顯示中文內容。',
  },
  en: {
    htmlLang: 'en',
    navProjects: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    switchTo: '中文',
    heroPrompt: 'ls ~/projects',
    projectsTitle: 'All projects',
    projectsCount: 'projects',
    tagsCount: 'technologies',
    featured: 'Featured',
    all: 'All',
    search: 'Search projects or tech…',
    empty: 'No projects match',
    status: { completed: 'Completed', 'in-progress': 'In progress', archived: 'Archived' },
    source: 'Source',
    demo: 'Live demo',
    video: 'Demo video',
    gallery: 'Screenshots',
    notes: 'Dev notes',
    back: 'Back to projects',
    prev: 'Previous',
    next: 'Next',
    aboutTitle: 'About',
    contactTitle: 'Let’s build something',
    contactText: 'Interested in a project, want to collaborate, or have a question? Drop me a line.',
    builtWith: 'Built with Astro, deployed on Cloudflare',
    notFound: 'Page not found',
    home: 'Home',
    untranslated: 'No English version yet — showing the Chinese original.',
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
