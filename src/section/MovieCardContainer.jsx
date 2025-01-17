import React, { useState, useEffect, useContext } from "react";
import HomeCarousel from "../components/HomeCarousel";
import MovieCard from "../components/MovieCard";
import MovieDialogueProvider from "@/utils/MovieDialogueProvider";
import { MovieContext } from "@/utils/MovieContextProvider";
import MovieSheetProvider from "../utils/MovieSheetProvider";

export default function MovieFeed({ moviesList }) {
    return (
        <MovieSheetProvider>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
                {
                    moviesList.map((movie, index) => {
                        return <MovieCard movie={movie} key={`MovieFeedCard-${index}`} />;
                    })
                }
            </div>
        </MovieSheetProvider>
    );
}
