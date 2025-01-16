import React from 'react'
import HomeCarousel from '../components/HomeCarousel'
import MovieCard from '../components/MovieCard'
import MovieDialogueProvider from '@/utils/MovieDialogueProvider'
export default function MovieFeed() {
    return (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
            <MovieDialogueProvider>
                <MovieCard movie={movie} />
                <MovieCard movie={movie2} />
                <MovieCard movie={movie2} />
                <MovieCard movie={movie2} />
                <MovieCard movie={movie} />
                <MovieCard movie={movie2} />
                <MovieCard movie={movie2} />
                <MovieCard movie={movie2} />
                <MovieCard movie={movie} />
            </MovieDialogueProvider>
        </div>
    )
}



const movie = {
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
};
const movie2 = {
    "Title": "Batman Begins",
    "Year": "2005",
    "Rated": "PG-13",
    "Released": "15 Jun 2005",
    "Runtime": "140 min",
    "Genre": "Action, Drama",
    "Director": "Christopher Nolan",
    "Writer": "Bob Kane, David S. Goyer, Christopher Nolan",
    "Actors": "Christian Bale, Michael Caine, Ken Watanabe",
    "Plot": "After witnessing his parents' death, Bruce learns the art of fighting to confront injustice. When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.",
    "Language": "English, Mandarin",
    "Country": "United States, United Kingdom",
    "Awards": "Nominated for 1 Oscar. 15 wins & 79 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "8.2/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "85%"
        },
        {
            "Source": "Metacritic",
            "Value": "70/100"
        }
    ],
    "Metascore": "70",
    "imdbRating": "8.2",
    "imdbVotes": "1,619,232",
    "imdbID": "tt0372784",
    "Type": "movie",
    "DVD": "N/A",
    "BoxOffice": "$206,863,479",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}