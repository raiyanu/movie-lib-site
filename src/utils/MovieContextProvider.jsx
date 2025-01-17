import { createContext, useState, useEffect } from "react";
import { toggleFavoriteDB, updateFavoriteMovieDB, loadFavoriteMovieDB } from "./PersistentStorage";
import { toast } from "sonner";
import axios from "axios";
import config from "../../config";

export const MovieContext = createContext(null);

export default function MovieContextProvider({ children }) {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [favoriteMovie, setFavoriteMovie] = useState([]);

    useEffect(() => {
        getTrendingMovie(1);
        updateFavoriteMovieState();
    }, []);

    async function getTrendingMovie(page = 1, limit = 12) {
        try {
            const data = await fetchIt(`/movies/popular`, { params: { page, limit } });
            if (data) {
                const summarizedData = await Promise.all(
                    data.map((movie) => getMovieSummary(movie.ids.imdb))
                );
                setTrendingMovies(summarizedData);
                return summarizedData;
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    }

    async function fetchIt(url, options) {
        try {
            const response = await axios.get(`${config.API_1}${url}`, {
                ...options,
                headers: {
                    "trakt-api-version": "2",
                    "trakt-api-key": config.API_1_API_KEY,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error)
            toast("Error fetching data", `<span>${error.message}</span>`);
            return [];
        }
    };

    async function getTrendingMovieCarousel() {
        return getTrendingMovieCarouselPlaceHolder;
    }

    async function updateFavoriteMovieState() {
        const run = async () => {
            const favoriteMovieList = await getFavoriteList(await loadFavoriteMovieDB())
            setFavoriteMovie(favoriteMovieList);
        }
        run();
    }

    async function getFavoriteList() {
        const favoriteMovieDBList = await loadFavoriteMovieDB();

        const FavoriteList = [];
        for (const movieID of favoriteMovieDBList) {
            const movieSummary = await getMovieSummary(movieID);
            FavoriteList.push(movieSummary);
        }

        setFavoriteMovie(() => FavoriteList);
        return FavoriteList;
    }


    async function isFavorite(id) {
        return loadFavoriteMovieDB().includes(id);
    }

    async function toggleFavorite(id) {
        const toggled = toggleFavoriteDB(id)
        updateFavoriteMovieState();
        return toggled;
    }
    return (
        <MovieContext.Provider
            value={{
                trendingMovies,
                getTrendingMovie,
                getTrendingMovieCarousel,
                isFavorite,
                toggleFavorite,
                favoriteMovie,
                getMovieSummary,
                failedFetchPlaceHolder
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

async function getMovieSummary(id, options = {}) {
    const data = await axios.get(`https://www.omdbapi.com/?&apikey=9e86699a&i=${id}`, {
        ...options
    }).then((result) => result.data).catch(error => {
        toast("An Error occured While trying to fetch movie summary", `<span class="text-red-600">${error?.message}</span>`);
        return false;
    });
    return data ? data : failedFetchPlaceHolder;
}


const getTrendingMoviePlaceHolder = [
    {
        Title: "The Wolverine",
        Year: "2013",
        Rated: "PG-13",
        Released: "26 Jul 2013",
        Runtime: "126 min",
        Genre: "Action, Sci-Fi",
        Director: "James Mangold",
        Writer: "Mark Bomback, Scott Frank",
        Actors: "Hugh Jackman, Will Yun Lee, Tao Okamoto",
        Plot: "Wolverine comes to Japan to meet an old friend whose life he saved years ago, and gets embroiled in a conspiracy involving yakuza and mutants.",
        Language: "English, Japanese",
        Country: "United States, United Kingdom",
        Awards: "2 wins & 11 nominations total",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BNzg1MDQxMTQ2OF5BMl5BanBnXkFtZTcwMTk3MjAzOQ@@._V1_SX300.jpg",
        Ratings: [
            {
                Source: "Internet Movie Database",
                Value: "6.7/10",
            },
            {
                Source: "Rotten Tomatoes",
                Value: "71%",
            },
            {
                Source: "Metacritic",
                Value: "61/100",
            },
        ],
        Metascore: "61",
        imdbRating: "6.7",
        imdbVotes: "506,329",
        imdbID: "tt1430132",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$132,556,852",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
    },
    {
        Title: "Batman Begins",
        Year: "2005",
        Rated: "PG-13",
        Released: "15 Jun 2005",
        Runtime: "140 min",
        Genre: "Action, Drama",
        Director: "Christopher Nolan",
        Writer: "Bob Kane, David S. Goyer, Christopher Nolan",
        Actors: "Christian Bale, Michael Caine, Ken Watanabe",
        Plot: "After witnessing his parents' death, Bruce learns the art of fighting to confront injustice. When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.",
        Language: "English, Mandarin",
        Country: "United States, United Kingdom",
        Awards: "Nominated for 1 Oscar. 15 wins & 79 nominations total",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg",
        Ratings: [
            {
                Source: "Internet Movie Database",
                Value: "8.2/10",
            },
            {
                Source: "Rotten Tomatoes",
                Value: "85%",
            },
            {
                Source: "Metacritic",
                Value: "70/100",
            },
        ],
        Metascore: "70",
        imdbRating: "8.2",
        imdbVotes: "1,619,232",
        imdbID: "tt0372784",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$206,863,479",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
    },
    {
        Title: "John Wick",
        Year: "2014",
        Rated: "R",
        Released: "24 Oct 2014",
        Runtime: "101 min",
        Genre: "Action, Crime, Thriller",
        Director: "Chad Stahelski",
        Writer: "Derek Kolstad",
        Actors: "Keanu Reeves, Michael Nyqvist, Alfie Allen",
        Plot: "With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her--a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wife's present, the legendary hitman will be forced to unearth his meticulously concealed identity. Blind with revenge, John will immediately unleash a carefully orchestrated maelstrom of destruction against the sophisticated kingpin, Viggo Tarasov, and his family, who are fully aware of his lethal capacity. Now, only blood can quench the boogeyman's thirst for retribution.",
        Language: "English, Russian, Hungarian",
        Country: "United States",
        Awards: "5 wins & 10 nominations total",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg",
        Ratings: [
            {
                Source: "Internet Movie Database",
                Value: "7.4/10",
            },
            {
                Source: "Rotten Tomatoes",
                Value: "86%",
            },
            {
                Source: "Metacritic",
                Value: "68/100",
            },
        ],
        Metascore: "68",
        imdbRating: "7.4",
        imdbVotes: "764,776",
        imdbID: "tt2911666",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$43,037,835",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
    },
    {
        Title: "Mission: Impossible - Dead Reckoning Part One",
        Year: "2023",
        Rated: "PG-13",
        Released: "12 Jul 2023",
        Runtime: "163 min",
        Genre: "Action, Adventure, Thriller",
        Director: "Christopher McQuarrie",
        Writer: "Bruce Geller, Christopher McQuarrie, Erik Jendresen",
        Actors: "Tom Cruise, Hayley Atwell, Ving Rhames",
        Plot: "Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.",
        Language: "English, French, Italian, Russian",
        Country: "United States",
        Awards: "Nominated for 2 Oscars. 18 wins & 67 nominations total",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_SX300.jpg",
        Ratings: [
            {
                Source: "Internet Movie Database",
                Value: "7.7/10",
            },
            {
                Source: "Rotten Tomatoes",
                Value: "96%",
            },
            {
                Source: "Metacritic",
                Value: "81/100",
            },
        ],
        Metascore: "81",
        imdbRating: "7.7",
        imdbVotes: "271,653",
        imdbID: "tt9603212",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$172,135,383",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
    },
    {
        Title: "Creed III",
        Year: "2023",
        Rated: "PG-13",
        Released: "03 Mar 2023",
        Runtime: "116 min",
        Genre: "Action, Drama, Sport",
        Director: "Michael B. Jordan",
        Writer: "Keenan Coogler, Zach Baylin, Ryan Coogler",
        Actors: "Michael B. Jordan, Tessa Thompson, Jonathan Majors",
        Plot: "Adonis has been thriving in both his career and family life, but when a childhood friend and former boxing prodigy resurfaces, the face-off is more than just a fight.",
        Language: "English, American Sign , Spanish, Hawaiian",
        Country: "United States",
        Awards: "28 nominations total",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BOWY0MTRmY2YtMzBlYi00NjlkLThkZWYtMmE2NzJiZmIzODFkXkEyXkFqcGc@._V1_SX300.jpg",
        Ratings: [
            { Source: "Internet Movie Database", Value: "6.7/10" },
            { Source: "Rotten Tomatoes", Value: "89%" },
            { Source: "Metacritic", Value: "73/100" },
        ],
        Metascore: "73",
        imdbRating: "6.7",
        imdbVotes: "98,104",
        imdbID: "tt11145118",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$156,248,615",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
    },
    {
        Title: "Elemental",
        Year: "2023",
        Rated: "PG",
        Released: "16 Jun 2023",
        Runtime: "101 min",
        Genre: "Animation, Adventure, Comedy",
        Director: "Peter Sohn",
        Writer: "John Hoberg, Kat Likkel, Brenda Hsueh",
        Actors: "Leah Lewis, Mamoudou Athie, Ronnie Del Carmen",
        Plot: "Follows Ember and Wade, in a city where fire-, water-, earth- and air-residents live together.",
        Language: "English",
        Country: "United States",
        Awards: "Nominated for 1 Oscar. 1 win & 66 nominations total",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BNjU2MjE1OGItZjdmYS00ZmIyLTljNjYtOWI5ZGRkZjM4NDEwXkEyXkFqcGc@._V1_SX300.jpg",
        Ratings: [
            { Source: "Internet Movie Database", Value: "7.0/10" },
            { Source: "Rotten Tomatoes", Value: "73%" },
            { Source: "Metacritic", Value: "58/100" },
        ],
        Metascore: "58",
        imdbRating: "7.0",
        imdbVotes: "143,827",
        imdbID: "tt15789038",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$154,426,697",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
    },
    {
        Title: "Scream VI",
        Year: "2023",
        Rated: "R",
        Released: "10 Mar 2023",
        Runtime: "122 min",
        Genre: "Horror, Mystery, Thriller",
        Director: "Matt Bettinelli-Olpin, Tyler Gillett",
        Writer: "James Vanderbilt, Guy Busick, Kevin Williamson",
        Actors: "Courteney Cox, Melissa Barrera, Jenna Ortega",
        Plot: "The survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City.",
        Language: "English",
        Country: "United States, Canada, United Kingdom",
        Awards: "4 wins & 27 nominations total",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BZDZkYzk3YTEtYTQ5MS00MzQ5LTg0NjUtOTgzODA5N2EyYTQ1XkEyXkFqcGc@._V1_SX300.jpg",
        Ratings: [
            { Source: "Internet Movie Database", Value: "6.4/10" },
            { Source: "Rotten Tomatoes", Value: "77%" },
            { Source: "Metacritic", Value: "61/100" },
        ],
        Metascore: "61",
        imdbRating: "6.4",
        imdbVotes: "131,446",
        imdbID: "tt17663992",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$108,161,389",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
    },
    {
        Title: "Ant-Man and the Wasp: Quantumania",
        Year: "2023",
        Rated: "PG-13",
        Released: "17 Feb 2023",
        Runtime: "124 min",
        Genre: "Action, Adventure, Comedy",
        Director: "Peyton Reed",
        Writer: "Jeff Loveness, Stan Lee, Larry Lieber",
        Actors: "Paul Rudd, Evangeline Lilly, Michael Douglas",
        Plot: "The further adventures of Ant-Man and the Wasp.",
        Language: "English",
        Country: "United States, Australia, Canada",
        Awards: "14 nominations total",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMThkYWY5ZjQtYjJlMS00MDFmLWFkYzEtODEzZjg5YWFmMGY4XkEyXkFqcGc@._V1_SX300.jpg",
        Ratings: [
            { Source: "Internet Movie Database", Value: "6.0/10" },
            { Source: "Rotten Tomatoes", Value: "46%" },
            { Source: "Metacritic", Value: "48/100" },
        ],
        Metascore: "48",
        imdbRating: "6.0",
        imdbVotes: "242,879",
        imdbID: "tt10954600",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$214,504,909",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
    },
];


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
        imdbID: "tt0416449",
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
        imdbID: "tt0372784"
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
        imdbID: "tt1446714"
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
        imdbID: "tt1375666"
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
        imdbID: "tt1430132"
    },
];

const failedFetchPlaceHolder = {
    Title: "--",
    Year: "--",
    Rated: "--",
    Released: "--",
    Runtime: "--",
    Genre: "--",
    Director: "--",
    Writer: "--",
    Actors: "--",
    Plot: "--",
    Language: "--",
    Country: "--",
    Awards: "--",
    Poster:
        "https://placehold.co/300x500/png?text=Couldn%27t+image",
    Ratings: [
        {
            Source: "--",
            Value: "--",
        },
        {
            Source: "--",
            Value: "--",
        },
        {
            Source: "--",
            Value: "--",
        },
    ],
    Metascore: "--",
    imdbRating: "--",
    imdbVotes: "--",
    imdbID: "--",
    Type: "--",
    DVD: "--",
    BoxOffice: "--",
    Production: "--",
    Website: "--",
    Response: "--",
}