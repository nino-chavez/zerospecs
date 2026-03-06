<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { getReducedMotion } from '$lib/stores/vibeFlow.svelte';

	let phase = $state<'idle' | 'closing' | 'hold' | 'opening'>('idle');
	let originX = $state(50);
	let originY = $state(50);
	let clipPercent = $state(110);
	let animFrame: number;

	const CLOSE_MS = 280;
	const HOLD_MS = 120;
	const OPEN_MS = 320;

	function animateTo(from: number, to: number, duration: number): Promise<void> {
		return new Promise((resolve) => {
			const start = performance.now();
			function tick(now: number) {
				const elapsed = now - start;
				const t = Math.min(elapsed / duration, 1);
				// ease-in-out cubic
				const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
				clipPercent = from + (to - from) * ease;
				if (t < 1) {
					animFrame = requestAnimationFrame(tick);
				} else {
					clipPercent = to;
					resolve();
				}
			}
			animFrame = requestAnimationFrame(tick);
		});
	}

	beforeNavigate(({ cancel, to }) => {
		if (!to || phase !== 'idle') return;

		// Capture click origin from the last pointer event
		const lastClick = (globalThis as any).__apertureClickOrigin;
		if (lastClick) {
			originX = (lastClick.x / window.innerWidth) * 100;
			originY = (lastClick.y / window.innerHeight) * 100;
		} else {
			originX = 50;
			originY = 50;
		}

		if (getReducedMotion()) {
			// Instant cut for reduced motion
			phase = 'hold';
			clipPercent = 0;
			return;
		}

		phase = 'closing';
		runClose();
	});

	async function runClose() {
		await animateTo(110, 0, CLOSE_MS);
		phase = 'hold';
		await new Promise((r) => setTimeout(r, HOLD_MS));
	}

	afterNavigate(() => {
		if (phase === 'idle') return;

		if (getReducedMotion()) {
			phase = 'idle';
			clipPercent = 110;
			return;
		}

		phase = 'opening';
		runOpen();
	});

	async function runOpen() {
		// Small delay to let the new page render
		await new Promise((r) => setTimeout(r, 30));
		await animateTo(0, 110, OPEN_MS);
		phase = 'idle';
	}

	// Track click position globally for aperture origin
	if (typeof window !== 'undefined') {
		window.addEventListener(
			'click',
			(e) => {
				(globalThis as any).__apertureClickOrigin = { x: e.clientX, y: e.clientY };
			},
			{ capture: true }
		);
	}

	// Build the hexagonal iris clip-path (6 blades)
	function irisPath(pct: number): string {
		if (pct >= 110) return 'none';
		if (pct <= 0) return 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)';

		const r = (pct / 100) * 120; // overshoot slightly so it fully covers
		const cx = originX;
		const cy = originY;
		const points: string[] = [];

		for (let i = 0; i < 6; i++) {
			const angle = (Math.PI / 3) * i - Math.PI / 2;
			// Add slight rotation based on progress for mechanical iris feel
			const rotOffset = ((100 - pct) / 100) * 0.15;
			const px = cx + r * Math.cos(angle + rotOffset);
			const py = cy + r * Math.sin(angle + rotOffset) * (window.innerWidth / window.innerHeight);
			points.push(`${px}% ${py}%`);
		}

		return `polygon(${points.join(', ')})`;
	}

	let clipPath = $derived(irisPath(clipPercent));
	let visible = $derived(phase !== 'idle');
</script>

{#if visible}
	<div
		class="fixed inset-0 z-[9999] bg-void"
		style="clip-path: {clipPath};"
		aria-hidden="true"
	>
		{#if phase === 'hold'}
			<div class="flex h-full w-full items-center justify-center">
				<span class="font-mono text-xs text-neon-cyan/40 animate-pulse">▊</span>
			</div>
		{/if}
	</div>
{/if}
