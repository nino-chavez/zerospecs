export interface Project {
	name: string;
	description: string;
	status: 'live' | 'cooking' | 'rip';
	color: string;
	url: string;
	tech: string[];
	internal?: boolean;
}

export const externalProjects: Project[] = [
	{
		name: 'Rally HQ',
		description: 'Real-time volleyball tournament management. Zero-latency scoring, live brackets, Stripe payments. Mobile-first scorekeeper.',
		status: 'live',
		color: 'neon-cyan',
		url: 'https://rallyhq.app',
		tech: ['SvelteKit', 'Supabase', 'Stripe', 'Web Push']
	},
	{
		name: 'Gallery',
		description: '~20k photos with AI-powered semantic search, dynamic views, and a Cloudflare Worker for album ZIPs. Photography portfolio on steroids.',
		status: 'live',
		color: 'neon-magenta',
		url: 'https://photography.ninochavez.co',
		tech: ['SvelteKit', 'Supabase', 'AI SDK', 'Cloudflare Workers']
	},
	{
		name: 'Signal Dispatch',
		description: 'Technical blog with AI-generated editorial illustrations. Each post gets its own visual identity from a custom style system.',
		status: 'live',
		color: 'neon-yellow',
		url: 'https://blog.ninochavez.co',
		tech: ['Astro', 'React', 'MDX', 'OpenAI']
	},
	{
		name: "Let's Pepper",
		description: 'Grass volleyball tournament series platform. Real-time standings, waivers, tournament details. Player-first design.',
		status: 'live',
		color: 'neon-green',
		url: 'https://letspepper.com',
		tech: ['Next.js', 'Supabase', 'Framer Motion']
	},
	{
		name: 'ninochavez.co',
		description: 'Personal portfolio with Answer Engine Optimization. Structured JSON-LD APIs, Schema.org markup, Cal.com booking integration.',
		status: 'live',
		color: 'neon-orange',
		url: 'https://ninochavez.co',
		tech: ['SvelteKit', 'Tailwind', 'Cal.com API']
	},
	{
		name: 'Signal X Studio',
		description: 'Creative technology studio. Software, media brands, and event series. Pure vanilla HTML/CSS — no framework needed.',
		status: 'live',
		color: 'neon-purple',
		url: 'https://signalx.studio',
		tech: ['HTML', 'CSS', 'JavaScript']
	},
	{
		name: 'AI Analyst Academy',
		description: 'Educational platform exploring AI and analytics integration. Markdown-based content pipeline with smart processing.',
		status: 'live',
		color: 'neon-cyan',
		url: 'https://ai-analyst-academy.vercel.app',
		tech: ['SvelteKit', 'Supabase', 'gray-matter']
	},
	{
		name: 'Flickday Media',
		description: 'Grassroots sports media. Raw, fast tournament coverage and action sports photography editorial.',
		status: 'live',
		color: 'neon-yellow',
		url: 'https://flickdaymedia.com',
		tech: ['HTML', 'CSS']
	},
	{
		name: 'Nino Labs',
		description: 'Experimental monorepo. Code to Cognition, CIQ, agentic commerce. The workshop where ideas go to mutate.',
		status: 'cooking',
		color: 'neon-green',
		url: 'https://labs.ninochavez.co',
		tech: ['Turborepo', 'Next.js', 'SvelteKit']
	}
];

export const internalPages: Project[] = [
	{
		name: '/status',
		description: 'Live health checks across all deployed projects. Is everything still standing?',
		status: 'live',
		color: 'neon-green',
		url: '/status',
		tech: ['fetch', 'hope'],
		internal: true
	},
	{
		name: '/wall',
		description: 'AI-generated art gallery. What the machine sees when you say "no specs."',
		status: 'live',
		color: 'neon-magenta',
		url: '/wall',
		tech: ['image-gen', 'chaos'],
		internal: true
	},
	{
		name: '/roast',
		description: 'Paste a URL. Get roasted for overspeccing. Or underspeccing. Or existing.',
		status: 'live',
		color: 'neon-orange',
		url: '/roast',
		tech: ['AI', 'cruelty'],
		internal: true
	},
	{
		name: '/ship',
		description: 'Public build log. Every vibe-coded experiment, timestamped and exposed.',
		status: 'live',
		color: 'neon-cyan',
		url: '/ship',
		tech: ['git log', 'honesty'],
		internal: true
	},
	{
		name: '/reads',
		description: 'Curated posts about vibe coding, AI tools, and building fast from Signal Dispatch.',
		status: 'live',
		color: 'neon-yellow',
		url: '/reads',
		tech: ['RSS', 'taste'],
		internal: true
	},
	{
		name: '/stack',
		description: 'Interactive map of every framework, service, and tool across all projects.',
		status: 'live',
		color: 'neon-purple',
		url: '/stack',
		tech: ['data viz', 'flexing'],
		internal: true
	}
];

