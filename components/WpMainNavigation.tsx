// Desc: Main Navigation for Wordpress
// Params: none
// Return: Main Navigation

// React
import React from 'react';

// Modules
import { gql, request } from 'graphql-request';
import Link from 'next/link';

// Types
type uriToString = {
	uri: string;
};

// ENV
const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;
const NAV_MAIN = process.env.NAV_MAIN!;
console.log(typeof NAV_MAIN);

// Export
export default async function MainNavigation() {
	// Query for GraphQl for Menu Main Navigation - id: "2"
	const query = gql`
		query {
			menu(id: "2", idType: DATABASE_ID) {
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
		<nav className="main-navigation">
			<ul className="main-navigation__list">
				{/* Get Items li for li */}
				{getItems(data)}
			</ul>
		</nav>
	);
}

// Get Items for li
function getItems(data: []) {
	// Filter and Map
	return data
		.filter(({ uri }: uriToString) => uri.split('/').length <= 3)
		.map(({ uri, label }) => {
			// Return li
			return (
				<li key={uri}>
					<Link href={`/gql-page/${uri}`}>{label}</Link>
				</li>
			);
		});
}
