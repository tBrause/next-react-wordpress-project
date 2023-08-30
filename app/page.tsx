import LoadingSpinner from '@/components/LoadingSpinner';
import SlowComponent from '@/components/SlowComponent';
import { Suspense } from 'react';

export default function Home() {
	return (
		<main className="default-layout">
			<h1>Willkommen zu Next</h1>
			{/* https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense */}
			<Suspense fallback={<LoadingSpinner />}>
				<SlowComponent />
			</Suspense>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut tenetur at
				repudiandae suscipit nihil laborum nulla similique reprehenderit rem
				quo.
			</p>
		</main>
	);
}
