// Modules
import { Suspense } from 'react';

// Components
import LoadingSpinner from '@/components/LoadingSpinner';
import SlowComponent from '@/components/SlowComponent';

// Export
export default function Home() {
	return (
		<main className="default-layout">
			<h1>Willkommen zu Next</h1>
			{/* LoadingSpinner */}
			<Suspense fallback={<LoadingSpinner />}>
				<SlowComponent />
			</Suspense>
		</main>
	);
}
