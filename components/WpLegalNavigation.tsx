// Desc: Main Navigation for Wordpress
// Params: none
// Return: Main Navigation

// React
import React from 'react';

// Modules
import { gql, request } from 'graphql-request';
import Link from 'next/link';

// ENV
const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

// Export
export default async function WpLegalNavigation() {
	// Query for GraphQl for Menu Legal Navigation - id: "4"
	const query = gql`
		query {
			menu(id: "4", idType: DATABASE_ID) {
				menuItems(first: 101) {
					nodes {
						id
						uri
						label
					}
				}
			}
		}
	`;

	// Response from GraphQl as nodes[]
	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		menu: {
			menuItems: {
				nodes: [];
			};
		};
	};

	// Response Data for getItems()
	const data: [] = response.menu.menuItems.nodes;
	// console.log(data);

	// Return
	return (
		<nav className="legal-navigation">
			<ul className="legal-navigation__list">
				{/* Get Items li for li */}
				{getItems(data)}
			</ul>
		</nav>
	);
}

// Get Items for li
function getItems(data: []) {
	// Filter and Map
	return data.map(({ uri, label }) => {
		// Return li
		return (
			<li key={uri}>
				<Link href={`/gql-page${uri}`}>{label}</Link>
			</li>
		);
	});
}
