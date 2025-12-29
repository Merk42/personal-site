import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { Content } from './content';
export const serverRoutes: ServerRoute[] = [
  {
    path: ':section',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const contentService = inject(Content);
      const content = await contentService.contentSections();
      const sections:string[] = content.map(section => section.id);
      return sections.map((section) => ({section}));
    },
  },
  {
    path: 'resume',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  }
];
