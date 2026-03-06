<script lang="ts">
	import { onMount } from 'svelte';

	const collections = [
		{
			name: 'Tournament Days',
			description: 'Grass volleyball in golden hour. Sand, sweat, and spike attempts.',
			count: 847,
			cover: 'https://photography.ninochavez.co',
			color: 'neon-yellow'
		},
		{
			name: 'Street & Urban',
			description: 'Concrete textures, neon signs, and the city between the cracks.',
			count: 312,
			cover: 'https://photography.ninochavez.co',
			color: 'neon-cyan'
		},
		{
			name: 'Action Sports',
			description: 'Frozen motion. The split second between effort and gravity.',
			count: 1243,
			cover: 'https://photography.ninochavez.co',
			color: 'neon-orange'
		},
		{
			name: 'Portraits',
			description: 'People being people. No direction, just presence.',
			count: 428,
			cover: 'https://photography.ninochavez.co',
			color: 'neon-magenta'
		},
		{
			name: 'Events & Nightlife',
			description: 'Low light, high energy. Flash and shadows.',
			count: 956,
			cover: 'https://photography.ninochavez.co',
			color: 'neon-purple'
		},
		{
			name: 'Landscapes',
			description: 'The world when nobody is looking. Or when everybody should be.',
			count: 189,
			cover: 'https://photography.ninochavez.co',
			color: 'neon-green'
		}
	];

	const stats = {
		total: '~20,000',
		albums: '150+',
		years: '5+',
		camera: 'Sony α7 III'
	};

	let mounted = $state(false);
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<title>Shots — zerospecs</title>
	<meta name="description" content="Photography by Nino Chavez. ~20k photos, zero shot lists." />
</svelte:head>

<div class="min-h-screen bg-void">
	<!-- Header -->
	<header class="border-b border-elevated/30 px-6 py-8">
		<div class="mx-auto max-w-5xl">
			<div class="mb-4 flex items-center gap-3">
				<a href="https://zerospecs.app" class="font-mono text-xs text-whisper/40 transition-colors hover:text-neon-cyan">
					zerospecs
				</a>
				<span class="text-whisper/20">/</span>
				<span class="font-mono text-xs text-neon-magenta">shots</span>
			</div>

			<h1 class="font-display text-4xl font-bold text-chalk md:text-5xl">
				Shots
			</h1>
			<p class="mt-3 max-w-lg text-sm leading-relaxed text-ghost">
				{stats.total} photos. Zero shot lists. No mood boards. Just show up with a camera
				and see what happens. The photography equivalent of vibe coding.
			</p>

			<a
				href="https://photography.ninochavez.co"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-6 inline-block rounded-lg bg-neon-magenta/10 border border-neon-magenta/30 px-4 py-2 font-mono text-sm text-neon-magenta transition-all hover:bg-neon-magenta/20"
			>
				browse full gallery ↗
			</a>
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-6 py-12">
		<!-- Stats -->
		<div class="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
			{#each [
				{ label: 'photos', value: stats.total, color: 'neon-cyan' },
				{ label: 'albums', value: stats.albums, color: 'neon-magenta' },
				{ label: 'years shooting', value: stats.years, color: 'neon-yellow' },
				{ label: 'camera', value: stats.camera, color: 'neon-green' }
			] as stat}
				<div class="rounded-lg border border-elevated bg-abyss/50 p-4 text-center">
					<div class="font-display text-xl font-bold text-{stat.color}">{stat.value}</div>
					<div class="mt-1 font-mono text-[10px] uppercase tracking-widest text-whisper">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Collections -->
		<section>
			<div class="mb-6 flex items-center gap-4">
				<h2 class="font-display text-xl font-semibold text-chalk">Collections</h2>
				<div class="h-px flex-1 bg-gradient-to-r from-elevated to-transparent"></div>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each collections as collection, i}
					<a
						href="https://photography.ninochavez.co"
						target="_blank"
						rel="noopener noreferrer"
						class="group relative overflow-hidden rounded-xl border border-elevated bg-abyss/50 transition-all duration-300 hover:border-whisper/30 hover:shadow-lg {mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}"
						style="transition-delay: {i * 80}ms;"
					>
						<!-- Gradient placeholder for collection cover -->
						<div class="aspect-[4/3] bg-gradient-to-br from-surface to-elevated relative overflow-hidden">
							<div
								class="absolute inset-0 opacity-30 bg-gradient-to-br {collection.color === 'neon-yellow' ? 'from-neon-yellow/40 to-neon-orange/40' : collection.color === 'neon-cyan' ? 'from-neon-cyan/40 to-neon-green/40' : collection.color === 'neon-orange' ? 'from-neon-orange/40 to-neon-magenta/40' : collection.color === 'neon-magenta' ? 'from-neon-magenta/40 to-neon-purple/40' : collection.color === 'neon-purple' ? 'from-neon-purple/40 to-neon-cyan/40' : 'from-neon-green/40 to-neon-yellow/40'}"
							></div>
							<div class="absolute inset-0 flex items-center justify-center">
								<span class="font-mono text-xs text-chalk/30 group-hover:text-chalk/50 transition-colors">
									{collection.count} photos
								</span>
							</div>
						</div>

						<div class="p-4">
							<h3 class="font-display text-sm font-semibold text-chalk transition-colors group-hover:text-neon-magenta">
								{collection.name}
							</h3>
							<p class="mt-1 text-xs leading-relaxed text-ghost">
								{collection.description}
							</p>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- Philosophy -->
		<section class="mt-16 rounded-xl border border-elevated/30 bg-abyss/30 p-8">
			<h2 class="font-display mb-4 text-lg font-semibold text-chalk">The approach</h2>
			<div class="space-y-3 text-sm leading-relaxed text-ghost">
				<p>
					No shot lists. No predetermined compositions. Show up, read the light, and react.
					The best photos happen when you stop planning and start seeing.
				</p>
				<p>
					The gallery runs on Supabase with AI-powered semantic search — you can search
					"golden hour volleyball spike" and find exactly that across 20,000 photos. Albums get
					Cloudflare Worker-powered ZIP downloads for clients.
				</p>
				<p class="font-mono text-xs text-whisper/60">
					Built with SvelteKit · Supabase · Google AI · TanStack Query · Cloudflare Workers
				</p>
			</div>
		</section>

		<!-- Footer -->
		<footer class="mt-16 border-t border-elevated/30 pt-6 text-center">
			<p class="font-mono text-[10px] text-whisper/30">
				a zerospecs production · zero shot lists, surprisingly good photos
			</p>
		</footer>
	</main>
</div>
