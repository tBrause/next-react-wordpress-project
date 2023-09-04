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

// Cache
export const revalidate = 600;

const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

export default async function page({ params: { slug } }: Props) {
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

	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		pages: {
			nodes: PagePostTeaserGql[];
		};
	};

	// const post = await getPostData(slug);
	console.log('dsfsdfds');
	console.log(slug);

	return <div>page</div>;
}

// Fct: getPostData
async function getPostData(slug: string) {
	const query = gql`
		{
			post(id: "${slug}", idType: SLUG) {
				title
				date
				excerpt
				slug
				content
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
