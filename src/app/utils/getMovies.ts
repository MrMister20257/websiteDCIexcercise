

export default async function getMovies(title: string) {
    
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.NEXT_PUBLIC_KEY}`)
    
        if (!response.ok) {
            throw new Error(`Fehler beim Laden der Filmdaten: ${response.status} ${response.statusText}`)
        }

        const data = response.json()
        console.log("Daten geladen!")
        return data

    } catch (error) {
        console.error('Fehler beim Abrufen der Filmdaten:', error)
        return []
    }
}