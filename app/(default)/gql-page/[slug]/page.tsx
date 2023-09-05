// Modules
import { gql, request } from 'graphql-request';
import { Metadata } from 'next';
import Link from 'next/link';

// Types
// import { PageMainGql } from '@/types/page-types';

type Props = {
	params: {
		slug: string;
	};
};

// Types
type PageDataContent = {
	title: string;
	slug: string;
	date?: string;
	modified?: string;
	content: string;
};

// Meta
export const metadata: Metadata = {
	title: 'Seite',
	description: 'Eine Wordpress-Seite',
};

// ENV
const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

// Export
export default async function GqlPagePage({ params: { slug } }: Props) {
	// Query for GraphQl for Single Page
	const query = gql`
		{
			page(idType: URI, id: "${slug}") {
				title
				slug
				date
				modified
				content
			}
		}
	`;

	// Response from GraphQl
	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		page: {
			nodes: [PageDataContent];
		};
	};

	// Data
	const page: PageDataContent = response.page.nodes[0];
	console.log(page);

	const content: string = page.content;
	const title: string = page.title;

	return (
		<>
			<h1>{title}</h1>
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</>
	);
}
