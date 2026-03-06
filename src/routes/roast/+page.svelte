<script lang="ts">
	let url = $state('');
	let roasting = $state(false);
	let roast = $state('');
	let score = $state<number | null>(null);

	const canned_roasts = [
		{ url: 'has meta tags', text: "Found {n} meta tags. That's not a website, that's a legal brief with a domain name. Over-specced into oblivion.", score: 15 },
		{ url: 'has scripts', text: "Detected JavaScript. I thought this was a website, not a therapy session for your bundler. {n} scripts loaded before the user even sees a pixel.", score: 35 },
		{ url: 'default', text: "This site exists. That's both its greatest achievement and its most damning critique. Somewhere, a PM wrote a spec for this. They were wrong.", score: 50 },
		{ url: 'hero', text: "A hero section. Bold. Revolutionary. Nobody's ever put a big heading and a CTA above the fold before. The specs for this must have been groundbreaking.", score: 42 },
		{ url: 'cookie', text: "A cookie banner! Nothing says 'we value your experience' like making you click a button before you can see the content you came for. Extremely specced.", score: 8 },
		{ url: 'fast', text: "It loaded fast. Suspiciously fast. Either this is brilliantly simple or there's nothing here. Both are valid outcomes of having zero specs.", score: 85 },
	];

	async function doRoast() {
		if (!url.trim()) return;
		roasting = true;
		roast = '';
		score = null;

		// Simulate a "scan" with progressive reveals
		const phases = [
			'scanning DOM...',
			'counting unnecessary divs...',
			'measuring spec compliance...',
			'consulting the vibes oracle...',
			'generating cruelty...'
		];

		for (const phase of phases) {
			roast = phase;
			await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
		}

		// Pick a roast
		const idx = Math.floor(Math.random() * canned_roasts.length);
		const r = canned_roasts[idx];
		const n = Math.floor(Math.random() * 40) + 5;
		roast = r.text.replace('{n}', String(n));
		score = r.score + Math.floor(Math.random() * 20) - 10;
		score = Math.max(0, Math.min(100, score));
		roasting = false;
	}
</script>

<svelte:head>
	<title>/roast — zerospecs</title>
	<meta name="description" content="Paste a URL. Get roasted for your specs compliance." />
</svelte:head>

<div class="min-h-screen bg-void">
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">&larr; back</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-orange">/</span>roast
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			paste a url. get judged by an ai that doesn't believe in specifications.
		</p>
	</header>

	<main class="mx-auto max-w-2xl px-6 py-12">
		<!-- Input -->
		<div class="flex gap-2">
			<input
				type="url"
				bind:value={url}
				placeholder="https://overspecced-website.com"
				class="flex-1 rounded-lg border border-elevated bg-abyss/80 px-4 py-3 font-mono text-sm text-chalk placeholder-whisper/30 outline-none transition-colors focus:border-neon-orange"
				onkeydown={(e) => e.key === 'Enter' && doRoast()}
			/>
			<button
				onclick={doRoast}
				disabled={roasting || !url.trim()}
				class="rounded-lg bg-neon-orange/10 border border-neon-orange/30 px-6 py-3 font-mono text-sm font-semibold text-neon-orange transition-all hover:bg-neon-orange/20 disabled:opacity-30 disabled:cursor-not-allowed"
			>
				{roasting ? '...' : 'roast'}
			</button>
		</div>

		<!-- Result -->
		{#if roast}
			<div class="mt-8 rounded-xl border border-elevated bg-abyss/50 p-6">
				{#if roasting}
					<p class="font-mono text-sm text-neon-orange animate-pulse">{roast}</p>
				{:else}
					<p class="text-sm leading-relaxed text-ghost">{roast}</p>

					{#if score !== null}
						<div class="mt-6">
							<div class="mb-2 flex justify-between font-mono text-xs">
								<span class="text-whisper">zero-specs compliance score</span>
								<span class="{score > 70 ? 'text-neon-green' : score > 40 ? 'text-neon-yellow' : 'text-neon-orange'}">{score}/100</span>
							</div>
							<div class="h-2 rounded-full bg-surface overflow-hidden">
								<div
									class="h-full rounded-full transition-all duration-1000 {score > 70 ? 'bg-neon-green' : score > 40 ? 'bg-neon-yellow' : 'bg-neon-orange'}"
									style="width: {score}%;"
								></div>
							</div>
							<p class="mt-2 font-mono text-[10px] text-whisper/40">
								{score > 70 ? 'minimal specs detected. the vibes are strong.' : score > 40 ? 'some specs leaked through. could be worse.' : 'over-specced. a PM was definitely involved.'}
							</p>
						</div>
					{/if}
				{/if}
			</div>
		{/if}

		<!-- Pre-roasted examples -->
		<div class="mt-12">
			<p class="mb-4 font-mono text-xs text-whisper/40">or try these:</p>
			<div class="flex flex-wrap gap-2">
				{#each ['https://zerospecs.app', 'https://motherfuckingwebsite.com', 'https://google.com', 'https://linkedin.com'] as example}
					<button
						class="rounded bg-surface/50 px-3 py-1 font-mono text-[10px] text-whisper/60 transition-colors hover:text-neon-orange"
						onclick={() => { url = example; doRoast(); }}
					>
						{example.replace('https://', '')}
					</button>
				{/each}
			</div>
		</div>
	</main>
</div>
