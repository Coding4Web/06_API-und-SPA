async function fetchExample(search) {
	try {
		const response = await fetch(`http://localhost:8000/?search=${search}`);

		if (!response.ok) {
			throw new Error('Fehler beim Laden der Daten');
		}

		const jsonData = await response.json();
	} catch (error) {
		console.log(error);
	}
}

fetchExample('25746');
