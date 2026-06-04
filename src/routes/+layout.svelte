<script lang="ts">
	import './layout.css';
	import '@fontsource/geist-sans/index.css';
	import '@fontsource/geist-mono/index.css';
	import favicon from '$lib/assets/favicon.svg';
	import { siteConfig } from '$lib/data/site';

	let { children } = $props();
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{siteConfig.seo.title}</title>
  <meta name="title" content={siteConfig.seo.title} />
  <meta name="description" content={siteConfig.seo.description} />
  <meta name="keywords" content={siteConfig.seo.keywords} />
  <meta name="author" content={siteConfig.brand} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={siteConfig.seo.title} />
  <meta property="og:description" content={siteConfig.seo.description} />
  <meta property="og:site_name" content={siteConfig.brand} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={siteConfig.seo.title} />
  <meta property="twitter:description" content={siteConfig.seo.description} />

  <!-- Theme Color -->
  <meta name="theme-color" content="#10B981" />

  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
