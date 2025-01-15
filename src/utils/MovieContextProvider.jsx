import { createContext } from "react";

export const MovieContext = createContext(null);

export default function MovieContextProvider({ children }) {
    async function trendingMovieList(count) {
        return count;
    }
    async function getTrendingMovieCarousel() {
        return getTrendingMovieCarouselPlaceHolder;
    }
    return (
        <MovieContext.Provider value={{ trendingMovieList, getTrendingMovieCarousel }}>
            {children}
        </MovieContext.Provider>
    );
}

const getTrendingMovieCarouselPlaceHolder = [
    {
        title: "300",
        Poster: "/300.jpg",
        year: 2006,
        ids: {
            trakt: 1,
            slug: "300-2006",
            imdb: "tt0416449",
            tmdb: 124,
        },
    },
    {
        title: "Batman Begins",
        Poster: "/batman-begins.jpg",
        year: 2005,
        ids: {
            trakt: 2,
            slug: "batman-begins-2005",
            imdb: "tt0372784",
            tmdb: 272,
        },
    },
    {
        title: "Prometheus",
        Poster: "/Prometeus.jpg",
        year: 2012,
        ids: {
            trakt: 3,
            slug: "prometheus-2012",
            imdb: "tt1446714",
            tmdb: 1892,
        },
    },
    {
        title: "Inception",
        Poster: "/The-Inception.jpg",
        year: 2010,
        ids: {
            trakt: 4,
            slug: "inception-2010",
            imdb: "tt1375666",
            tmdb: 27205,
        },
    },
    {
        title: "The Wolverine",
        Poster: "/The-Wolverine.jpg",
        year: 2013,
        ids: {
            trakt: 5,
            slug: "the-wolverine-2013",
            imdb: "tt1430132",
            tmdb: 14526,
        },
    },
];
