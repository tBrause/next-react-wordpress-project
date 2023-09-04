// Desc: Header component
// Params: none
// Return: Header
//
// React
import React from 'react';

// Components
import { TbAtom } from 'react-icons/tb';

// Export Header
export default function Header() {
	return (
		<header className="site-header">
			<div className="site-header__title">
				<TbAtom /> Next - Wordpress - React - App
			</div>
		</header>
	);
}
