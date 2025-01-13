import { createContext } from "react"

export const MovieContext = createContext(null);

export default function MovieContextProvider({ children }) {
    async function trendingMovieList(count) {
        return count;
    }
    return (
        <MovieContext.Provider value={{ trendingMovieList }}>
            {children}
        </MovieContext.Provider>
    );
}