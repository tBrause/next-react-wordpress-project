// Desc: Footer component with legal navigation
// Params: none
// Return: Footer

// Components
import WpLegalNavigation from './WpLegalNavigation';
export default function Footer() {
	// Return
	return (
		<footer className="site-footer">
			<small>&copy; Cimdata {new Date().getFullYear()}</small>
			{/* LegalNavigation */}
			<WpLegalNavigation />
		</footer>
	);
}
