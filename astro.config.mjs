// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// При деплое на GitHub Pages base автоматически берётся из имени репозитория.
// Для Netlify/Vercel и локальной разработки base = '/' (по умолчанию).
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = repoName ? `/${repoName}/` : '/';

export default defineConfig({
  site: 'https://alexzakharov.dev',
  base,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
