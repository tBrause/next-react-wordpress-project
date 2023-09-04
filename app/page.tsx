// Modules
import { Suspense } from 'react';

// Components
import LoadingSpinner from '@/components/LoadingSpinner';
import SlowComponent from '@/components/SlowComponent';
import { gql, request } from 'graphql-request';

// Types
import { MenuPostMenusGql } from '@/types/menu-types';

type Props = {
	params: {
		slug: string;
	};
};

const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

// Export
export default async function menu({ params: { slug } }: Props) {
	const post = await getPostData(slug);
	const url = '/gql-blog';
	console.log(slug);

	return <h1>Headline with Font Lato</h1>;
}

//
async function getPostData(slug: string) {
	const query = gql`
		{
			post(id: "${slug}", idType: SLUG) {
				id
			}
		}
	`;
	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		post: MenuPostMenusGql;
	};

	const { post } = response;

	// if (!post) {
	// 	notFound();
	// }

	return post;
}
