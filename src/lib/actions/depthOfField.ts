import { setFocus, getReducedMotion } from '$lib/stores/vibeFlow.svelte';

interface DepthOfFieldOptions {
	name: string;
	group?: string;
}

// Track all observed elements per group
const groups = new Map<string, Set<HTMLElement>>();
const nameMap = new Map<HTMLElement, string>();

function getViewportCenter() {
	return window.innerHeight / 2;
}

function distanceFromCenter(el: HTMLElement): number {
	const rect = el.getBoundingClientRect();
	const elCenter = rect.top + rect.height / 2;
	return Math.abs(elCenter - getViewportCenter());
}

function updateGroup(group: string) {
	const elements = groups.get(group);
	if (!elements || elements.size === 0) return;

	const reduced = getReducedMotion();
	let closest: HTMLElement | null = null;
	let minDist = Infinity;

	// Find the element closest to viewport center
	for (const el of elements) {
		const rect = el.getBoundingClientRect();
		// Only consider visible elements
		if (rect.bottom < 0 || rect.top > window.innerHeight) continue;

		const dist = distanceFromCenter(el);
		if (dist < minDist) {
			minDist = dist;
			closest = el;
		}
	}

	const threshold = window.innerHeight * 0.4;

	for (const el of elements) {
		const rect = el.getBoundingClientRect();
		const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

		if (!isVisible) {
			el.style.filter = '';
			el.style.transform = '';
			el.style.opacity = '';
			el.style.zIndex = '';
			continue;
		}

		if (el === closest && minDist < threshold) {
			if (reduced) {
				el.style.filter = '';
				el.style.transform = '';
				el.style.opacity = '1';
				el.style.outline = '1px solid color-mix(in srgb, var(--color-neon-cyan) 30%, transparent)';
			} else {
				el.style.filter = 'blur(0px)';
				el.style.transform = 'scale(1.02)';
				el.style.opacity = '1';
			}
			el.style.zIndex = '10';
			el.style.position = 'relative';
			setFocus(nameMap.get(el) || null, 0);
		} else {
			const dist = distanceFromCenter(el);
			const normalizedDist = Math.min(dist / (window.innerHeight * 0.6), 1);
			const blur = normalizedDist * 3.5;
			const dimming = 1 - normalizedDist * 0.25;

			if (reduced) {
				el.style.filter = '';
				el.style.transform = '';
				el.style.opacity = String(dimming);
				el.style.outline = '';
			} else {
				el.style.filter = `blur(${blur.toFixed(1)}px)`;
				el.style.transform = 'scale(1)';
				el.style.opacity = String(dimming);
			}
			el.style.zIndex = '';
			el.style.position = '';
		}
	}
}

let scrollTicking = false;

function onScroll() {
	if (scrollTicking) return;
	scrollTicking = true;
	requestAnimationFrame(() => {
		for (const group of groups.keys()) {
			updateGroup(group);
		}
		scrollTicking = false;
	});
}

let listenerAttached = false;

function ensureListener() {
	if (listenerAttached) return;
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	listenerAttached = true;
}

export function depthOfField(node: HTMLElement, options: DepthOfFieldOptions) {
	const group = options.group || 'default';
	nameMap.set(node, options.name);

	if (!groups.has(group)) {
		groups.set(group, new Set());
	}
	groups.get(group)!.add(node);

	// Smooth transitions
	node.style.transition = 'filter 0.4s ease, transform 0.3s ease, opacity 0.4s ease';
	node.style.willChange = 'filter, transform, opacity';

	ensureListener();

	// Initial calculation
	requestAnimationFrame(() => updateGroup(group));

	return {
		destroy() {
			const set = groups.get(group);
			if (set) {
				set.delete(node);
				if (set.size === 0) groups.delete(group);
			}
			nameMap.delete(node);

			// Clean up styles
			node.style.filter = '';
			node.style.transform = '';
			node.style.opacity = '';
			node.style.zIndex = '';
			node.style.position = '';
			node.style.transition = '';
			node.style.willChange = '';
			node.style.outline = '';
		}
	};
}
