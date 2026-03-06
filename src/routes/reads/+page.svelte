<script lang="ts">
	import { onMount } from 'svelte';

	const posts = [
		{
			title: 'The Case for Vibe Coding',
			excerpt: 'What happens when you give AI zero constraints and measure the output quality anyway. Spoiler: it\'s not as bad as the specs people think.',
			source: 'Signal Dispatch',
			url: 'https://blog.ninochavez.co',
			tags: ['ai', 'vibe-coding', 'process'],
			date: '2026'
		},
		{
			title: 'Building Rally HQ in a Weekend',
			excerpt: 'Real-time volleyball tournament management. From zero to Stripe payments in 48 hours. No Jira tickets were created in the making of this product.',
			source: 'Signal Dispatch',
			url: 'https://blog.ninochavez.co',
			tags: ['sveltekit', 'supabase', 'shipping'],
			date: '2026'
		},
		{
			title: 'AI Image Generation at Scale',
			excerpt: 'How @nino-tools/image-gen generates editorial illustrations from blog titles. Custom style systems, concept mapping, and batch optimization.',
			source: 'Signal Dispatch',
			url: 'https://blog.ninochavez.co',
			tags: ['ai', 'image-gen', 'tooling'],
			date: '2026'
		},
		{
			title: 'Why SvelteKit Wins',
			excerpt: 'After building 5+ production apps across Next.js, Astro, and SvelteKit — here\'s why SvelteKit keeps getting picked for new projects.',
			source: 'Signal Dispatch',
			url: 'https://blog.ninochavez.co',
			tags: ['sveltekit', 'framework', 'opinion'],
			date: '2026'
		},
		{
			title: 'Answer Engine Optimization',
			excerpt: 'Designing a personal site for AI consumption. Structured JSON-LD, Schema.org markup, and API endpoints that LLMs actually understand.',
			source: 'Signal Dispatch',
			url: 'https://blog.ninochavez.co',
			tags: ['seo', 'aeo', 'architecture'],
			date: '2026'
		}
	];

	const disclaimers = [
		"this page runs on vibes, not data",
		"these links all go to the same place. good luck.",
		"no RSS feed was consulted in the making of this page",
		"the articles may or may not exist. schrodinger's blog.",
		"click at your own risk. we haven't tested any of this.",
		"built without specs, verified without clicking",
		"this is what happens when you skip QA",
		"every link is a surprise. that's a feature.",
		"powered by optimism and placeholder data",
	];

	let mounted = $state(false);
	let bannerDismissed = $state(false);
	let glitchTick = $state(0);
	let activeDisclaimer = $state(0);
	let showFloater = $state(false);
	let floaterX = $state(0);
	let floaterY = $state(0);
	let stampRotation = $state(0);
	let showStamp = $state(false);

	onMount(() => {
		mounted = true;

		// Rotate disclaimers
		const disclaimerInterval = setInterval(() => {
			activeDisclaimer = (activeDisclaimer + 1) % disclaimers.length;
		}, 3500);

		// Random glitch on the banner
		const glitchInterval = setInterval(() => {
			glitchTick++;
			setTimeout(() => glitchTick++, 100);
		}, 5000 + Math.random() * 4000);

		// Floating warning that follows scroll
		setTimeout(() => {
			showFloater = true;
		}, 2000);

		// "NOT VERIFIED" stamp that slams in
		setTimeout(() => {
			stampRotation = -8 + Math.random() * 16;
			showStamp = true;
		}, 4000);

		return () => {
			clearInterval(disclaimerInterval);
			clearInterval(glitchInterval);
		};
	});

	function handleMouseMove(e: MouseEvent) {
		floaterX = e.clientX;
		floaterY = e.clientY;
	}
</script>

<svelte:head>
	<title>/reads — zerospecs</title>
	<meta name="description" content="Curated posts about vibe coding, AI tools, and building fast. Probably." />
