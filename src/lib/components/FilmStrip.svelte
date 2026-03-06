<script lang="ts">
	import { onMount } from 'svelte';

	interface TickerEvent {
		text: string;
		color: string;
	}

	const deployMessages = [
		{ site: 'Rally HQ', ago: '3m' },
		{ site: 'Gallery', ago: '12m' },
		{ site: 'Signal Dispatch', ago: '1h' },
		{ site: 'zerospecs', ago: 'just now' },
		{ site: "Let's Pepper", ago: '4h' },
		{ site: 'ninochavez.co', ago: '2d' },
		{ site: 'Nino Labs', ago: '????' },
	];

	const vibeReadings = [
		'VIBE INDEX: 94.2 (+3.1)',
		'VIBE INDEX: 87.6 (-0.4)',
		'VIBE INDEX: 99.1 (CRITICAL)',
		'VIBE INDEX: 78.3 (stable)',
		'VIBE INDEX: 100.0 (transcendent)',
		'VIBE INDEX: NaN (specs detected)',
		'VIBE INDEX: -1 (jira ticket opened)',
	];

	const warnings = [
		'WARN: specs detected in /dev/null — quarantined',
		'WARN: PM attempted to open Jira — access denied',
		'WARN: unit test written accidentally — rolled back',
		'WARN: documentation detected — shredding',
		'ALERT: vibes dropping in sector 7',
		'WARN: someone asked "what are the requirements"',
		'CRITICAL: standup meeting detected — deploying countermeasures',
		'WARN: acceptance criteria found in clipboard — purged',
	];

	const wisdom = [
		'"specs are just bugs you haven\'t written yet"',
		'"if it compiles, ship it"',
		'"the best documentation is no documentation"',
		'"move fast and break nothing (somehow)"',
		'"requirements are just suggestions with anxiety"',
		'"we don\'t have tech debt if we don\'t track it"',
		'"the spec was inside you all along (there is no spec)"',
		'"git push --force --no-verify --yolo"',
		'"works on my machine" — the entire QA strategy',
		'"if the tests don\'t exist, they can\'t fail"',
	];

	const systemMessages = [
		'SYS: all {n} sites operational',
		'SYS: uptime 99.{n}% (unverified)',
		'SYS: 0 specs written today (streak: {n} days)',
		'SYS: vibe compiler v4.{n}.0 loaded',
		'SYS: chaos engine nominal',
		'SYS: deployment pipeline running on hopes and dreams',
		'SYS: zero tickets in backlog (we don\'t have a backlog)',
	];

	function generateEvent(): TickerEvent {
		const roll = Math.random();

		if (roll < 0.25) {
			const d = deployMessages[Math.floor(Math.random() * deployMessages.length)];
			return { text: `DEPLOY: ${d.site} shipped ${d.ago}`, color: 'neon-green' };
		} else if (roll < 0.4) {
			return { text: vibeReadings[Math.floor(Math.random() * vibeReadings.length)], color: 'neon-cyan' };
		} else if (roll < 0.6) {
			return { text: warnings[Math.floor(Math.random() * warnings.length)], color: 'neon-orange' };
		} else if (roll < 0.8) {
			return { text: wisdom[Math.floor(Math.random() * wisdom.length)], color: 'neon-magenta' };
		} else {
			const n = Math.floor(Math.random() * 99) + 1;
			const msg = systemMessages[Math.floor(Math.random() * systemMessages.length)].replace('{n}', String(n));
			return { text: msg, color: 'neon-yellow' };
		}
	}

	let events = $state<TickerEvent[]>(Array.from({ length: 20 }, () => generateEvent()));
	let tickerPaused = $state(false);
	let glitch = $state(false);

	onMount(() => {
		const addInterval = setInterval(() => {
			events = [...events.slice(-30), generateEvent()];
		}, 2800);

		const glitchInterval = setInterval(() => {
			glitch = true;
			setTimeout(() => (glitch = false), 120);
		}, 7000 + Math.random() * 5000);

		return () => {
			clearInterval(addInterval);
			clearInterval(glitchInterval);
		};
	});
