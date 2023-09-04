// Desc: Sub Navigation for Main Navigation
// Params: none
// Return: Main Navigation

// React
import React from 'react';

// Modules
import { gql, request } from 'graphql-request';
import Link from 'next/link';
import { idText } from 'typescript';

// ENV
const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

// Export
export default async function WpSubNavigation() {
	// Query for GraphQl for Menu Legal Navigation - id: "3"
	const query = gql`
		query {
			menuItems(first: 100, where: { parentDatabaseId: 20 }) {
				edges {
					node {
						id
						label
						uri
						parentDatabaseId
					}
				}
			}
		}
	`;

	// Response from GraphQl as nodes[]
	const response = (await request(WP_GRAPHQL_BASE, query)) as {
		menuItems: {
			edges: {
				node: {
					id: string;
					label: string;
					uri: string;
					parentDatabaseId: number;
				};
			};
		};
	};

	// Response Data for getItems()
	const data: [] = response.menuItems.edges;
	const data2: [] = response.menuItems.edges;
	// console.log(data);
	console.log(data2.length);

	const { node } = response.menuItems.edges;
	// const { uri } = node;
	// console.log(node);
	// console.log(uri);
	// console.log(response.menuItems.edges);

	const { menuItems } = response;

	data2.map((data2: string) => {
		// console.log(data2.node.uri);
		// console.log(data2.node.label);
		// console.log('dsdasdsad');
	});

	// const check = response.menuItems.edges;
	// console.log(check);

	// Return
	return (
		<>
			<div>Return</div>
			<nav className="extern-navigation">
				<ul className="extern-navigation__list">
					{/* Get Items li for li */}
					{getSubItems(data2)}
				</ul>
			</nav>
		</>
	);
}

// Get Items for li
function getSubItems(data2: []) {
	console.log(data2.length);

	// Map
	return data2.map((item: string) => {
		<p key={item}>{item} dfsdf</p>;
	});
}
