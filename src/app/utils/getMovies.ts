export default async function getMovies(title: string) {
    
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${process.env.NEXT_PUBLIC_KEY}`)
    
        if (!response.ok) {
            throw new Error(`Fehler beim Laden der Filmdaten: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Fehler beim Abrufen der Filmdaten:', error)
        return []
    }
}