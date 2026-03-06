<script lang="ts">
	const demos = [
		{
			name: 'Live Tournament',
			description: 'Experience a simulated tournament in real-time. Courts, brackets, and scores — all updating live.',
			url: 'https://rallyhq.app/t/demo',
			icon: '🏐'
		},
		{
			name: 'Tournament Manager',
			description: 'Create pools, seed teams, manage courts, and run an entire tournament from your phone.',
			url: 'https://rallyhq.app/manage/demo',
			icon: '📋'
		},
		{
			name: 'Event Hub',
			description: 'Browse upcoming events, view details, and register teams. The player-facing experience.',
			url: 'https://rallyhq.app/events/demo',
			icon: '📅'
		}
	];

	const features = [
		'Zero-latency real-time scoring',
		'Mobile-first scorekeeper interface',
		'Automatic bracket generation',
		'Stripe-powered team registration',
		'Web Push notifications for match alerts',
		'QR code court assignment',
		'Captain self-service tools',
		'Offline-capable scoring'
	];
</script>

<svelte:head>
	<title>Rally HQ Demo — zerospecs</title>
	<meta name="description" content="Try Rally HQ's tournament management platform. No signup required." />
</svelte:head>

<div class="min-h-screen bg-void">
	<!-- Header -->
	<header class="border-b border-elevated/30 px-6 py-8">
		<div class="mx-auto max-w-4xl">
			<div class="mb-4 flex items-center gap-3">
				<a href="https://zerospecs.app" class="font-mono text-xs text-whisper/40 transition-colors hover:text-neon-cyan">
					zerospecs
				</a>
				<span class="text-whisper/20">/</span>
				<span class="font-mono text-xs text-neon-cyan">rally</span>
			</div>

			<h1 class="font-display text-4xl font-bold text-chalk md:text-5xl">
				Rally <span class="text-neon-cyan">HQ</span>
			</h1>
			<p class="mt-3 max-w-lg text-sm leading-relaxed text-ghost">
				Real-time volleyball tournament management. Built in a weekend, running real events.
				No Jira ticket was created. No product manager was consulted. Just vibes and volleyball.
			</p>

			<div class="mt-6 flex flex-wrap gap-3">
				<a
					href="https://rallyhq.app"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 px-4 py-2 font-mono text-sm text-neon-cyan transition-all hover:bg-neon-cyan/20"
				>
					visit rallyhq.app ↗
				</a>
				<a
					href="https://rallyhq.app/t/demo"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg bg-surface border border-elevated px-4 py-2 font-mono text-sm text-chalk transition-all hover:border-whisper/30"
				>
					jump into demo
				</a>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-4xl px-6 py-12">
		<!-- Demo modes -->
		<section class="mb-16">
			<h2 class="font-display mb-6 text-xl font-semibold text-chalk">Try it</h2>
			<div class="grid gap-4 md:grid-cols-3">
				{#each demos as demo}
					<a
						href={demo.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group rounded-xl border border-elevated bg-abyss/50 p-6 transition-all duration-200 hover:border-neon-cyan/30 hover:shadow-lg"
					>
						<div class="mb-3 text-3xl">{demo.icon}</div>
						<h3 class="font-display text-base font-semibold text-chalk transition-colors group-hover:text-neon-cyan">
							{demo.name}
						</h3>
						<p class="mt-2 text-xs leading-relaxed text-ghost">{demo.description}</p>
						<span class="mt-3 inline-block font-mono text-[10px] text-neon-cyan/50 transition-colors group-hover:text-neon-cyan">
							try it ↗
						</span>
					</a>
				{/each}
			</div>
		</section>

		<!-- Features list -->
		<section class="mb-16">
			<h2 class="font-display mb-6 text-xl font-semibold text-chalk">What it does</h2>
			<div class="grid gap-2 sm:grid-cols-2">
				{#each features as feature}
					<div class="flex items-center gap-3 rounded-lg border border-elevated/20 bg-abyss/20 px-4 py-3">
						<span class="text-neon-green text-sm">✓</span>
						<span class="text-sm text-ghost">{feature}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- Tech stack -->
		<section>
			<h2 class="font-display mb-6 text-xl font-semibold text-chalk">Built with</h2>
			<div class="flex flex-wrap gap-2">
				{#each ['SvelteKit', 'Svelte 5', 'Tailwind v4', 'Supabase', 'Stripe', 'Web Push', 'Sentry', 'PostHog', 'Vercel'] as tech}
					<span class="rounded-lg border border-elevated bg-surface px-3 py-1.5 font-mono text-xs text-whisper">
						{tech}
					</span>
				{/each}
			</div>
		</section>

		<!-- Footer -->
		<footer class="mt-16 border-t border-elevated/30 pt-6 text-center">
			<p class="font-mono text-[10px] text-whisper/30">
				a zerospecs production · built on vibes, not requirements
			</p>
		</footer>
	</main>
</div>
