<script lang="ts">
	import { onMount } from 'svelte';
	import { stackData, stackConnections } from '$lib/data/projects';

	// --- Node layout ---
	interface CanvasNode {
		name: string;
		x: number;
		y: number;
		ring: 'center' | 'frameworks' | 'infrastructure' | 'ai' | 'styling' | 'languages';
		color: string;
		count: number;
	}

	const RING_COLORS: Record<string, string> = {
		center: 'var(--color-chalk)',
		frameworks: 'var(--color-neon-cyan)',
		infrastructure: 'var(--color-neon-green)',
		ai: 'var(--color-neon-purple)',
		styling: 'var(--color-neon-magenta)',
		languages: 'var(--color-neon-yellow)'
	};

	const CANVAS_W = 1200;
	const CANVAS_H = 900;
	const CX = CANVAS_W / 2;
	const CY = CANVAS_H / 2;

	function polar(cx: number, cy: number, radius: number, angle: number, jitter: number = 0): { x: number; y: number } {
		const j = (Math.random() - 0.5) * jitter;
		return {
			x: cx + (radius + j) * Math.cos(angle),
			y: cy + (radius + j) * Math.sin(angle)
		};
	}

	function buildNodes(): CanvasNode[] {
		const nodes: CanvasNode[] = [];

		// Center node
		nodes.push({ name: `${stackData.totals.projects} projects`, x: CX, y: CY, ring: 'center', color: RING_COLORS.center, count: stackData.totals.projects });

		// Frameworks ring (radius ~180)
		stackData.frameworks.forEach((fw, i) => {
			const angle = (Math.PI * 2 / stackData.frameworks.length) * i - Math.PI / 2;
			const pos = polar(CX, CY, 180, angle, 15);
			nodes.push({ name: fw.name, x: pos.x, y: pos.y, ring: 'frameworks', color: RING_COLORS.frameworks, count: fw.count });
		});

		// Infrastructure ring (radius ~320)
		stackData.infrastructure.forEach((svc, i) => {
			const angle = (Math.PI * 2 / stackData.infrastructure.length) * i - Math.PI / 3;
			const pos = polar(CX, CY, 310, angle, 20);
			nodes.push({ name: svc.name, x: pos.x, y: pos.y, ring: 'infrastructure', color: RING_COLORS.infrastructure, count: svc.count });
		});

		// AI ring (radius ~260, offset angle)
		stackData.ai.forEach((a, i) => {
			const angle = (Math.PI * 2 / stackData.ai.length) * i + Math.PI / 6;
			const pos = polar(CX, CY, 260, angle, 15);
			nodes.push({ name: a.name, x: pos.x, y: pos.y, ring: 'ai', color: RING_COLORS.ai, count: a.count });
		});

		// Styling (clustered upper-left area)
		stackData.styling.forEach((s, i) => {
			const angle = -Math.PI * 0.75 + (Math.PI * 0.2) * i;
			const pos = polar(CX, CY, 220, angle, 10);
			nodes.push({ name: s.name, x: pos.x, y: pos.y, ring: 'styling', color: RING_COLORS.styling, count: s.count });
		});

		// Languages (scattered between rings)
		stackData.languages.forEach((l, i) => {
			const angle = Math.PI * 0.6 + (Math.PI * 0.15) * i;
			const pos = polar(CX, CY, 370, angle, 25);
			nodes.push({ name: l.name, x: pos.x, y: pos.y, ring: 'languages', color: RING_COLORS.languages, count: l.count });
		});

		return nodes;
	}

	// Stable nodes (computed once)
	const nodes = buildNodes();

	// Build a position lookup for connections
	function getNodePos(name: string): { x: number; y: number } | null {
		const n = nodes.find((n) => n.name === name);
		return n ? { x: n.x, y: n.y } : null;
	}

	// --- Interaction state ---
	let mounted = $state(false);
	let hoveredNode = $state<string | null>(null);
	let selectedNode = $state<string | null>(null);
	let panX = $state(0);
	let panY = $state(0);
	let zoom = $state(1);
	let isPanning = $state(false);
	let panStartX = $state(0);
	let panStartY = $state(0);
	let panOriginX = $state(0);
	let panOriginY = $state(0);
	let containerEl = $state<HTMLElement | null>(null);

	onMount(() => {
		mounted = true;
		// Center the canvas in the viewport
		if (containerEl) {
			const rect = containerEl.getBoundingClientRect();
			panX = (rect.width - CANVAS_W) / 2;
			panY = (rect.height - CANVAS_H) / 2 + 20;
		}
	});

	function onWheel(e: WheelEvent) {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -0.08 : 0.08;
		zoom = Math.max(0.4, Math.min(2, zoom + delta));
	}

	function onPointerDown(e: PointerEvent) {
		// Only pan on background clicks
		if ((e.target as HTMLElement).closest('.canvas-node')) return;
		isPanning = true;
		panStartX = e.clientX;
		panStartY = e.clientY;
		panOriginX = panX;
		panOriginY = panY;
	}

	function onPointerMove(e: PointerEvent) {
		if (!isPanning) return;
		panX = panOriginX + (e.clientX - panStartX);
		panY = panOriginY + (e.clientY - panStartY);
	}

	function onPointerUp() {
		isPanning = false;
	}

	function handleNodeClick(name: string) {
		if (selectedNode === name) {
			selectedNode = null;
		} else {
			selectedNode = name;
		}
	}

	// Which connections involve the hovered/selected node
	function isConnectionActive(conn: { from: string; to: string }): boolean {
		const target = hoveredNode || selectedNode;
		if (!target) return false;
		return conn.from === target || conn.to === target;
	}

	function isNodeRelated(name: string): boolean {
		const target = hoveredNode || selectedNode;
		if (!target) return true;
		if (name === target) return true;
		return stackConnections.some(
			(c) => (c.from === target && c.to === name) || (c.to === target && c.from === name)
		);
	}

	// Node detail info for selected node
	let selectedInfo = $derived.by(() => {
		if (!selectedNode) return null;
		const conns = stackConnections.filter(
			(c) => c.from === selectedNode || c.to === selectedNode
		);
		const relatedNodes = new Set<string>();
		const projects = new Set<string>();
		for (const c of conns) {
			relatedNodes.add(c.from === selectedNode ? c.to : c.from);
			c.projects.forEach((p) => projects.add(p));
		}
		const node = nodes.find((n) => n.name === selectedNode);
		return {
			name: selectedNode,
			ring: node?.ring || '',
			count: node?.count || 0,
			color: node?.color || '',
			connections: relatedNodes.size,
			projects: [...projects]
		};
	});
