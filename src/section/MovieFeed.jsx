import React, { useState, useEffect, useContext } from "react";
import HomeCarousel from "../components/HomeCarousel";
import MovieCard from "../components/MovieCard";
import MovieDialogueProvider from "@/utils/MovieDialogueProvider";
import { MovieContext } from "@/utils/MovieContextProvider";

export default function MovieFeed({ moviesList }) {
    useEffect(() => {
        console.log(moviesList);
    }, []);
    return (
        <MovieDialogueProvider>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
                {
                    moviesList.map((movie, index) => {
                        console.log(`Rendering MovieCard for movie:`, movie);
                        return <MovieCard movie={movie} key={`MovieFeedCard-${index}`} />;
                    })
                }
            </div>
        </MovieDialogueProvider>
    );
}
