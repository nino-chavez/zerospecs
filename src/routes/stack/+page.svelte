<script lang="ts">
	import { stackData } from '$lib/data/projects';

	let activeCategory = $state<string | null>(null);
</script>

<svelte:head>
	<title>/stack — zerospecs</title>
	<meta name="description" content="Interactive map of every framework, service, and tool across all projects." />
</svelte:head>

<div class="min-h-screen bg-void">
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">&larr; back</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-purple">/</span>stack
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			every framework, service, and tool across {stackData.totals.projects} projects. no stack overflow, just stack everything.
		</p>
	</header>

	<main class="mx-auto max-w-4xl px-6 py-12">
		<!-- Totals -->
		<div class="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
			{#each [
				{ label: 'projects', value: stackData.totals.projects, color: 'neon-cyan' },
				{ label: 'frameworks', value: stackData.totals.frameworks, color: 'neon-magenta' },
				{ label: 'deployments', value: stackData.totals.deployments, color: 'neon-green' },
				{ label: 'databases', value: stackData.totals.databases, color: 'neon-yellow' }
			] as stat}
				<div class="rounded-lg border border-elevated bg-abyss/50 p-4 text-center">
					<div class="font-display text-3xl font-bold text-{stat.color}">{stat.value}</div>
					<div class="mt-1 font-mono text-[10px] uppercase tracking-widest text-whisper">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Frameworks -->
		<section class="mb-10">
			<h2 class="mb-4 font-display text-lg font-semibold text-chalk">Frameworks</h2>
			<div class="space-y-3">
				{#each stackData.frameworks as fw}
					<button
						class="w-full text-left rounded-lg border border-elevated/30 bg-abyss/30 p-4 transition-all hover:border-whisper/20"
						onclick={() => activeCategory = activeCategory === fw.name ? null : fw.name}
					>
						<div class="flex items-center justify-between">
							<span class="font-mono text-sm text-chalk">{fw.name}</span>
							<div class="flex items-center gap-3">
								<div class="flex gap-1">
									{#each Array(fw.count) as _}
										<div class="h-3 w-3 rounded-sm bg-neon-cyan/60"></div>
									{/each}
									{#each Array(Math.max(0, 6 - fw.count)) as _}
										<div class="h-3 w-3 rounded-sm bg-surface"></div>
									{/each}
								</div>
								<span class="font-mono text-xs text-whisper">{fw.count}</span>
							</div>
						</div>
						{#if activeCategory === fw.name}
							<div class="mt-3 flex flex-wrap gap-1.5">
								{#each fw.projects as project}
									<span class="rounded bg-neon-cyan/10 border border-neon-cyan/20 px-2 py-0.5 font-mono text-[10px] text-neon-cyan/80">
										{project}
									</span>
								{/each}
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</section>

		<!-- Styling -->
		<section class="mb-10">
			<h2 class="mb-4 font-display text-lg font-semibold text-chalk">Styling</h2>
			<div class="grid gap-3 sm:grid-cols-3">
				{#each stackData.styling as s}
					<div class="rounded-lg border border-elevated/30 bg-abyss/30 p-4">
						<div class="font-mono text-sm text-chalk">{s.name}</div>
						<div class="mt-2 flex gap-1">
							{#each Array(s.count) as _}
								<div class="h-2 w-6 rounded-sm bg-neon-magenta/50"></div>
							{/each}
						</div>
						<div class="mt-1 font-mono text-[10px] text-whisper">{s.count} projects</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Infrastructure -->
		<section class="mb-10">
			<h2 class="mb-4 font-display text-lg font-semibold text-chalk">Infrastructure</h2>
			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each stackData.infrastructure as svc}
					<div class="flex items-center justify-between rounded-lg border border-elevated/30 bg-abyss/30 px-4 py-3">
						<span class="font-mono text-sm text-chalk">{svc.name}</span>
						<span class="font-mono text-xs text-neon-green">{svc.count}x</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- AI -->
		<section class="mb-10">
			<h2 class="mb-4 font-display text-lg font-semibold text-chalk">AI / ML</h2>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each stackData.ai as provider}
					<div class="flex items-center justify-between rounded-lg border border-elevated/30 bg-abyss/30 px-4 py-3">
						<span class="font-mono text-sm text-chalk">{provider.name}</span>
						<span class="font-mono text-xs text-neon-purple">{provider.count}x</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- Languages -->
		<section>
			<h2 class="mb-4 font-display text-lg font-semibold text-chalk">Languages</h2>
			<div class="flex flex-wrap gap-3">
				{#each stackData.languages as lang}
					<div class="flex items-center gap-2 rounded-lg border border-elevated/30 bg-abyss/30 px-4 py-2">
						<span class="font-mono text-sm text-chalk">{lang.name}</span>
						<div class="flex gap-0.5">
							{#each Array(Math.min(lang.count, 10)) as _}
								<div class="h-2 w-2 rounded-full bg-neon-yellow/50"></div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<p class="mt-12 text-center font-mono text-[10px] text-whisper/20">
			no spec was consulted in the accumulation of this tech debt
		</p>
	</main>
</div>
