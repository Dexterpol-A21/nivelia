// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://glyv.com',
  integrations: [
    sitemap({ changefreq: 'weekly', priority: 0.7, lastmod: new Date() }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': path.resolve(root, 'src/components'),
        '@layouts': path.resolve(root, 'src/layouts'),
        '@utils': path.resolve(root, 'src/utils'),
      },
    },
  },
  devToolbar: { enabled: false },
  compressHTML: true,
});
