import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';

export default defineUserConfig({
  lang: 'en-US',
  title: 'Cool Ice Docs',
  description: 'Documentation for the Cool Ice monorepo',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: ['/', '/get-started'],
  }),

  bundler: viteBundler(),
});