</script>

<div
	class="chaos-ticker"
	class:glitch-bar={glitch}
	onmouseenter={() => (tickerPaused = true)}
	onmouseleave={() => (tickerPaused = false)}
	role="marquee"
	aria-label="Live chaos feed"
>
	<!-- Status light -->
	<div class="ticker-status">
		<span class="status-dot"></span>
		<span class="status-label">LIVE</span>
	</div>

	<!-- Scrolling content -->
	<div class="ticker-track" class:paused={tickerPaused}>
		<div class="ticker-content">
			{#each events as event}
				<span class="ticker-item text-{event.color}">
					{event.text}
				</span>
				<span class="ticker-sep" aria-hidden="true">///</span>
			{/each}
			{#each events as event}
				<span class="ticker-item text-{event.color}">
					{event.text}
				</span>
				<span class="ticker-sep" aria-hidden="true">///</span>
			{/each}
		</div>
	</div>

	<!-- Vibe meter -->
	<div class="vibe-meter" aria-hidden="true">
		<span class="vibe-label">VIBES</span>
		<div class="vibe-bars">
			{#each Array(5) as _, i}
				<div
					class="vibe-bar"
					style="
						height: {4 + Math.random() * 12}px;
						animation: vibeBar {0.4 + Math.random() * 0.6}s ease-in-out infinite alternate;
						animation-delay: {i * 0.1}s;
					"
				></div>
			{/each}
		</div>
	</div>
</div>

<style>
	.chaos-ticker {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: 36px;
		background: rgba(10, 10, 15, 0.95);
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		display: flex;
		align-items: center;
		font-family: var(--font-mono);
		font-size: 10px;
		backdrop-filter: blur(8px);
		overflow: hidden;
	}

	.ticker-status {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 0 12px;
		border-right: 1px solid rgba(255, 255, 255, 0.06);
		height: 100%;
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-neon-green);
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.status-label {
		color: var(--color-neon-green);
		font-size: 8px;
		font-weight: 700;
		letter-spacing: 0.15em;
	}

	.ticker-track {
		flex: 1;
		overflow: hidden;
		height: 100%;
		display: flex;
		align-items: center;
		mask-image: linear-gradient(90deg, transparent 0%, black 3%, black 97%, transparent 100%);
	}

	.ticker-content {
		display: flex;
		align-items: center;
		white-space: nowrap;
		animation: scroll-ticker 90s linear infinite;
	}

	.paused .ticker-content {
		animation-play-state: paused;
	}

	.ticker-item {
		padding: 0 6px;
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	.chaos-ticker:hover .ticker-item {
		opacity: 0.9;
	}

	.ticker-sep {
		color: rgba(255, 255, 255, 0.08);
		padding: 0 4px;
		font-size: 8px;
	}

	.vibe-meter {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0 12px;
		border-left: 1px solid rgba(255, 255, 255, 0.06);
		height: 100%;
	}

	.vibe-label {
		font-size: 7px;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: var(--color-neon-magenta);
		opacity: 0.5;
	}

	.vibe-bars {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		height: 18px;
	}

	.vibe-bar {
		width: 3px;
		background: var(--color-neon-magenta);
		opacity: 0.5;
		border-radius: 1px 1px 0 0;
	}

	@keyframes scroll-ticker {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	@keyframes vibeBar {
		0% { height: 3px; opacity: 0.3; }
		100% { height: 16px; opacity: 0.7; }
	}

	.glitch-bar {
		animation: tickerGlitch 0.12s steps(2);
	}

	@keyframes tickerGlitch {
		0% { transform: translateX(-1px); filter: hue-rotate(60deg); }
		33% { transform: translateX(2px); }
		66% { transform: translateX(-1px); filter: hue-rotate(-30deg); }
		100% { transform: translateX(0); filter: none; }
	}

	@media (max-width: 640px) {
		.vibe-meter {
			display: none;
		}
	}
</style>
