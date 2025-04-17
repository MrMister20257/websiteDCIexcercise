"use client"

import { useState, useEffect, useRef } from "react";
import getMovies from "../utils/getMovies";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Movie = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{Source: string, Value: string}>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export default function Filmepage() {

    const inputRef = useRef<HTMLInputElement>(null)
    const [movies, setMovies] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null);


    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)
        try {
            let title = inputRef.current?.value || ""
            const data = await getMovies(title)
            console.log("heeelooo", data.Title)
            if(data.Error === "Movie not found!") {
                throw new Error("Film nicht gefunden!")
            }
            
            setMovies(data)
        } catch (error) {
            setError(error as Error)
            setMovies(null)
            return `Da lief etwas schief :/ ${error}`
        } finally {
            if (inputRef.current) {
                inputRef.current.value = ""
            }
            setIsLoading(false)
        }
    }

    console.log(movies)

    return (
        <main className="h-full w-full flex justify-center items-center gap-5 p-5 z-10">
            <div className="w-6/12 flex flex-col items-center justify-center p-5">
                <h2 className="text-4xl text-white font-semibold">Suche einen Film</h2>
                <form onSubmit={handleSearch} className="w-full flex items-center justify-center gap-2 p-2">
                    <Input ref={inputRef} type="text" className="bg-pink-200 w-5/12 flex items-center text-center" required></Input>
                    <Button className="cursor-pointer border-2 rounded-md bg-sky-900 hover:bg-sky-700 p-1 text-white font-semibold transition-all w-25 text-center shadow-md shadow-pink-300">Film suchen</Button>
                </form>
            </div>
            <div className="w-full h-full rounded-md flex flex-col items-center justify-center p-5">
                {isLoading ? (
                    <p className="bg-gray-200/5 backdrop-blur-xs p-3 rounded-md text-white animate-pulse">Lade Filmdaten...</p>
                ) : error ? (
                    <p className="bg-red-500/50 backdrop-blur-xs text-3xl text-white p-2 rounded-md">{error.message}</p>
                ) : movies ? (
                    <Card className="w-full h-full bg-gray-200/5 backdrop-blur-xs border-0 p-3 flex flex-col">
                        <CardHeader className="flex flex-col items-center justify-center">
                        {movies.Title.length > 20 ? (
                            <CardTitle className="text-3xl mb-6 text-center text-white">
                                {movies.Title}
                            </CardTitle>
                        ) : (
                            <CardTitle className="text-7xl mb-6 text-center text-white">
                                {movies.Title}
                            </CardTitle>
                        )}
                            <img src={movies.Poster} alt="Movie Cover" className="max-h-40 m-auto mb-6"/>
                            <CardDescription className="w-6/12 text-center text-white bg-gray-900/90 backdrop-blur-xs rounded-md p-2">{movies.Plot}</CardDescription>
                        </CardHeader>
                        <CardContent className="w-fit text-white bg-gray-900/90 backdrop-blur-xs rounded-md p-2 self-center">
                            <p>Besetzung: {movies.Actors}</p>
                            <p>Autor: {movies.Writer}</p>
                            <p>Genre: {movies.Genre}</p>
                            <p>Dauer: {movies.Runtime}</p>
                            <p>Erscheinungsjahr: {movies.Year}</p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-evenly">
                            <p className="text-white">Metascore: <span className="text-4xl text-pink-400">{movies.Metascore}</span></p>
                            <p className="text-white">imdb Rating: <span className="text-4xl text-pink-400">{movies.imdbRating}</span></p>
                        </CardFooter>
                    </Card>
                ) : null}
            </div>

        </main>
    )
}