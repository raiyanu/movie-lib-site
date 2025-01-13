import { createContext } from "react"

export const MovieContext = createContext(null);

export default function MovieContext({ children }) {
    async function trendingMovieList(count) {
        return count;
    }
    return (
        <MovieContext.Provider value={{ trendingMovieList, test: "this is a text" }}>
            {children}
        </MovieContext.Provider>
    );
}