<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let visitorCount = $state(0);
	let currentXkcd = $state(0);
	let starRunnerCursor = $state({ x: 0, y: 0 });

	const xkcdAlts = [
		"If you can read this, you're mass-hovering again.",
		"The specs were inside you all along. Just kidding, there were never any specs.",
		"This tooltip is the most documented thing on the entire site.",
	];

	onMount(() => {
		mounted = true;
		visitorCount = Math.floor(Math.random() * 90000) + 10000;
		currentXkcd = Math.floor(Math.random() * xkcdAlts.length);
	});

	function handleStarRunnerMove(e: MouseEvent) {
		const section = (e.currentTarget as HTMLElement);
		const rect = section.getBoundingClientRect();
		starRunnerCursor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
	}
</script>

<svelte:head>
	<title>/alt — the roads not taken</title>
	<meta name="robots" content="noindex" />
	<link
		href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=xkcd+Script&family=Courier+Prime:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen bg-void">
	<!-- Header -->
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">
			&larr; back to the void
		</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-purple">/</span>alt
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			the multiverse of zerospecs. every timeline we didn't pick.
		</p>
	</header>

	<main class="mx-auto max-w-5xl px-6 py-12 space-y-16">

		<!-- ============================================ -->
		<!-- XKCD VERSION -->
		<!-- ============================================ -->
		<section class="rounded-2xl overflow-hidden">
			<div class="bg-white px-8 py-10 text-center" style="font-family: 'Comic Neue', 'Comic Sans MS', cursive;">
				<div class="mb-2 flex justify-center gap-4 text-xs text-gray-500">
					<span>|&lt; prev</span>
					<span>random</span>
					<span>next &gt;|</span>
				</div>

				<h2 class="mb-6 text-xl font-bold text-black">zerospecs</h2>

				<!-- "Comic" panel -->
				<div class="mx-auto max-w-md border-2 border-gray-300 bg-white p-8">
					<div class="space-y-6 text-sm text-gray-800">
						<!-- Stick figures as text art -->
						<div class="flex items-end gap-8 justify-center">
							<div class="text-center">
								<div class="text-2xl">🧑‍💻</div>
								<div class="mt-1 rounded bg-gray-100 px-2 py-1 text-xs">what if we just... didn't write specs?</div>
							</div>
							<div class="text-center">
								<div class="text-2xl">🤖</div>
								<div class="mt-1 rounded bg-gray-100 px-2 py-1 text-xs">I have been trained on every spec ever written. I can forget them all.</div>
							</div>
						</div>
						<div class="text-center">
							<div class="text-2xl">🧑‍💻 🤖</div>
							<div class="mt-2 rounded bg-gray-100 px-2 py-1 text-xs italic">[both staring at a website that somehow works]</div>
						</div>
					</div>
				</div>

				<!-- Alt text hover -->
				<p
					class="mx-auto mt-4 max-w-sm cursor-help text-xs text-gray-400 underline decoration-dotted"
					title={xkcdAlts[currentXkcd]}
				>
					hover for alt text (you know you want to)
				</p>

				<div class="mt-4 text-[10px] text-gray-300">
					this work is licensed under vibes
				</div>
			</div>
			<div class="bg-surface px-6 py-3 font-mono text-xs text-whisper/60 text-center">
				timeline: xkcd — "what if we were minimalist and funny?"
			</div>
		</section>

		<!-- ============================================ -->
		<!-- DARING FIREBALL VERSION -->
		<!-- ============================================ -->
		<section class="rounded-2xl overflow-hidden">
			<div class="px-8 py-10" style="background: #4a525a; font-family: 'Courier Prime', 'Courier New', monospace;">
				<div class="mx-auto max-w-xl">
					<h2 class="mb-6 text-center text-lg font-bold tracking-wide text-white" style="font-family: 'Courier Prime', monospace; letter-spacing: 0.15em;">
						zerospecs
					</h2>
					<div class="h-px bg-gray-500 mb-6"></div>

					<article class="space-y-4 text-sm leading-relaxed" style="color: #c8c8c8;">
						<p class="text-white font-bold">
							★ On the Matter of Not Writing Specifications
						</p>
						<p>
							There's a certain <em>courage</em>, if you can call it that, in opening a blank project
							and telling an AI "just build something." No wireframes. No user stories.
							No acceptance criteria. Just vibes.
						</p>
						<p>
							The resulting website is, against all odds, not terrible. It has a color scheme.
							It has a grid. The typography doesn't make you wince. I'm not sure what to
							make of this. I've spent 20 years arguing that the spec is the most important
							document in any software project, and now a robot has made me question everything
							in about 45 seconds.
						</p>
						<p style="color: #999;">
							<em>Thursday, 5 March 2026</em>
						</p>
					</article>

					<div class="mt-6 h-px bg-gray-500"></div>
					<div class="mt-3 flex justify-between text-[10px]" style="color: #888;">
						<span>Ads via The Deck</span>
						<span>★ Linked List</span>
					</div>
				</div>
			</div>
			<div class="bg-surface px-6 py-3 font-mono text-xs text-whisper/60 text-center">
				timeline: daring fireball — "what if we were one opinionated voice?"
			</div>
		</section>

		<!-- ============================================ -->
		<!-- HOMESTAR RUNNER VERSION -->
		<!-- ============================================ -->
		<section class="rounded-2xl overflow-hidden">
			<div
				class="relative px-8 py-10 overflow-hidden"
				onmousemove={handleStarRunnerMove}
				role="presentation"
				style="background: linear-gradient(135deg, #1a6b3c 0%, #0f4a2a 50%, #1a6b3c 100%); cursor: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><text y=%2216%22 font-size=%2216%22>⭐</text></svg>') 10 10, auto;"
			>
				<!-- Floating stars background -->
				<div class="absolute inset-0 pointer-events-none overflow-hidden">
					{#each Array(12) as _, i}
						<div
							class="absolute text-yellow-300/30 text-lg"
							style="
								left: {(i * 8.3) % 100}%;
								top: {(i * 13.7) % 100}%;
								animation: drift {4 + i * 0.5}s ease-in-out infinite;
								animation-delay: {i * 0.3}s;
							"
						>★</div>
					{/each}
				</div>

				<div class="relative mx-auto max-w-lg text-center">
					<!-- "Flash" navigation buttons -->
					<div class="mb-6 flex flex-wrap justify-center gap-2">
						{#each ['toons', 'games', 'characters', 'downloads', 'store', 'email'] as item}
							<button
								class="rounded-full border-2 border-yellow-400/60 bg-yellow-400/10 px-4 py-1 text-xs font-bold text-yellow-200 transition-all hover:bg-yellow-400 hover:text-green-900 hover:scale-110 active:scale-95"
								style="font-family: 'Comic Neue', 'Comic Sans MS', cursive;"
							>
								{item}
							</button>
						{/each}
					</div>

					<h2
						class="mb-4 text-4xl font-bold text-yellow-300"
						style="font-family: 'Comic Neue', 'Comic Sans MS', cursive; text-shadow: 3px 3px 0 #0a3d1f, -1px -1px 0 #0a3d1f;"
					>
						zero★specs!
					</h2>

					<div class="mx-auto max-w-sm rounded-xl border-4 border-yellow-400/40 bg-green-950/60 p-6 backdrop-blur-sm">
						<p class="text-lg text-yellow-100" style="font-family: 'Comic Neue', cursive;">
							Oh, hello! Welcome to my website!
							I'm <strong class="text-yellow-300">zerospecs</strong> and I don't have any specifications!
						</p>
						<p class="mt-3 text-sm text-green-300/80" style="font-family: 'Comic Neue', cursive;">
							I was gonna write some docs but then I figured... nah.
							The Cheat can probably figure it out.
						</p>
					</div>

					<div class="mt-6 flex justify-center gap-4 text-yellow-400/40 text-[10px]">
						<span>best viewed in Netscape Navigator</span>
						<span>•</span>
						<span>Flash 8 required</span>
					</div>
				</div>
			</div>
			<div class="bg-surface px-6 py-3 font-mono text-xs text-whisper/60 text-center">
				timeline: homestar runner — "what if the web was still a toy?"
			</div>
		</section>

		<!-- ============================================ -->
		<!-- MOTHERFUCKINGWEBSITE VERSION -->
		<!-- ============================================ -->
		<section class="rounded-2xl overflow-hidden">
			<div class="bg-white px-8 py-10" style="font-family: Georgia, 'Times New Roman', serif;">
				<div class="mx-auto max-w-xl">
					<h2 class="mb-6 text-3xl font-bold text-black">
						zerospecs.app
					</h2>

					<div class="space-y-4 text-base leading-relaxed text-gray-800">
						<p>
							This is a website. It has <strong>no specifications</strong>.
						</p>
						<p>
							You know what it also doesn't have? 400KB of JavaScript just to render text on a screen.
							A cookie banner. A newsletter popup. Analytics that track your eye movements.
							A "we value your privacy" modal that's lying.
						</p>
						<p>
							You know what it <em>does</em> have?
						</p>
						<ul class="list-disc pl-6 space-y-1">
							<li><strong>Words.</strong> You're reading them right now.</li>
							<li><strong>Fast load time.</strong> Because it's just HTML.</li>
							<li><strong>No specs.</strong> Obviously.</li>
						</ul>
						<p>
							The AI built this entire site in one conversation. No PRD. No figma. No sprint planning.
							It just... went.
						</p>
						<p class="text-gray-500 text-sm italic">
							"But what about accessibility?" It's semantic HTML. Screen readers love this.
							Your 50MB React app with aria-labels on every div? Not so much.
						</p>
					</div>
				</div>
			</div>
			<div class="bg-surface px-6 py-3 font-mono text-xs text-whisper/60 text-center">
				timeline: motherfuckingwebsite.com — "what if we were brutally honest?"
			</div>
		</section>

		<!-- ============================================ -->
		<!-- GEOCITIES / NEOCITIES VERSION -->
		<!-- ============================================ -->
		<section class="rounded-2xl overflow-hidden">
			<div
				class="relative px-8 py-10 overflow-hidden"
				style="background: #000080; background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22><text y=%2240%22 font-size=%2230%22 opacity=%220.1%22>★</text></svg>'); background-size: 50px 50px;"
			>
				<div class="mx-auto max-w-lg text-center">
					<div class="mb-4">
						<marquee class="text-yellow-300 text-lg font-bold" style="font-family: 'Comic Neue', 'Comic Sans MS', cursive;">
							★★★ Welcome to ZEROSPECS ★★★ Under Construction ★★★ Sign my Guestbook ★★★
						</marquee>
					</div>

					<h2
						class="mb-4 text-3xl font-bold"
						style="font-family: 'Comic Neue', 'Comic Sans MS', cursive; color: #ff00ff; text-shadow: 2px 2px #00ffff;"
					>
						~zerospecs~
					</h2>

					<div class="mx-auto max-w-sm border-4 border-double border-yellow-400 bg-black/40 p-4">
						<p class="text-lg text-lime-400" style="font-family: 'Courier New', monospace;">
							welcom 2 my page!! 🌟
						</p>
						<p class="mt-2 text-sm text-cyan-300" style="font-family: 'Comic Neue', cursive;">
							this is where i put my projects that i coded with AI.
							none of them have specifications becuz specs r boring lol
						</p>
						<hr class="my-3 border-lime-400/50" />
						<p class="text-xs text-yellow-300 animate-pulse">
							🚧 UNDER CONSTRUCTION 🚧
						</p>
					</div>

					<div class="mt-6 flex flex-wrap justify-center gap-3 text-[10px]">
						<span class="rounded bg-lime-500/20 px-2 py-1 text-lime-400" style="font-family: 'Courier New', monospace;">
							visitors: {visitorCount.toLocaleString()}
						</span>
						<span class="rounded bg-cyan-500/20 px-2 py-1 text-cyan-400" style="font-family: 'Courier New', monospace;">
							est. 2026
						</span>
						<span class="rounded bg-pink-500/20 px-2 py-1 text-pink-400" style="font-family: 'Courier New', monospace;">
							made with 💖 and 0 specs
						</span>
					</div>

					<div class="mt-4 flex justify-center gap-4">
						<img alt="Under construction" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><text y='30' font-size='30'>🏗️</text></svg>" width="40" height="40" />
						<img alt="Best viewed in IE" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><text y='30' font-size='30'>🌐</text></svg>" width="40" height="40" />
						<img alt="Guestbook" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><text y='30' font-size='30'>📖</text></svg>" width="40" height="40" />
					</div>
				</div>
			</div>
			<div class="bg-surface px-6 py-3 font-mono text-xs text-whisper/60 text-center">
				timeline: geocities/neocities — "what if it was 1999 forever?"
			</div>
		</section>

		<!-- Bottom -->
		<div class="text-center pt-8 border-t border-elevated/30">
			<p class="font-mono text-sm text-ghost">
				every timeline converges here.
			</p>
			<p class="font-mono mt-2 text-xs text-whisper/40">
				we chose controlled chaos. the multiverse chose everything else.
			</p>
			<a
				href="/"
				class="mt-6 inline-block font-mono text-xs text-neon-cyan/60 transition-colors hover:text-neon-cyan"
			>
				return to the prime timeline &rarr;
			</a>
		</div>
	</main>
</div>
