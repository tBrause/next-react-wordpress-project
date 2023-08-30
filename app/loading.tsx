import LoadingSpinner from '@/components/LoadingSpinner';

// https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
export default function loading() {
	return (
		<>
			<h1>Laden…</h1>
			<LoadingSpinner />
		</>
	);
}
