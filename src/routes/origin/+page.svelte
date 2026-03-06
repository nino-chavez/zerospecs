<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let currentSection = $state(0);

	const timeline = [
		{
			who: 'nino',
			platform: 'Gemini',
			message: 'brainstorm domain names for .app or .io for throwaway projects i build temporarily. maybe lean into temp or trash'
		},
		{
			who: 'gemini',
			platform: null,
			message: 'Finding a good domain for "throwaway" projects is a balancing act. You want something that signals "this is an experiment" while still looking cool enough to share.',
			suggestions: [
				{ name: 'Drafty.io', vibe: 'Light, airy, and non-permanent' },
				{ name: 'ScrapHeap.io', vibe: 'Embrace the trash aesthetic' },
				{ name: 'Vapor.io', vibe: 'Here one second, gone the next' },
				{ name: 'Petri.app', vibe: 'Like a petri dish' }
			]
		},
		{
			who: 'nino',
			platform: null,
			message: 'what about synonyms with \'start\' or \'launch\'?'
		},
		{
			who: 'gemini',
			platform: null,
			message: 'Using "start" and "launch" synonyms creates a more "upward-trajectory" vibe.',
			suggestions: [
				{ name: 'Ignit.io', vibe: 'A clean play on "Ignite"' },
				{ name: 'Catalyst.app', vibe: 'The action series' },
				{ name: 'ZeroToOne.io', vibe: 'The ultimate "just starting" developer flex' },
				{ name: 'DraftMode.app', vibe: 'My personal favorite for throwaway work' }
			]
		},
		{
			who: 'nino',
			platform: null,
			message: 'i ended up going with zerospecs.app as a fun way to say i vibe code quick projects'
		},
		{
			who: 'gemini',
			platform: null,
			message: 'That is an absolute top-tier choice. zerospecs.app hits that perfect sweet spot of developer humor. It\'s a double-entendre: it says "I\'m starting from zero," but it also cheekily admits, "I didn\'t write a single requirement doc for this." It\'s the "vibe coding" equivalent of "measure once, cut... wherever the saw lands."'
		},
		{
			who: 'nino',
			platform: 'Claude Code',
			message: 'consider this exchange and result in now owning zerospecs.app'
		},
		{
			who: 'claude',
			platform: null,
			message: 'zerospecs.app — zero specs, all vibes. The project directory is currently empty. Want me to scaffold something?'
		},
		{
			who: 'nino',
			platform: null,
			message: 'landing page and project hub. what sites should we use as inspo? zero punctuation? xkcd? homestar runner? daring fireball?'
		},
		{
			who: 'claude',
			platform: null,
			message: 'Blend XKCD\'s minimalism + neal.fun\'s project hub model + Homestar Runner\'s playfulness. Keep the page dead simple but reward curiosity with easter eggs and personality.'
		},
		{
			who: 'nino',
			platform: null,
			message: 'what about the other spectrum. no specs so ai goes wild and produces wild results?'
		},
		{
			who: 'claude',
			platform: null,
			message: 'Oh — so flip it entirely. Not "minimalist dev humor" but "AI off the leash with no guardrails." The site itself becomes proof of concept. Maximalist, chaotic, over-designed. lingscars.com energy. windows93.net fever dream.'
		},
		{
			who: 'nino',
			platform: null,
			message: 'the latter. llm is still trained'
		},
		{
			who: 'claude',
			platform: null,
			message: 'Right — controlled chaos. The AI went wild but it\'s still good. It looks like nobody was driving but somehow the car parked itself perfectly. A well-organized junk drawer.'
		},
		{
			who: 'nino',
			platform: null,
			message: 'easter egg that explains this whole exchange as its own page. go.'
		},
		{
			who: 'system',
			platform: null,
			message: 'And so this page was born. You found it. Whether by Konami code, by digging through the source, or by guessing the URL — congratulations. You\'re standing in the origin story of a domain that exists because two AIs and one human had a vibe.'
		}
	];

	onMount(() => {
		mounted = true;
		const interval = setInterval(() => {
			if (currentSection < timeline.length - 1) {
				currentSection++;
			} else {
				clearInterval(interval);
			}
		}, 800);
		return () => clearInterval(interval);
	});

	function getAvatar(who: string): string {
		switch (who) {
			case 'nino': return 'N';
			case 'gemini': return 'G';
			case 'claude': return 'C';
			case 'system': return '∅';
			default: return '?';
		}
	}

	function getColor(who: string): string {
		switch (who) {
			case 'nino': return 'neon-cyan';
			case 'gemini': return 'neon-yellow';
			case 'claude': return 'neon-magenta';
			case 'system': return 'neon-green';
			default: return 'ghost';
		}
	}

	function getName(who: string): string {
		switch (who) {
			case 'nino': return 'nino';
			case 'gemini': return 'Gemini';
			case 'claude': return 'Claude';
			case 'system': return 'zerospecs';
			default: return 'unknown';
		}
	}
