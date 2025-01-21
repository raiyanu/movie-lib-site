import { createContext, useState } from "react";

import MovieDialogue from "@/components/MovieDialogue.jsx";

export const MovieDialogueContext = createContext();

export default function MovieDialogueProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [movie, setMovie] = useState(undefined);
    function ExpandMovie(id, movie) {
        setId(() => id);
        setOpen(() => true);
        setMovie(() => movie);
        console.log(id);
    }

    return (
        <MovieDialogueContext.Provider value={{ ExpandMovie }}>
            {children}
            <MovieDialogue id={id} open={open} setOpen={setOpen} movie={movie} />
        </MovieDialogueContext.Provider>
    );
}
