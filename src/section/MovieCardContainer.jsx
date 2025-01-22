import React from "react";
import MovieCard from "../components/MovieCard";
import MovieSheetProvider from "../utils/MovieSheetProvider";

export default function MovieFeed({ moviesList }) {
    return (
        <MovieSheetProvider>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
                {moviesList.map((movie, index) => {
                    return <MovieCard movie={movie} key={`MovieFeedCard-${index}`} index={index} />;
                })}
            </div>
        </MovieSheetProvider>
    );
}
