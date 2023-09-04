// Components
import request, { gql } from 'graphql-request';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Types
import { PagePostFullGql } from '@/types/page-types';

type Props = {
	params: {
		slug: string;
	};
};

/* Erneuert den Cache für diese Route alle 600 Sekunden,
als Alternative zur revalidate-Option in fetch. */
export const revalidate = 600;

const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

export default async function page({ params: { slug } }: Props) {
	const post = await getPostData(slug);
	console.log(slug);

	const url = '/gql-page';

	return (
		<div>
			<header>
				<h1>{post.title}</h1>
				<time dateTime={post.date.substring(0, 10)}>
					{new Date(post.date).toLocaleDateString('de')}
				</time>
			</header>
			{/* Bild, falls Bilddaten vorhanden, mit der Image-Komponente darstellen */}
		</div>
	);
}

async function getPostData(slug: string) {
	const query = gql`
		{
			post(id: "${slug}", idType: SLUG) {
				content
				date
				title
			}
		}
	`;

	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		post: PagePostFullGql;
	};

	const { post } = response;

	if (!post) {
		notFound();
	}

	return post;
}

/* Metadaten dynamisch generieren */

export async function generateMetadata({ params: { slug } }: Props) {
	const post = await getPostData(slug);

	return {
		title: post.title,
	};
}

export async function generateStaticParams() {
	const query = gql`
		query {
			pages {
				nodes {
					slug
				}
			}
		}
	`;

	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		pages: {
			nodes: {
				slug: string;
			}[];
		};
	};

	return response.pages.nodes.map((post) => ({
		slug: post.slug,
	}));
}
