// Desc: Externe Navigation for Wordpress
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
export default async function WpExternNavigation() {
	// Query for GraphQl for Menu Legal Navigation - id: "3"
	const query = gql`
		query {
			menu(id: "3", idType: DATABASE_ID) {
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
		<nav className="extern-navigation">
			<ul className="extern-navigation__list">
				{/* Get Items li for li */}
				{getItems(data)}
			</ul>
		</nav>
	);
}

// Get Items for li
function getItems(data: []) {
	// Map
	return data.map(({ uri, label }) => {
		// Return li
		return (
			<li key={uri}>
				<Link href={uri}>{label}</Link>
			</li>
		);
	});
}
