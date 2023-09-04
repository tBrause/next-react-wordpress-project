// Modules
import { gql, request } from 'graphql-request';
import { Metadata } from 'next';
import Link from 'next/link';

// Types
import { PagePostTeaserGql } from '@/types/page-types';

// Meta
export const metadata: Metadata = {
	title: 'Page',
	description: 'Die neuesten Meldungen',
};

// ENV
const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

// Export
export default async function GqlPagePage() {
	// Query for GraphQl
	const query = gql`
		query {
			pages {
				nodes {
					id
					date
					title
					slug
					content
				}
			}
		}
	`;

	// Response from GraphQl
	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		pages: {
			nodes: PagePostTeaserGql[];
		};
	};

	return (
		<>
			<h1>Page</h1>
			{/* Für jeden Eintrag in nodes eine BlogTeaser-Komponente
			{response.pages.nodes.map((post) => (
				// <PageMain key={post.slug} {...post} />
				console.log();
				
			))} */}

			{/* {response.page.nodes.map((page) => (
				<PageMain key={page.id} {title} />
			))} */}
		</>
	);
}
