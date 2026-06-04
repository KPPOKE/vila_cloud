import { siteConfig } from '$lib/data/site';

export const prerender = true;

export function load() {
  return {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  };
}
