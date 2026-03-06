<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ApertureTransition from '$lib/components/ApertureTransition.svelte';
	import FilmStrip from '$lib/components/FilmStrip.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	let isHome = $derived($page.url.pathname === '/');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:image" content="https://zerospecs.app/og.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="zerospecs" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://zerospecs.app/og.webp" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<ApertureTransition />

<div class={isHome ? 'pb-[72px]' : ''}>
	{@render children()}
</div>

{#if isHome}
	<FilmStrip />
{/if}
