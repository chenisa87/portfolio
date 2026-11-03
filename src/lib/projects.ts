import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'> & { slug: string; translated: boolean };

const slugOf = (id: string) => id.split('/').slice(1).join('/');

/** 中文為主；英文版若缺某專案，沿用中文內容並標記 translated=false */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const all = await getCollection('projects', (p) => !p.data.draft);
  const zh = all.filter((p) => p.id.startsWith('zh/'));
  const en = new Map(all.filter((p) => p.id.startsWith('en/')).map((p) => [slugOf(p.id), p]));

  const list = zh.map((p) => {
    const slug = slugOf(p.id);
    if (lang === 'en' && en.has(slug)) return { ...en.get(slug)!, slug, translated: true };
    return { ...p, slug, translated: lang === 'zh' };
  });

  return list.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

/** Stable color pair from a string, for cover placeholders */
export function hueOf(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

export function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
