// Components
import request, { gql } from 'graphql-request';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Types
import { BlogPostFullGql } from '@/types/blog-types';

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
	const url = '/gql-blog';

	return (
		<div>
			<header>
				<h1>{post.title}</h1>
				<time dateTime={post.date.substring(0, 10)}>
					{new Date(post.date).toLocaleDateString('de')}
				</time>
			</header>
			{/* Bild, falls Bilddaten vorhanden, mit der Image-Komponente darstellen */}
			{post.featuredImage && (
				<Image
					className="full-width-image"
					alt={post.featuredImage.node.altText}
					src={post.featuredImage.node.guid}
					width={post.featuredImage.node.mediaDetails.width}
					height={post.featuredImage.node.mediaDetails.height}
					sizes="(max-width: 56rem) 90vw, 54rem"
				/>
			)}
			<div dangerouslySetInnerHTML={{ __html: post.content }} />
			<Link href={url}>ddd</Link>
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
				featuredImage {
					node {
						altText
						guid
						mediaDetails {
							height
							width
						}
					}
				}
			}
		}
	`;

	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		post: BlogPostFullGql;
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
			posts {
				nodes {
					slug
				}
			}
		}
	`;

	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		posts: {
			nodes: {
				slug: string;
			}[];
		};
	};

	return response.posts.nodes.map((post) => ({
		slug: post.slug,
	}));
}
