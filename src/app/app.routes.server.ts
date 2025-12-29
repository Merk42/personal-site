import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':section',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { section: 'uncommon-goods' },
        { section: 'websites' },
        { section: 'libraries' },
        { section: 'other' }
      ];
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
