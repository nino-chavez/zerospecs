<script lang="ts">
	const log = [
		{
			date: '2026-03-05',
			time: '20:38',
			project: 'zerospecs.app',
			action: 'init',
			description: 'Domain purchased after a brainstorm session with Gemini. zerospecs.app — the name that writes itself.',
			duration: '5 min',
			prompt: 'brainstorm domain names for throwaway projects'
		},
		{
			date: '2026-03-05',
			time: '21:02',
			project: 'zerospecs.app',
			action: 'scaffold',
			description: 'SvelteKit + Tailwind v4 + TypeScript. Controlled chaos aesthetic. Glitch effects, neon colors, mouse-following gradient blob.',
			duration: '12 min',
			prompt: 'landing page and project hub. controlled chaos — AI went wild but it\'s still good.'
		},
		{
			date: '2026-03-05',
			time: '21:09',
			project: '/origin',
			action: 'ship',
			description: 'Easter egg page documenting the entire conversation that created the domain. Konami code activation.',
			duration: '7 min',
			prompt: 'easter egg that explains this whole exchange as its own page'
		},
		{
			date: '2026-03-05',
			time: '21:16',
			project: '/alt',
			action: 'ship',
			description: 'Multiverse page. XKCD, Daring Fireball, Homestar Runner, motherfuckingwebsite, and Geocities alternate timelines.',
			duration: '8 min',
			prompt: 'wild page that\'s a throwback to the inspo sites we didn\'t use'
		},
		{
			date: '2026-03-05',
			time: '21:16',
			project: 'og.webp',
			action: 'generate',
			description: 'AI-generated OG image via @nino-tools/image-gen. Cyberpunk figure with chromatic aberration.',
			duration: '30 sec',
			prompt: 'cyberpunk hero image for zerospecs.app'
		},
		{
			date: '2026-03-05',
			time: '21:28',
			project: 'zerospecs.app',
			action: 'deploy',
			description: 'Vercel project created, DNS configured in Cloudflare, deployed to production. SSL provisioned.',
			duration: '6 min',
			prompt: 'create vercel project, setup dns, deploy'
		},
		{
			date: '2026-03-05',
			time: '21:34',
			project: 'zerospecs.app',
			action: 'expand',
			description: 'Added /status, /wall, /roast, /ship, /reads, /stack. Populated project grid with all live projects.',
			duration: '~20 min',
			prompt: 'do all'
		}
	];

	function getActionColor(action: string): string {
		switch (action) {
			case 'init': return 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30';
			case 'scaffold': return 'text-neon-magenta bg-neon-magenta/10 border-neon-magenta/30';
			case 'ship': return 'text-neon-green bg-neon-green/10 border-neon-green/30';
			case 'deploy': return 'text-neon-yellow bg-neon-yellow/10 border-neon-yellow/30';
			case 'generate': return 'text-neon-purple bg-neon-purple/10 border-neon-purple/30';
			case 'expand': return 'text-neon-orange bg-neon-orange/10 border-neon-orange/30';
			default: return 'text-whisper bg-whisper/10 border-whisper/30';
		}
	}

	const totalDuration = '~58 min';
</script>

<svelte:head>
	<title>/ship — zerospecs</title>
	<meta name="description" content="Public build log. Every vibe-coded experiment, timestamped and exposed." />
</svelte:head>

<div class="min-h-screen bg-void">
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">&larr; back</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-cyan">/</span>ship
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			everything that was built, when it was built, and the exact prompt that started it.
		</p>
	</header>

	<main class="mx-auto max-w-3xl px-6 py-12">
		<!-- Stats bar -->
		<div class="mb-8 flex flex-wrap gap-4 rounded-lg border border-elevated bg-abyss/50 px-6 py-4 font-mono text-xs">
			<div><span class="text-whisper">entries:</span> <span class="text-neon-cyan">{log.length}</span></div>
			<div><span class="text-whisper">total build time:</span> <span class="text-neon-green">{totalDuration}</span></div>
			<div><span class="text-whisper">specs written:</span> <span class="text-neon-magenta">0</span></div>
		</div>

		<!-- Log entries -->
		<div class="space-y-3">
			{#each log as entry, i}
				<div class="rounded-lg border border-elevated/30 bg-abyss/30 p-4">
					<div class="mb-2 flex flex-wrap items-center gap-2">
						<span class="font-mono text-[10px] text-whisper/40">{entry.date} {entry.time}</span>
						<span class="rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold {getActionColor(entry.action)}">
							{entry.action}
						</span>
						<span class="font-mono text-xs text-chalk">{entry.project}</span>
						<span class="ml-auto font-mono text-[10px] text-whisper/40">{entry.duration}</span>
					</div>
					<p class="text-xs leading-relaxed text-ghost">{entry.description}</p>
					<div class="mt-2 rounded bg-surface/30 px-3 py-1.5">
						<p class="font-mono text-[10px] text-whisper/60">
							<span class="text-neon-green">$</span> {entry.prompt}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<p class="mt-8 text-center font-mono text-[10px] text-whisper/20">
			this page is its own entry in the log. very meta. much recursion.
		</p>
	</main>
</div>
