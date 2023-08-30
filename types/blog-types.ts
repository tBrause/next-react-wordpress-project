// TYPES for WP-Blog-Entries
type BlogPostBaseGql = {
	id: number;
	title: string;
	date: string;
};

export type BlogPostTeaserGql = BlogPostBaseGql & {
	excerpt: string;
	slug: string;
};

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
