<script lang="ts">
	import { onMount } from 'svelte';
	import { externalProjects, internalPages } from '$lib/data/projects';
	import { depthOfField } from '$lib/actions/depthOfField';

	let mounted = $state(false);
	let glitchActive = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let konami = $state('');

	const KONAMI_CODE = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';

	onMount(() => {
		mounted = true;
		const glitchInterval = setInterval(() => {
			glitchActive = true;
			setTimeout(() => (glitchActive = false), 150);
		}, 4000 + Math.random() * 3000);
		return () => clearInterval(glitchInterval);
	});

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}

	function handleKeyDown(e: KeyboardEvent) {
		konami += e.key;
		if (konami.length > KONAMI_CODE.length) {
			konami = konami.slice(-KONAMI_CODE.length);
		}
		if (konami === KONAMI_CODE) {
			window.location.href = '/origin';
		}
	}
</script>

<svelte:head>
	<title>zerospecs — no docs. no specs. just code.</title>
	<meta name="description" content="What happens when you give AI zero specifications. Controlled chaos, surprisingly competent." />
</svelte:head>

<svelte:window onkeydown={handleKeyDown} />

<div
	class="relative min-h-screen overflow-hidden"
	onmousemove={handleMouseMove}
	role="presentation"
>
	<!-- Animated background grid -->
	<div class="pointer-events-none fixed inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(var(--color-neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-neon-cyan) 1px, transparent 1px); background-size: 60px 60px;"
	></div>

	<!-- Mouse-following gradient blob -->
	<div
		class="pointer-events-none fixed z-0 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px] transition-all duration-700 ease-out"
		style="
			background: radial-gradient(circle, var(--color-neon-magenta), var(--color-neon-cyan), transparent);
			left: {mouseX - 300}px;
			top: {mouseY - 300}px;
		"
	></div>

	<!-- Scan line effect -->
	<div
		class="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
		style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, var(--color-neon-cyan) 2px, var(--color-neon-cyan) 4px);"
	></div>

	<!-- Main content -->
	<main class="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-24">
		<!-- Hero -->
		<header class="mb-20 md:mb-28">
			<div class="relative mb-8">
				{#if glitchActive}
					<span
						class="font-display absolute left-0 top-0 text-6xl font-bold tracking-tight text-neon-cyan opacity-70 md:text-8xl"
						style="animation: glitch-1 0.15s steps(2) infinite;"
						aria-hidden="true"
					>
						zero<span class="text-neon-magenta">specs</span>
					</span>
					<span
						class="font-display absolute left-0 top-0 text-6xl font-bold tracking-tight text-neon-magenta opacity-70 md:text-8xl"
						style="animation: glitch-2 0.15s steps(2) infinite;"
						aria-hidden="true"
					>
						zero<span class="text-neon-cyan">specs</span>
					</span>
				{/if}
				<h1
					class="font-display text-6xl font-bold tracking-tight md:text-8xl {mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000"
				>
					<span class="text-chalk">zero</span><span
						class="bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow bg-clip-text text-transparent"
						>specs</span
					>
				</h1>
			</div>

			<p
				class="font-mono max-w-xl text-lg text-ghost {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all delay-300 duration-700"
			>
				<span class="text-neon-green">$</span> no docs. no specs. just code.
			</p>

			<p
				class="mt-4 max-w-lg text-sm leading-relaxed text-whisper {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all delay-500 duration-700"
			>
				What happens when you give AI zero specifications and let it cook.
				Each project below was vibe-coded into existence — no requirements doc,
				no Jira ticket, no adult supervision.
			</p>

			<div
				class="mt-10 max-w-md rounded-lg border border-elevated bg-abyss/80 p-4 font-mono text-xs backdrop-blur-sm {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all delay-700 duration-700"
			>
				<div class="mb-2 flex gap-1.5">
					<div class="h-2.5 w-2.5 rounded-full bg-neon-orange"></div>
					<div class="h-2.5 w-2.5 rounded-full bg-neon-yellow"></div>
					<div class="h-2.5 w-2.5 rounded-full bg-neon-green"></div>
				</div>
				<p class="text-ghost"><span class="text-neon-cyan">specs</span> <span class="text-whisper">= </span><span class="text-neon-magenta">null</span></p>
				<p class="text-ghost"><span class="text-neon-cyan">vibes</span> <span class="text-whisper">= </span><span class="text-neon-yellow">Infinity</span></p>
				<p class="text-ghost"><span class="text-neon-cyan">result</span> <span class="text-whisper">= </span><span class="text-neon-green">"surprisingly competent"</span></p>
				<p class="mt-1 text-whisper">
					<span class="animate-pulse text-neon-green">▊</span>
				</p>
			</div>
		</header>

		<!-- Shipped Projects -->
		<section class="mb-20">
			<div class="mb-8 flex items-center gap-4">
				<h2 class="font-display text-2xl font-semibold text-chalk">Shipped</h2>
				<div class="h-px flex-1 bg-gradient-to-r from-elevated to-transparent"></div>
				<span class="font-mono text-xs text-whisper">{externalProjects.length} deployed</span>
			</div>

			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each externalProjects as project, i}
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden rounded-xl border border-elevated bg-abyss/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-whisper/30 hover:shadow-lg"
					use:depthOfField={{ name: project.name, group: 'shipped' }}
					>
						<div class="mb-2 flex items-center justify-between">
							<h3 class="font-display text-base font-semibold text-chalk transition-colors group-hover:text-neon-cyan">
								{project.name}
							</h3>
							<span
								class="font-mono text-[10px] uppercase tracking-widest {project.status === 'live' ? 'text-neon-green' : project.status === 'cooking' ? 'text-neon-yellow' : 'text-whisper'}"
							>
								{project.status === 'live' ? '● live' : '◌ cooking'}
							</span>
						</div>
						<p class="mb-3 text-xs leading-relaxed text-ghost">{project.description}</p>
						<div class="flex flex-wrap gap-1">
							{#each project.tech as t}
								<span class="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-whisper">{t}</span>
							{/each}
						</div>
						<span class="absolute right-3 top-4 font-mono text-xs text-whisper/30 transition-colors group-hover:text-neon-cyan/50">↗</span>
					</a>
				{/each}
			</div>
		</section>

		<!-- Internal Pages (zerospecs tools) -->
		<section>
			<div class="mb-8 flex items-center gap-4">
				<h2 class="font-display text-2xl font-semibold text-chalk">Explore</h2>
				<div class="h-px flex-1 bg-gradient-to-r from-elevated to-transparent"></div>
				<span class="font-mono text-xs text-whisper">zerospecs internals</span>
			</div>

			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each internalPages as page}
					<a
						href={page.url}
						class="group flex items-center gap-4 rounded-lg border border-elevated/50 bg-abyss/30 px-4 py-3 transition-all duration-200 hover:border-whisper/20 hover:bg-abyss/60"
					>
						<span class="font-mono text-sm font-semibold text-neon-cyan transition-colors group-hover:text-neon-magenta">
							{page.name}
						</span>
						<span class="text-xs text-whisper/60">{page.description}</span>
					</a>
				{/each}
			</div>
		</section>

		<!-- Footer -->
		<footer class="mt-24 border-t border-elevated/50 pt-8">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p class="font-mono text-xs text-whisper">
					built on vibes, not requirements
				</p>
				<a
					href="/alt"
					class="font-mono text-xs text-whisper/20 transition-colors hover:text-neon-purple"
					title="the roads not taken"
				>
					what if?
				</a>
				<p class="font-mono text-xs text-whisper/50">
					this project is ephemeral by design. if it breaks, it was never meant to be.
				</p>
			</div>
		</footer>
	</main>
</div>
