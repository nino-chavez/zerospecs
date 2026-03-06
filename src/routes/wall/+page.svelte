<script lang="ts">
	import { onMount } from 'svelte';

	const pieces = [
		{
			title: 'Genesis',
			prompt: 'What AI sees when you say "build something with no specs"',
			date: '2026-03-05',
			src: '/og.webp',
			aspect: 'landscape'
		},
		{
			title: 'The Void Responds',
			prompt: 'An empty terminal cursor in a dark room, waiting for instructions that will never come. The cursor pulses with neon light. Cyberpunk aesthetic.',
			date: '2026-03-05',
			color: 'from-neon-cyan to-neon-magenta',
			placeholder: true
		},
		{
			title: 'Spec-free Architecture',
			prompt: 'A building designed by AI with zero blueprints — impossible geometry, floating staircases, rooms that loop. Neon wireframe on black.',
			date: '2026-03-05',
			color: 'from-neon-yellow to-neon-orange',
			placeholder: true
		},
		{
			title: 'Vibe Check Passed',
			prompt: 'A QA engineer staring at a screen showing all green checkmarks, looking confused. The code has no tests but somehow works. Digital painting.',
			date: '2026-03-05',
			color: 'from-neon-green to-neon-cyan',
			placeholder: true
		},
		{
			title: 'The Junk Drawer',
			prompt: 'A perfectly organized junk drawer viewed from above. Every item is labeled with programming terms. Hyper-detailed, clinical.',
			date: '2026-03-05',
			color: 'from-neon-purple to-neon-magenta',
			placeholder: true
		},
		{
			title: 'Ship It',
			prompt: 'A rocket launching from a laptop keyboard. The rocket trail is made of code snippets and TODO comments. Retro sci-fi poster style.',
			date: '2026-03-05',
			color: 'from-neon-orange to-neon-yellow',
			placeholder: true
		}
	];

	let mounted = $state(false);
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<title>/wall — zerospecs</title>
	<meta name="description" content="AI-generated art gallery. What the machine sees when you say 'no specs.'" />
</svelte:head>

<div class="min-h-screen bg-void">
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">&larr; back</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-magenta">/</span>wall
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			ai-generated art. no brief, no mood board, no creative director. just prompts and prayers.
		</p>
	</header>

	<main class="mx-auto max-w-6xl px-6 py-12">
		<div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
			{#each pieces as piece, i}
				<div
					class="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-elevated/30 bg-abyss/50 transition-all duration-500 hover:border-whisper/20 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
					style="transition-delay: {i * 100}ms;"
				>
					{#if piece.placeholder}
						<!-- Gradient placeholder for future generations -->
						<div
							class="flex aspect-square items-center justify-center bg-gradient-to-br {piece.color} opacity-20"
						>
							<span class="font-mono text-xs text-chalk/60">awaiting generation</span>
						</div>
					{:else if piece.src}
						<img
							src={piece.src}
							alt={piece.title}
							class="w-full"
							loading="lazy"
						/>
					{/if}
					<div class="p-4">
						<h3 class="font-display text-sm font-semibold text-chalk">{piece.title}</h3>
						<p class="mt-1 font-mono text-[10px] leading-relaxed text-whisper/60 italic">
							"{piece.prompt}"
						</p>
						<p class="mt-2 font-mono text-[10px] text-whisper/30">{piece.date}</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<p class="font-mono text-xs text-whisper/40">
				generated with <span class="text-whisper/60">@nino-tools/image-gen</span> · openrouter · zero art direction
			</p>
			<p class="mt-1 font-mono text-[10px] text-whisper/20">
				new pieces added when the vibes are right
			</p>
		</div>
	</main>
</div>
