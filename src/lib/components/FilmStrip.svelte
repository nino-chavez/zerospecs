<script lang="ts">
	import { externalProjects } from '$lib/data/projects';
	import { getVibeFlow, setFilmPosition } from '$lib/stores/vibeFlow.svelte';

	let stripEl = $state<HTMLElement | null>(null);
	let isDragging = $state(false);
	let dragStartX = $state(0);
	let scrollStartX = $state(0);
	let hoverIndex = $state(-1);

	const flow = getVibeFlow();

	function getColor(color: string): string {
		const map: Record<string, string> = {
			'neon-cyan': 'var(--color-neon-cyan)',
			'neon-magenta': 'var(--color-neon-magenta)',
			'neon-yellow': 'var(--color-neon-yellow)',
			'neon-green': 'var(--color-neon-green)',
			'neon-orange': 'var(--color-neon-orange)',
			'neon-purple': 'var(--color-neon-purple)'
		};
		return map[color] || 'var(--color-neon-cyan)';
	}

	function handleFrameClick(index: number, url: string) {
		setFilmPosition(index);
		if (url.startsWith('http')) {
			window.open(url, '_blank', 'noopener,noreferrer');
		}
	}

	function onPointerDown(e: PointerEvent) {
		if (!stripEl) return;
		isDragging = true;
		dragStartX = e.clientX;
		scrollStartX = stripEl.scrollLeft;
		stripEl.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging || !stripEl) return;
		const dx = e.clientX - dragStartX;
		stripEl.scrollLeft = scrollStartX - dx;
	}

	function onPointerUp() {
		isDragging = false;
	}

	function getStatusChar(status: string): string {
		return status === 'live' ? '\u25CF' : '\u25CB';
	}
</script>

<nav
	class="film-strip"
	aria-label="Project film strip navigation"
>
	<!-- Top sprocket holes -->
	<div class="sprockets sprockets-top" aria-hidden="true"></div>

	<!-- Film frames -->
	<div
		class="film-frames"
		bind:this={stripEl}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		
	>
		{#each externalProjects as project, i}
			<button
				class="film-frame"
				class:active={flow.filmPosition === i}
				class:hovered={hoverIndex === i}
				style="--frame-color: {getColor(project.color)};"
				onclick={() => handleFrameClick(i, project.url)}
				onmouseenter={() => (hoverIndex = i)}
				onmouseleave={() => (hoverIndex = -1)}
				aria-label="{project.name} - {project.status}"
			>
				<span class="frame-status" class:live={project.status === 'live'}>
					{getStatusChar(project.status)}
				</span>
				<span class="frame-name">{project.name}</span>
				<span class="frame-number">{String(i + 1).padStart(2, '0')}</span>
			</button>
		{/each}
	</div>

	<!-- Bottom sprocket holes -->
	<div class="sprockets sprockets-bottom" aria-hidden="true"></div>

	<!-- Film grain overlay -->
	<div class="film-grain" aria-hidden="true"></div>
</nav>

<style>
	.film-strip {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: 72px;
		background: #0d0d12;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		display: flex;
		flex-direction: column;
		user-select: none;
	}

	.sprockets {
		height: 8px;
		flex-shrink: 0;
		background: repeating-linear-gradient(
			90deg,
			transparent 0px,
			transparent 12px,
			rgba(255, 255, 255, 0.04) 12px,
			rgba(255, 255, 255, 0.04) 16px,
			transparent 16px,
			transparent 60px
		);
	}

	.sprockets-top {
		border-bottom: 1px solid rgba(255, 255, 255, 0.03);
	}

	.sprockets-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.03);
	}

	.film-frames {
		flex: 1;
		display: flex;
		gap: 2px;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		padding: 0 16px;
		align-items: stretch;
		cursor: grab;
	}

	.film-frames:active {
		cursor: grabbing;
	}

	.film-frames::-webkit-scrollbar {
		display: none;
	}

	.film-frame {
		flex-shrink: 0;
		width: 100px;
		scroll-snap-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		padding: 4px 8px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.04);
		border-radius: 2px;
		cursor: pointer;
		transition: all 0.2s ease;
		position: relative;
	}

	.film-frame:hover,
	.film-frame.hovered {
		background: rgba(255, 255, 255, 0.05);
		border-color: color-mix(in srgb, var(--frame-color) 30%, transparent);
	}

	.film-frame.active {
		background: color-mix(in srgb, var(--frame-color) 8%, transparent);
		border-color: color-mix(in srgb, var(--frame-color) 40%, transparent);
		box-shadow: 0 0 12px color-mix(in srgb, var(--frame-color) 15%, transparent);
	}

	.frame-status {
		font-size: 6px;
		color: var(--color-whisper);
		transition: color 0.2s;
	}

	.frame-status.live {
		color: var(--color-neon-green);
	}

	.frame-name {
		font-family: var(--font-mono);
		font-size: 9px;
		font-weight: 600;
		color: var(--color-ghost);
		text-align: center;
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
		transition: color 0.2s;
	}

	.film-frame:hover .frame-name,
	.film-frame.active .frame-name {
		color: var(--frame-color);
	}

	.frame-number {
		font-family: var(--font-mono);
		font-size: 7px;
		color: rgba(255, 255, 255, 0.1);
		letter-spacing: 0.1em;
	}

	.film-grain {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
		background-size: 128px;
	}

	@media (max-width: 640px) {
		.film-frame {
			width: 80px;
		}
	}
</style>
