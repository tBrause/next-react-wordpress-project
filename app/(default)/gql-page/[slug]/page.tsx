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

// Meta
export const metadata: Metadata = {
	title: 'Seite',
	description: 'Eine Seite',
};

// ENV
const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

// Export
export default async function GqlPagePage({ params: { slug } }: Props) {
	// Query for GraphQl
	const query = gql`
		{
			page(id: "84", idType: DATABASE_ID) {
				title
				slug
				databaseId
				date
				id
				title
				guid
				modified
				parentId
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
	type PageDataContent = {
		title: string;
		date: string;
		id: string;
		databaseId: number;
		content: string;
	}[];

	type PageData = {
		page: [];
	}[];

	const page: [] = response.page;

	const { title, date, id, databaseId, content } = page;

	console.log(databaseId);

	return (
		<>
			<h1>{title}</h1>
			<em>{date}</em>
			<p>{content}</p>
			{/* <PageMain key={data.id} {...data} /> */}
		</>
	);
}
