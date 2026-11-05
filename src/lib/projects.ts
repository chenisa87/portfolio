import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'> & { slug: string; translated: boolean };
export type Group = Project['data']['group'];

/** 首頁顯示順序 */
export const GROUPS: Group[] = ['competition', 'coursework', 'side', 'minecraft'];

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

export function byGroup(list: Project[]) {
  return GROUPS.map((g) => ({ group: g, items: list.filter((p) => p.data.group === g) })).filter(
    (s) => s.items.length > 0
  );
}

export function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
