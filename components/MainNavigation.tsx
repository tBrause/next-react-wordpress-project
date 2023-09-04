'use client';

// Front-End-Component

import { useToggle } from '@/lib/hooks/useToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { CgMenuRound, CgCloseO } from 'react-icons/cg';
/* 
Barrierefreies Menü:
https://inclusive-components.design/menus-menu-buttons/
*/

export default function MainNavigation() {
	const [showMenu, toggleShowMenu, , , closeMenu] = useToggle(false);
	const pathName = usePathname();

	/* Wenn pathname sich ändert, soll das Menü geschlossen werden. */
	useEffect(closeMenu, [pathName]);

	return (
		<nav className="main-navigation">
			<button
				onClick={toggleShowMenu}
				className="main-navigation__button"
				aria-label={`Menü ${showMenu ? 'schließen' : 'öffnen'}`}
				aria-expanded={showMenu}
			>
				Menü {showMenu ? <CgCloseO /> : <CgMenuRound />}
			</button>
			{showMenu && (
				<ul className="main-navigation__list">{getMenuItems(pathName)}</ul>
			)}
		</nav>
	);
}

type LinkTarget = {
	text: string;
	url: string;
};

const linkTargets: LinkTarget[] = [
	{
		text: 'Home',
		url: '/',
	},
	{
		text: 'Gql-Blog',
		url: '/gql-blog',
	},
	{
		text: 'Gql-Page',
		url: '/gql-page',
	},
];

function getMenuItems(pathName: string) {
	/* Alle Link-Elemente sollen die CSS-Klasse main-navigation__link
	erhalten, zusätzlich soll das Link-Element, das der aktuell angezeigten
	Seite entspricht, die Klasse main-navigation__link--current erhalten */

	return linkTargets.map(({ text, url }) => {
		const isCurrentPath = url === pathName;
		const cssClass = `main-navigation__link ${
			isCurrentPath ? 'main-navigation__link--current' : ''
		}`;
		return (
			<li key={url}>
				<Link href={url} className={cssClass}>
					{text}
				</Link>
			</li>
		);
	});
}
