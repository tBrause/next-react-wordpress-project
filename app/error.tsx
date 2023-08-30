'use client';

// Error-Komponenten müssen use client nutzen

// https://nextjs.org/docs/app/building-your-application/routing/error-handling
type Props = {
	error: Error;
	reset: () => void;
};
/* 
reset ist eine Funktion, mit der man die selbe Aktion (z.B. Seite laden)
nochmal probieren kann.
*/
export default function error({ error, reset }: Props) {
	if (error.message === 'NEXT_NOT_FOUND') {
		throw error;
	}

	return (
		<main className="default-layout">
			<h2>Es gab ein Problem! {error.message}</h2>

			<button onClick={reset}>Nochmal versuchen</button>
		</main>
	);
}