</script>

<svelte:head>
	<title>origin — zerospecs</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen bg-void">
	<!-- Header -->
	<header class="border-b border-elevated/30 px-6 py-6">
		<a
			href="/"
			class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan"
		>
			&larr; back to the void
		</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-green">/</span>origin
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			you found the easter egg. here's how this domain came to exist.
		</p>
	</header>

	<!-- Timeline -->
	<main class="mx-auto max-w-3xl px-6 py-12">
		<div class="relative">
			<!-- Vertical line -->
			<div class="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-elevated via-whisper/20 to-transparent"></div>

			{#each timeline as entry, i}
				{#if i <= currentSection}
					<div
						class="relative mb-8 pl-14 {mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
						style="transition: all 0.5s ease; transition-delay: {i * 0.05}s;"
					>
						<!-- Avatar dot -->
						<div
							class="absolute left-2 top-1 flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs font-bold
								{entry.who === 'nino' ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan' : ''}
								{entry.who === 'gemini' ? 'border-neon-yellow bg-neon-yellow/10 text-neon-yellow' : ''}
								{entry.who === 'claude' ? 'border-neon-magenta bg-neon-magenta/10 text-neon-magenta' : ''}
								{entry.who === 'system' ? 'border-neon-green bg-neon-green/10 text-neon-green' : ''}"
						>
							{getAvatar(entry.who)}
						</div>

						<!-- Content -->
						<div class="rounded-lg border border-elevated/50 bg-abyss/50 p-4 backdrop-blur-sm">
							<div class="mb-2 flex items-center gap-2">
								<span
									class="font-mono text-xs font-semibold
										{entry.who === 'nino' ? 'text-neon-cyan' : ''}
										{entry.who === 'gemini' ? 'text-neon-yellow' : ''}
										{entry.who === 'claude' ? 'text-neon-magenta' : ''}
										{entry.who === 'system' ? 'text-neon-green' : ''}"
								>
									{getName(entry.who)}
								</span>
								{#if entry.platform}
									<span class="font-mono text-[10px] text-whisper/50">
										via {entry.platform}
									</span>
								{/if}
							</div>

							<p class="text-sm leading-relaxed text-ghost">
								{entry.message}
							</p>

							{#if entry.suggestions}
								<div class="mt-3 grid gap-1.5">
									{#each entry.suggestions as s}
										<div class="flex items-center gap-2 rounded bg-surface/50 px-3 py-1.5 font-mono text-xs">
											<span class="text-chalk">{s.name}</span>
											<span class="text-whisper/50">—</span>
											<span class="text-whisper">{s.vibe}</span>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Bottom note -->
		{#if currentSection >= timeline.length - 1}
			<div class="mt-16 border-t border-elevated/30 pt-8 text-center transition-opacity duration-1000">
				<p class="font-mono text-xs text-whisper/40">
					march 2026 · gemini + claude + one human with a credit card
				</p>
				<p class="font-mono mt-1 text-[10px] text-whisper/20">
					konami code works on the landing page, by the way
				</p>
			</div>
		{/if}
	</main>
</div>
