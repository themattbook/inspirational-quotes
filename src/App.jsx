import { useState, useEffect } from "react";

function App() {
	const [quote, setQuote] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQuote = async () => {
			try {
				const response = await fetch(
					"https://corsproxy.io/?https://zenquotes.io/api/random"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch quote");
				}
				const data = await response.json();
				if (data && data.length > 0) {
					setQuote(data[0]);
				} else {
					throw new Error("Empty response or unexpected format");
				}
			} catch (error) {
				console.error("Error fetching quote:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchQuote();

		return () => {
			// Cleanup function if needed
		};
	}, []);

	return (
		<div className="container">
			<main className="quote">
				{loading ? (
					<p>Loading...</p>
				) : (
					<>
						<h1>&quot;{quote.q}&quot;</h1>
						<p>-{quote.a}</p>
					</>
				)}
			</main>
		</div>
	);
}

export default App;
