<script lang="ts">
	import { onMount } from 'svelte';
	import { sites } from '$lib/data/projects';

	interface SiteStatus {
		name: string;
		url: string;
		status: 'checking' | 'up' | 'down' | 'slow';
		responseTime: number;
		checkedAt: string;
	}

	let statuses = $state<SiteStatus[]>(
		sites.map((s) => ({
			...s,
			status: 'checking' as const,
			responseTime: 0,
			checkedAt: ''
		}))
	);
	let allChecked = $state(false);

	async function checkSite(index: number) {
		const site = statuses[index];
		const start = performance.now();
		try {
			const res = await fetch(site.url, {
				method: 'HEAD',
				mode: 'no-cors',
				signal: AbortSignal.timeout(10000)
			});
			const elapsed = Math.round(performance.now() - start);
			statuses[index] = {
				...site,
				status: elapsed > 3000 ? 'slow' : 'up',
				responseTime: elapsed,
				checkedAt: new Date().toLocaleTimeString()
			};
		} catch {
			const elapsed = Math.round(performance.now() - start);
			statuses[index] = {
				...site,
				status: 'down',
				responseTime: elapsed,
				checkedAt: new Date().toLocaleTimeString()
			};
		}
	}

	onMount(async () => {
		await Promise.all(statuses.map((_, i) => checkSite(i)));
		allChecked = true;
	});

	function getStatusColor(status: string): string {
		switch (status) {
			case 'up': return 'text-neon-green';
			case 'slow': return 'text-neon-yellow';
			case 'down': return 'text-neon-orange';
			default: return 'text-whisper';
		}
	}

	function getStatusIcon(status: string): string {
		switch (status) {
			case 'up': return '●';
			case 'slow': return '◐';
			case 'down': return '○';
			default: return '◌';
		}
	}

	const upCount = $derived(statuses.filter((s) => s.status === 'up').length);
	const totalChecked = $derived(statuses.filter((s) => s.status !== 'checking').length);
</script>

<svelte:head>
	<title>/status — zerospecs</title>
</svelte:head>

<div class="min-h-screen bg-void">
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">&larr; back</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-green">/</span>status
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			is everything still standing? let's find out.
		</p>
	</header>

	<main class="mx-auto max-w-3xl px-6 py-12">
		<!-- Summary bar -->
		<div class="mb-8 flex items-center justify-between rounded-lg border border-elevated bg-abyss/50 px-6 py-4">
			<div class="font-mono text-sm">
				{#if !allChecked}
					<span class="text-whisper animate-pulse">checking {totalChecked}/{statuses.length}...</span>
				{:else if upCount === statuses.length}
					<span class="text-neon-green">all systems operational</span>
				{:else}
					<span class="text-neon-yellow">{upCount}/{statuses.length} up</span>
				{/if}
			</div>
			<button
				class="font-mono text-xs text-whisper/50 transition-colors hover:text-neon-cyan"
				onclick={() => { allChecked = false; statuses = statuses.map(s => ({ ...s, status: 'checking' as const, responseTime: 0 })); Promise.all(statuses.map((_, i) => checkSite(i))).then(() => allChecked = true); }}
			>
				↻ refresh
			</button>
		</div>

		<!-- Site list -->
		<div class="space-y-2">
			{#each statuses as site, i}
				<div class="flex items-center justify-between rounded-lg border border-elevated/30 bg-abyss/30 px-5 py-3 transition-colors hover:border-elevated/60">
					<div class="flex items-center gap-3">
						<span class="font-mono text-sm {getStatusColor(site.status)}">
							{getStatusIcon(site.status)}
						</span>
						<div>
							<span class="text-sm font-medium text-chalk">{site.name}</span>
							<span class="ml-2 font-mono text-[10px] text-whisper/40">{site.url.replace('https://', '')}</span>
						</div>
					</div>
					<div class="flex items-center gap-4">
						{#if site.status === 'checking'}
							<span class="font-mono text-xs text-whisper/40 animate-pulse">...</span>
						{:else}
							<span class="font-mono text-xs text-whisper/60">{site.responseTime}ms</span>
							<span class="font-mono text-[10px] uppercase tracking-widest {getStatusColor(site.status)}">
								{site.status}
							</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<p class="mt-8 text-center font-mono text-[10px] text-whisper/30">
			client-side checks via no-cors HEAD requests · response times are approximate
		</p>
	</main>
</div>
