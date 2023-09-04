// Modules
import { gql, request } from 'graphql-request';
import { Metadata } from 'next';
import Link from 'next/link';

// Types
import { PagePostTeaserGql } from '@/types/page-types';

import { PagePostFullGql } from '@/types/page-types';

type Props = {
	params: {
		slug: string;
	};
};

// Meta
export const metadata: Metadata = {
	title: 'Page',
	description: 'Die neuesten Meldungen',
};

// ENV
const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

// Export
export default async function GqlPagePage({ params: { slug } }: Props) {
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
		<div>
			<h1>Page</h1>
			{/* Für jeden Eintrag in nodes eine BlogTeaser-Komponente */}

			{response.pages.nodes.map((post) => (
				<PageTeaser key={post.slug} {...post} />
			))}
		</div>
	);
}

function PageTeaser({
	title,
	date,
	excerpt,
	slug,
	content,
}: PagePostTeaserGql) {
	return (
		<article>
			<h2>{title}</h2>
			<time dateTime={date.substring(0, 10)}>
				{new Date(date).toLocaleDateString('de')}
			</time>
			<Link href={`/gql-page/${slug}`}>{title}</Link>
			{content}
			{/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
		</article>
	);
}
