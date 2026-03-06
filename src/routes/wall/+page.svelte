<script lang="ts">
	import { onMount } from 'svelte';

	interface Piece {
		title: string;
		prompt: string;
		date: string;
		src?: string;
		aspect?: string;
		color?: string;
		seed: number;
	}

	const pieces: Piece[] = [
		{
			title: 'Genesis',
			prompt: 'What AI sees when you say "build something with no specs"',
			date: '2026-03-05',
			src: '/og.webp',
			aspect: 'landscape',
			seed: 0
		},
		{
			title: 'The Void Responds',
			prompt: 'An empty terminal cursor in a dark room, waiting for instructions that will never come. The cursor pulses with neon light. Cyberpunk aesthetic.',
			date: '2026-03-05',
			color: 'neon-cyan',
			seed: 42
		},
		{
			title: 'Spec-free Architecture',
			prompt: 'A building designed by AI with zero blueprints — impossible geometry, floating staircases, rooms that loop. Neon wireframe on black.',
			date: '2026-03-05',
			color: 'neon-yellow',
			seed: 137
		},
		{
			title: 'Vibe Check Passed',
			prompt: 'A QA engineer staring at a screen showing all green checkmarks, looking confused. The code has no tests but somehow works. Digital painting.',
			date: '2026-03-05',
			color: 'neon-green',
			seed: 256
		},
		{
			title: 'The Junk Drawer',
			prompt: 'A perfectly organized junk drawer viewed from above. Every item is labeled with programming terms. Hyper-detailed, clinical.',
			date: '2026-03-05',
			color: 'neon-purple',
			seed: 404
		},
		{
			title: 'Ship It',
			prompt: 'A rocket launching from a laptop keyboard. The rocket trail is made of code snippets and TODO comments. Retro sci-fi poster style.',
			date: '2026-03-05',
			color: 'neon-orange',
			seed: 512
		}
	];

	let mounted = $state(false);
	let hoveredIndex = $state(-1);
	onMount(() => { mounted = true; });

	// Seeded pseudo-random for consistent generative art
	function seededRandom(seed: number) {
		let s = seed;
		return () => {
			s = (s * 16807 + 0) % 2147483647;
			return s / 2147483647;
		};
	}

	// Generate SVG data URI for generative art
	function generateArt(piece: Piece): string {
		const rng = seededRandom(piece.seed);
		const colorMap: Record<string, [string, string, string]> = {
			'neon-cyan': ['#00fff2', '#0088aa', '#004455'],
			'neon-yellow': ['#f0ff00', '#aa8800', '#554400'],
			'neon-green': ['#39ff14', '#22aa0d', '#115507'],
			'neon-purple': ['#bf00ff', '#7700aa', '#440066'],
			'neon-orange': ['#ff6b00', '#aa4500', '#552200'],
			'neon-magenta': ['#ff00e5', '#aa0099', '#550055']
		};
		const [bright, mid, dark] = colorMap[piece.color || 'neon-cyan'] || colorMap['neon-cyan'];

		let shapes = '';

		// Background gradient circles
		for (let j = 0; j < 5; j++) {
			const cx = rng() * 400;
			const cy = rng() * 400;
			const r = 60 + rng() * 140;
			const opacity = 0.08 + rng() * 0.12;
			shapes += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${mid}" opacity="${opacity}"/>`;
		}

		// Grid lines
		const gridCount = 4 + Math.floor(rng() * 6);
		for (let j = 0; j < gridCount; j++) {
			const isHoriz = rng() > 0.5;
			const pos = 40 + rng() * 320;
			const opacity = 0.04 + rng() * 0.06;
			if (isHoriz) {
				shapes += `<line x1="0" y1="${pos}" x2="400" y2="${pos}" stroke="${bright}" stroke-width="0.5" opacity="${opacity}"/>`;
			} else {
				shapes += `<line x1="${pos}" y1="0" x2="${pos}" y2="400" stroke="${bright}" stroke-width="0.5" opacity="${opacity}"/>`;
			}
		}

		// Geometric shapes
		const shapeCount = 6 + Math.floor(rng() * 8);
		for (let j = 0; j < shapeCount; j++) {
			const x = rng() * 400;
			const y = rng() * 400;
			const size = 8 + rng() * 50;
			const opacity = 0.1 + rng() * 0.3;
			const type = Math.floor(rng() * 4);
			const rotation = rng() * 360;
			const color = rng() > 0.6 ? bright : mid;

			if (type === 0) {
				// Circle
				shapes += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="none" stroke="${color}" stroke-width="${0.5 + rng()}" opacity="${opacity}"/>`;
			} else if (type === 1) {
				// Rectangle
				shapes += `<rect x="${x}" y="${y}" width="${size}" height="${size * (0.5 + rng())}" fill="none" stroke="${color}" stroke-width="${0.5 + rng()}" opacity="${opacity}" transform="rotate(${rotation} ${x + size / 2} ${y + size / 2})"/>`;
			} else if (type === 2) {
				// Triangle
				const h = size * 0.866;
				shapes += `<polygon points="${x},${y - h / 2} ${x - size / 2},${y + h / 2} ${x + size / 2},${y + h / 2}" fill="none" stroke="${color}" stroke-width="${0.5 + rng()}" opacity="${opacity}" transform="rotate(${rotation} ${x} ${y})"/>`;
			} else {
				// Dot cluster
				for (let k = 0; k < 5; k++) {
					const dx = x + (rng() - 0.5) * size;
					const dy = y + (rng() - 0.5) * size;
					shapes += `<circle cx="${dx}" cy="${dy}" r="${1 + rng() * 3}" fill="${color}" opacity="${opacity * 0.8}"/>`;
				}
			}
		}

		// Accent bright spots
		for (let j = 0; j < 3; j++) {
			const cx = rng() * 400;
			const cy = rng() * 400;
			const r = 2 + rng() * 6;
			shapes += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${bright}" opacity="${0.4 + rng() * 0.4}"/>`;
			shapes += `<circle cx="${cx}" cy="${cy}" r="${r * 3}" fill="${bright}" opacity="0.05"/>`;
		}

		return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#0a0a0f"/>${shapes}</svg>`)}`;
	}
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
		<div class="columns-1 gap-5 sm:columns-2 lg:columns-3">
			{#each pieces as piece, i}
				<div
					class="group mb-5 break-inside-avoid overflow-hidden rounded-xl border border-elevated/30 bg-abyss/50 transition-all duration-500 hover:border-whisper/20 hover:shadow-xl {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
					style="transition-delay: {i * 100}ms;"
					onmouseenter={() => (hoveredIndex = i)}
					onmouseleave={() => (hoveredIndex = -1)}
					role="figure"
				>
					{#if piece.src}
						<img
							src={piece.src}
							alt={piece.title}
							class="w-full transition-transform duration-700 group-hover:scale-[1.03]"
							loading="lazy"
						/>
					{:else}
						<div class="relative overflow-hidden">
							<img
								src={generateArt(piece)}
								alt="{piece.title} — generative art"
								class="w-full transition-transform duration-700 group-hover:scale-[1.05]"
								loading="lazy"
							/>
							<!-- Hover glow overlay -->
							<div
								class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
								style="background: radial-gradient(circle at 50% 50%, {'var(--color-' + piece.color + ')'} 0%, transparent 70%); mix-blend-mode: soft-light;"
							></div>
							<!-- Scan line on hover -->
							{#if hoveredIndex === i}
								<div
									class="pointer-events-none absolute inset-x-0 h-px opacity-40"
									style="
										background: {'var(--color-' + piece.color + ')'};
										box-shadow: 0 0 8px {'var(--color-' + piece.color + ')'};
										animation: scanLine 2s linear infinite;
									"
								></div>
							{/if}
						</div>
					{/if}

					<div class="p-4">
						<div class="mb-1 flex items-center justify-between">
							<h3 class="font-display text-sm font-semibold text-chalk transition-colors group-hover:text-{piece.color || 'neon-cyan'}">
								{piece.title}
							</h3>
							{#if !piece.src}
								<span class="font-mono text-[8px] uppercase tracking-widest text-whisper/30">generative</span>
							{/if}
						</div>
						<p class="mt-1 font-mono text-[10px] leading-relaxed text-whisper/60 italic">
							"{piece.prompt}"
						</p>
						<div class="mt-2 flex items-center justify-between">
							<span class="font-mono text-[10px] text-whisper/30">{piece.date}</span>
							{#if !piece.src}
								<span class="font-mono text-[8px] text-whisper/20">seed:{piece.seed}</span>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<p class="font-mono text-xs text-whisper/40">
				generated with <span class="text-whisper/60">procedural SVG</span> · seeded randomness · zero art direction
			</p>
			<p class="mt-1 font-mono text-[10px] text-whisper/20">
				each piece is deterministic — same seed, same art, every time
			</p>
		</div>
	</main>
</div>

<style>
	@keyframes scanLine {
		0% { top: -2px; }
		100% { top: 100%; }
	}
</style>
