import { BlogPostTeaserGql } from '@/types/blog-types';
import { gql, request } from 'graphql-request';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Die neuesten Meldungen',
};

const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

export default async function GqlBlogPage() {
	/* 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
  */
	const query = gql`
		query {
			posts {
				nodes {
					title
					date
					excerpt
					slug
				}
			}
		}
	`;

	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		posts: {
			nodes: BlogPostTeaserGql[];
		};
	};

	return (
		<div>
			<h1>Blog</h1>
			{/* Für jeden Eintrag in nodes eine BlogTeaser-Komponente */}

			{response.posts.nodes.map((post) => (
				<BlogTeaser key={post.slug} {...post} />
			))}
		</div>
	);
}

function BlogTeaser({ title, date, excerpt, slug }: BlogPostTeaserGql) {
	return (
		<article>
			<h2>
				<Link href={`/gql-blog/${slug}`}>{title}</Link>
			</h2>
			<time dateTime={date.substring(0, 10)}>
				{new Date(date).toLocaleDateString('de')}
			</time>
			<div dangerouslySetInnerHTML={{ __html: excerpt }} />
		</article>
	);
}
