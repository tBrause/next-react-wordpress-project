// TYPES for WP-Blog-Entries
type BlogPostBaseGql = {
	id: number;
	title: string;
	date: string;
};

// Teaser for Overview-Blog-Page
export type BlogPostTeaserGql = BlogPostBaseGql & {
	excerpt: string;
	slug: string;
};

// For Blog-Entrie-Full-View
export type BlogPostFullGql = BlogPostBaseGql & {
	content: string;
	featuredImage?: {
		node: {
			altText: string;
			guid: string;
			mediaDetails: {
				width: number;
				height: number;
			};
		};
	};
};
