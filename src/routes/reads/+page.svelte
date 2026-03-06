<script lang="ts">
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
</script>

<svelte:head>
	<title>/reads — zerospecs</title>
	<meta name="description" content="Curated posts about vibe coding, AI tools, and building fast." />
</svelte:head>

<div class="min-h-screen bg-void">
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">&larr; back</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-yellow">/</span>reads
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			curated writing about building fast, AI tools, and the art of shipping without specs.
		</p>
	</header>

	<main class="mx-auto max-w-3xl px-6 py-12">
		<div class="space-y-4">
			{#each posts as post}
				<a
					href={post.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group block rounded-xl border border-elevated/30 bg-abyss/30 p-5 transition-all duration-200 hover:border-whisper/20 hover:bg-abyss/60"
				>
					<div class="mb-2 flex items-center gap-2">
						<span class="font-mono text-[10px] text-neon-yellow/60">{post.source}</span>
						<span class="text-whisper/20">·</span>
						<span class="font-mono text-[10px] text-whisper/40">{post.date}</span>
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
				</a>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<a
				href="https://blog.ninochavez.co"
				target="_blank"
				rel="noopener noreferrer"
				class="font-mono text-xs text-whisper/40 transition-colors hover:text-neon-yellow"
			>
				more at Signal Dispatch &rarr;
			</a>
		</div>
	</main>
</div>
