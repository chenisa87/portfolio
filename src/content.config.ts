import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 每個專案 = src/content/projects/zh/<slug>.md（必要）+ en/<slug>.md（選填，沒有就沿用中文）
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // 圖片放在 public/projects/<slug>/ ，這裡寫 "/projects/<slug>/cover.png"
    cover: z.string().optional(),
    images: z.array(z.string()).default([]),
    // YouTube 網址或 /projects/<slug>/demo.mp4
    video: z.string().optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

export const collections = { projects };
