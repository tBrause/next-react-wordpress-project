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
	date: string;
	modified: string;
	content: string;
}[];

type PageData = {
	title: string;
	slug: string;
	date: string;
	modified: string;
	content: string;
}[];

// Meta
export const metadata: Metadata = {
	title: 'Seite',
	description: 'Eine Seite',
};

// ENV
const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

// Export
export default async function GqlPagePage({ params: { slug } }: Props) {
	console.log(slug);

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
			nodes: PageDataContent[];
		};
	};

	// Data
	const { page } = response;
	// console.log(page);

	const { title, date, id, databaseId, content } = page;
	console.log(title);

	return (
		<>
			<h1>{title}</h1>
			{/* <em>{date}</em>*/}
			<div dangerouslySetInnerHTML={{ __html: content }} />
			{/* {getContent(content)} */}
		</>
	);
}

// Get Items for li
function getContent(page: []): string {
	// Zeige mir die Daten
	// console.log(data);

	// hole den content
	const content: string = page;
	console.log(content);
	return content;
}