</script>

<svelte:head>
	<title>/stack — zerospecs</title>
	<meta name="description" content="Spatial map of every framework, service, and tool across all projects." />
</svelte:head>

<div class="min-h-screen bg-void">
	<header class="border-b border-elevated/30 px-6 py-6">
		<a href="/" class="font-mono text-xs text-whisper transition-colors hover:text-neon-cyan">&larr; back</a>
		<h1 class="font-display mt-4 text-3xl font-bold text-chalk md:text-4xl">
			<span class="text-neon-purple">/</span>stack
		</h1>
		<p class="font-mono mt-2 text-sm text-whisper">
			spatial map of {stackData.totals.projects} projects. pan, zoom, explore.
		</p>
		<div class="mt-3 flex flex-wrap gap-4 font-mono text-[10px]">
			{#each [
				{ label: 'frameworks', color: 'text-neon-cyan' },
				{ label: 'infrastructure', color: 'text-neon-green' },
				{ label: 'AI/ML', color: 'text-neon-purple' },
				{ label: 'styling', color: 'text-neon-magenta' },
				{ label: 'languages', color: 'text-neon-yellow' }
			] as legend}
				<span class="flex items-center gap-1.5">
					<span class="inline-block h-2 w-2 rounded-full {legend.color}" style="background: currentColor;"></span>
					<span class="text-whisper">{legend.label}</span>
				</span>
			{/each}
		</div>
	</header>

	<!-- Canvas container -->
	<div
		class="relative overflow-hidden"
		style="height: calc(100vh - 160px); cursor: {isPanning ? 'grabbing' : 'grab'};"
		bind:this={containerEl}
		onwheel={onWheel}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		role="application"
		aria-label="Interactive technology stack map"
	>
		<!-- Zoom controls -->
		<div class="absolute top-4 right-4 z-20 flex flex-col gap-1">
			<button
				class="flex h-8 w-8 items-center justify-center rounded border border-elevated bg-abyss/80 font-mono text-sm text-whisper backdrop-blur-sm transition-colors hover:text-chalk"
				onclick={() => (zoom = Math.min(2, zoom + 0.15))}
				aria-label="Zoom in"
			>+</button>
			<button
				class="flex h-8 w-8 items-center justify-center rounded border border-elevated bg-abyss/80 font-mono text-sm text-whisper backdrop-blur-sm transition-colors hover:text-chalk"
				onclick={() => (zoom = Math.max(0.4, zoom - 0.15))}
				aria-label="Zoom out"
			>-</button>
			<button
				class="flex h-8 w-8 items-center justify-center rounded border border-elevated bg-abyss/80 font-mono text-[10px] text-whisper backdrop-blur-sm transition-colors hover:text-chalk"
				onclick={() => { zoom = 1; if (containerEl) { const r = containerEl.getBoundingClientRect(); panX = (r.width - CANVAS_W) / 2; panY = (r.height - CANVAS_H) / 2 + 20; } }}
				aria-label="Reset view"
			>R</button>
		</div>

		<!-- Canvas world -->
		<div
			class="absolute origin-top-left"
			style="
				transform: translate({panX}px, {panY}px) scale({zoom});
				width: {CANVAS_W}px;
				height: {CANVAS_H}px;
				will-change: transform;
				transition: {isPanning ? 'none' : 'transform 0.1s ease-out'};
			"
		>
			<!-- Connection lines (SVG) -->
			<svg
				class="absolute inset-0 pointer-events-none"
				width={CANVAS_W}
				height={CANVAS_H}
				aria-hidden="true"
			>
				<!-- Ring guides -->
				{#each [180, 260, 310, 370] as radius}
					<circle
						cx={CX}
						cy={CY}
						r={radius}
						fill="none"
						stroke="rgba(255,255,255,0.02)"
						stroke-width="1"
						stroke-dasharray="4 8"
					/>
				{/each}

				<!-- Connection lines -->
				{#each stackConnections as conn}
					{@const fromPos = getNodePos(conn.from)}
					{@const toPos = getNodePos(conn.to)}
					{#if fromPos && toPos}
						<line
							x1={fromPos.x}
							y1={fromPos.y}
							x2={toPos.x}
							y2={toPos.y}
							stroke={isConnectionActive(conn) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)'}
							stroke-width={isConnectionActive(conn) ? 1.5 : 0.5}
							class="transition-all duration-300"
						/>
					{/if}
				{/each}
			</svg>

			<!-- Nodes -->
			{#each nodes as node}
				{@const isCenter = node.ring === 'center'}
				{@const size = isCenter ? 80 : 60 + Math.min(node.count, 6) * 3}
				{@const related = isNodeRelated(node.name)}
				{@const isHovered = hoveredNode === node.name}
				{@const isSelected = selectedNode === node.name}
				<button
					class="canvas-node absolute flex flex-col items-center justify-center rounded-full border text-center transition-all duration-300"
					class:opacity-20={!related && (hoveredNode || selectedNode)}
					style="
						left: {node.x - size / 2}px;
						top: {node.y - size / 2}px;
						width: {size}px;
						height: {size}px;
						border-color: {isHovered || isSelected ? node.color : 'color-mix(in srgb, ' + node.color + ' 30%, transparent)'};
						background: {isHovered || isSelected ? 'color-mix(in srgb, ' + node.color + ' 12%, transparent)' : 'rgba(10,10,15,0.7)'};
						box-shadow: {isHovered || isSelected ? '0 0 20px color-mix(in srgb, ' + node.color + ' 20%, transparent)' : 'none'};
						{mounted ? '' : 'opacity: 0; transform: scale(0.5);'}
					"
					onclick={() => handleNodeClick(node.name)}
					onmouseenter={() => (hoveredNode = node.name)}
					onmouseleave={() => (hoveredNode = null)}
					aria-label="{node.name}: used in {node.count} projects"
				>
					<span
						class="font-mono leading-tight"
						style="font-size: {isCenter ? '10px' : '8px'}; color: {node.color};"
					>
						{node.name}
					</span>
					{#if !isCenter}
						<span
							class="mt-0.5 font-mono"
							style="font-size: 7px; color: rgba(255,255,255,0.3);"
						>
							{node.count}x
						</span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Selected node detail panel -->
		{#if selectedInfo}
			<div
				class="absolute bottom-4 left-4 z-20 max-w-xs rounded-xl border border-elevated bg-abyss/90 p-4 backdrop-blur-md"
				style="border-color: color-mix(in srgb, {selectedInfo.color} 30%, var(--color-elevated));"
			>
				<div class="mb-2 flex items-center justify-between">
					<span class="font-mono text-sm font-semibold" style="color: {selectedInfo.color};">
						{selectedInfo.name}
					</span>
					<button
						class="font-mono text-xs text-whisper/40 hover:text-chalk"
						onclick={() => (selectedNode = null)}
					>x</button>
				</div>
				<div class="mb-2 flex gap-3 font-mono text-[10px] text-whisper">
					<span>{selectedInfo.ring}</span>
					<span>{selectedInfo.count}x used</span>
					<span>{selectedInfo.connections} connections</span>
				</div>
				{#if selectedInfo.projects.length > 0}
					<div class="flex flex-wrap gap-1">
						{#each selectedInfo.projects as project}
							<span class="rounded bg-surface/60 px-2 py-0.5 font-mono text-[10px] text-ghost">
								{project}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Zoom indicator -->
		<div class="absolute bottom-4 right-4 font-mono text-[10px] text-whisper/30">
			{Math.round(zoom * 100)}%
		</div>
	</div>

	<div class="border-t border-elevated/30 px-6 py-4 text-center">
		<p class="font-mono text-[10px] text-whisper/20">
			no architect diagram was harmed in the making of this visualization
		</p>
	</div>
</div>