export const allProjects = [...externalProjects, ...internalPages];

export const sites = [
	{ name: 'Rally HQ', url: 'https://rallyhq.app' },
	{ name: 'Gallery', url: 'https://photography.ninochavez.co' },
	{ name: 'Signal Dispatch', url: 'https://blog.ninochavez.co' },
	{ name: "Let's Pepper", url: 'https://letspepper.com' },
	{ name: 'ninochavez.co', url: 'https://ninochavez.co' },
	{ name: 'Signal X Studio', url: 'https://signalx.studio' },
	{ name: 'Flickday Media', url: 'https://flickdaymedia.com' },
	{ name: 'Nino Labs', url: 'https://labs.ninochavez.co' },
	{ name: 'zerospecs', url: 'https://zerospecs.app' }
];

export const stackData = {
	frameworks: [
		{ name: 'SvelteKit', count: 5, projects: ['Rally HQ', 'Gallery', 'ninochavez.co', 'AI Analyst Academy', 'Nino Labs (CIQ)'] },
		{ name: 'Next.js', count: 2, projects: ["Let's Pepper", 'Nino Labs (Landing, C2C)'] },
		{ name: 'Astro', count: 1, projects: ['Signal Dispatch'] },
		{ name: 'Vanilla HTML', count: 2, projects: ['Signal X Studio', 'Flickday Media'] }
	],
	languages: [
		{ name: 'TypeScript', count: 8 },
		{ name: 'JavaScript', count: 2 },
		{ name: 'MDX', count: 1 },
		{ name: 'CSS', count: 9 }
	],
	styling: [
		{ name: 'Tailwind CSS v4', count: 4 },
		{ name: 'Tailwind CSS v3', count: 3 },
		{ name: 'Custom CSS', count: 2 }
	],
	infrastructure: [
		{ name: 'Vercel', count: 8 },
		{ name: 'Supabase', count: 5 },
		{ name: 'Cloudflare', count: 2 },
		{ name: 'Stripe', count: 1 },
		{ name: 'Sentry', count: 1 },
		{ name: 'PostHog', count: 1 }
	],
	ai: [
		{ name: 'OpenAI / OpenRouter', count: 3 },
		{ name: 'Google AI (Gemini)', count: 2 },
		{ name: 'Anthropic (Claude)', count: 1 },
		{ name: 'Vercel AI SDK', count: 2 }
	],
	totals: {
		projects: 10,
		frameworks: 4,
		deployments: 9,
		databases: 5
	}
};

export interface StackConnection {
	from: string;
	to: string;
	projects: string[];
}

export const stackConnections: StackConnection[] = [
	{ from: 'SvelteKit', to: 'Supabase', projects: ['Rally HQ', 'Gallery', 'AI Analyst Academy'] },
	{ from: 'SvelteKit', to: 'Tailwind CSS v4', projects: ['Rally HQ', 'Gallery', 'ninochavez.co'] },
	{ from: 'SvelteKit', to: 'Vercel', projects: ['Rally HQ', 'Gallery', 'ninochavez.co', 'AI Analyst Academy'] },
	{ from: 'SvelteKit', to: 'Stripe', projects: ['Rally HQ'] },
	{ from: 'Next.js', to: 'Supabase', projects: ["Let's Pepper"] },
	{ from: 'Next.js', to: 'Vercel', projects: ["Let's Pepper", 'Nino Labs'] },
	{ from: 'Astro', to: 'Vercel', projects: ['Signal Dispatch'] },
	{ from: 'Astro', to: 'OpenAI / OpenRouter', projects: ['Signal Dispatch'] },
	{ from: 'Supabase', to: 'Google AI (Gemini)', projects: ['Gallery'] },
	{ from: 'Supabase', to: 'Vercel AI SDK', projects: ['Gallery', 'AI Analyst Academy'] },
	{ from: 'Supabase', to: 'Cloudflare', projects: ['Gallery'] },
	{ from: 'Vercel', to: 'Cloudflare', projects: ['Gallery', 'ninochavez.co'] },
	{ from: 'Stripe', to: 'Supabase', projects: ['Rally HQ'] },
	{ from: 'OpenAI / OpenRouter', to: 'Vercel AI SDK', projects: ['Signal Dispatch'] },
	{ from: 'Anthropic (Claude)', to: 'Vercel AI SDK', projects: ['Nino Labs'] },
	{ from: 'Tailwind CSS v3', to: 'Next.js', projects: ["Let's Pepper"] },
	{ from: 'Tailwind CSS v3', to: 'Vercel', projects: ["Let's Pepper", 'Nino Labs'] },
];
