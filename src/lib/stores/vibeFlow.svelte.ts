interface VibeFlowState {
	currentZone: 'void' | 'shipped' | 'explore' | 'focus';
	progress: number;
	focusTarget: string | null;
	blurIntensity: number;
	filmPosition: number;
}

let state = $state<VibeFlowState>({
	currentZone: 'void',
	progress: 0,
	focusTarget: null,
	blurIntensity: 0,
	filmPosition: -1
});

let reducedMotion = $state(false);

if (typeof window !== 'undefined') {
	const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
	reducedMotion = mq.matches;
	mq.addEventListener('change', (e) => {
		reducedMotion = e.matches;
	});
}

export function getVibeFlow() {
	return state;
}

export function getReducedMotion() {
	return reducedMotion;
}

export function setZone(zone: VibeFlowState['currentZone']) {
	state.currentZone = zone;
}

export function setProgress(value: number) {
	state.progress = Math.max(0, Math.min(1, value));
}

export function setFocus(target: string | null, blur: number = 0) {
	state.focusTarget = target;
	state.blurIntensity = blur;
}

export function setFilmPosition(index: number) {
	state.filmPosition = index;
}
