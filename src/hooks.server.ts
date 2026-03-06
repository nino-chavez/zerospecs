import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const host = event.request.headers.get('host') || '';

	if (host.startsWith('rally.')) {
		// Rewrite rally.zerospecs.app/* → /rally/*
		const url = new URL(event.request.url);
		if (!url.pathname.startsWith('/rally')) {
			url.pathname = '/rally' + url.pathname;
			return new Response(null, {
				status: 302,
				headers: { location: url.pathname + url.search }
			});
		}
	}

	if (host.startsWith('shots.')) {
		// Rewrite shots.zerospecs.app/* → /shots/*
		const url = new URL(event.request.url);
		if (!url.pathname.startsWith('/shots')) {
			url.pathname = '/shots' + url.pathname;
			return new Response(null, {
				status: 302,
				headers: { location: url.pathname + url.search }
			});
		}
	}

	return resolve(event);
};
