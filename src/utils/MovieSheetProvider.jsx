import { createContext, useState } from "react";

import MovieSheet from "@/components/MovieSheet";

export const MovieSheetContext = createContext();

export default function MovieSheetProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [movie, setMovie] = useState(undefined);
    function ExpandMovie(id, movie) {
        setId(() => id);
        setOpen(() => true);
        setMovie(() => movie);
    }

    return (
        <MovieSheetContext.Provider value={{ ExpandMovie }}>
            {children}
            <MovieSheet id={id} open={open} onOpenChange={setOpen} movie={movie} />
        </MovieSheetContext.Provider>
    );
}