</svelte:head>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="min-h-screen bg-void" onmousemove={handleMouseMove}>
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">&larr; back</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-yellow">/</span>reads
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			curated writing about building fast, AI tools, and the art of shipping without specs.
		</p>
	</header>

	<!-- Disclaimer banner -->
	{#if !bannerDismissed}
		<div
			class="relative overflow-hidden border-b border-neon-yellow/20 bg-neon-yellow/[0.03] px-6 py-3"
			class:glitch-banner={glitchTick % 2 === 1}
		>
			<div class="mx-auto flex max-w-3xl items-center justify-between gap-4">
				<p class="font-mono text-xs text-neon-yellow/70 transition-all duration-500">
					<span class="text-neon-yellow">!</span> {disclaimers[activeDisclaimer]}
				</p>
				<button
					class="shrink-0 font-mono text-[10px] text-whisper/30 transition-colors hover:text-neon-yellow"
					onclick={() => (bannerDismissed = true)}
				>
					dismiss (won't help)
				</button>
			</div>
			<!-- Animated progress bar that never completes -->
			<div class="absolute bottom-0 left-0 h-px bg-neon-yellow/30" style="animation: neverFinish 8s ease-in-out infinite;"></div>
		</div>
	{/if}

	<main class="relative mx-auto max-w-3xl px-6 py-12">
		<!-- Diagonal "UNVERIFIED" watermark across entire content -->
		<div
			class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03]"
			aria-hidden="true"
		>
			<span
				class="whitespace-nowrap font-display text-[120px] font-bold uppercase tracking-[0.3em] text-neon-yellow"
				style="transform: rotate(-25deg);"
			>
				UNVERIFIED
			</span>
		</div>

		<div class="relative space-y-4">
			{#each posts as post, i}
				<a
					href={post.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative block rounded-xl border border-elevated/30 bg-abyss/30 p-5 transition-all duration-200 hover:border-whisper/20 hover:bg-abyss/60"
				>
					<div class="mb-2 flex items-center gap-2">
						<span class="font-mono text-[10px] text-neon-yellow/60">{post.source}</span>
						<span class="text-whisper/20">·</span>
						<span class="font-mono text-[10px] text-whisper/40">{post.date}</span>
						<!-- Confidence meter -->
						<span class="ml-auto font-mono text-[8px] text-whisper/25">
							confidence: {Math.floor(15 + Math.random() * 30)}%
						</span>
					</div>
					<h3 class="font-display text-lg font-semibold text-chalk transition-colors group-hover:text-neon-yellow">
						{post.title}
					</h3>
					<p class="mt-2 text-sm leading-relaxed text-ghost">{post.excerpt}</p>
					<div class="mt-3 flex flex-wrap gap-1.5">
						{#each post.tags as tag}
							<span class="rounded bg-surface/50 px-2 py-0.5 font-mono text-[10px] text-whisper/50">#{tag}</span>
						{/each}
					</div>

					<!-- Hover tooltip warning -->
					<span class="absolute -right-1 -top-1 rounded-full border border-neon-orange/30 bg-void px-2 py-0.5 font-mono text-[8px] text-neon-orange/50 opacity-0 transition-opacity group-hover:opacity-100">
						may not exist
					</span>
				</a>
			{/each}
		</div>

		<!-- "NOT VERIFIED" stamp -->
		{#if showStamp}
			<div
				class="pointer-events-none absolute right-4 top-20 z-30"
				style="transform: rotate({stampRotation}deg); animation: stampSlam 0.3s cubic-bezier(0.22, 1, 0.36, 1);"
				aria-hidden="true"
			>
				<div class="rounded-sm border-[3px] border-neon-orange/40 px-5 py-2">
					<span class="font-display text-xl font-bold uppercase tracking-[0.15em] text-neon-orange/30">
						not verified
					</span>
				</div>
			</div>
		{/if}

		<div class="mt-12 text-center">
			<a
				href="https://blog.ninochavez.co"
				target="_blank"
				rel="noopener noreferrer"
				class="font-mono text-xs text-whisper/40 transition-colors hover:text-neon-yellow"
			>
				more at Signal Dispatch (this one actually works) &rarr;
			</a>
		</div>
	</main>

	<!-- Floating cursor-following warning -->
	{#if showFloater && !bannerDismissed}
		<div
			class="pointer-events-none fixed z-40 font-mono text-[9px] text-neon-yellow/20 transition-all duration-[1500ms] ease-out"
			style="left: {floaterX + 24}px; top: {floaterY + 20}px;"
			aria-hidden="true"
		>
			probably fine
		</div>
	{/if}
</div>

<style>
	@keyframes neverFinish {
		0% { width: 0%; }
		80% { width: 92%; }
		85% { width: 92%; }
		90% { width: 94%; }
		95% { width: 94.5%; }
		100% { width: 0%; }
	}

	@keyframes stampSlam {
		0% { transform: scale(3) rotate(0deg); opacity: 0; }
		60% { transform: scale(0.95); opacity: 1; }
		80% { transform: scale(1.05); }
		100% { transform: scale(1); opacity: 1; }
	}

	.glitch-banner {
		animation: bannerGlitch 0.15s steps(2);
	}

	@keyframes bannerGlitch {
		0% { transform: translateX(-2px); filter: hue-rotate(40deg); }
		25% { transform: translateX(2px); }
		50% { transform: translateX(-1px); filter: hue-rotate(-20deg); }
		75% { transform: translateX(1px); }
		100% { transform: translateX(0); filter: none; }
	}
</style>
