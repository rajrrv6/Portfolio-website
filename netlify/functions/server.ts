// netlify/functions/server.ts
import 'zone.js/node';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';
import { AppComponent } from '../../src/app/app.component';
// Rename the imported 'config' to 'appConfig' to avoid conflict
import { config as appConfig } from '../../src/app/app.config.server';

export default async (req: Request, context: any) => {
  const html = await renderApplication(
    // Use the renamed 'appConfig' here
    () => bootstrapApplication(AppComponent, appConfig),
    {
      document: '<app-root></app-root>',
      url: new URL(req.url).pathname,
    }
  );
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};

// This is the Netlify-specific config, which is fine to keep as 'config'
export const config = {
  path: '/*',
  prefer_static: true,
};