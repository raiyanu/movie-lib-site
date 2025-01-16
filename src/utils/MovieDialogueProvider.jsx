import { createContext, useState } from "react"

import MovieDialogue from '@/components/MovieDialogue.jsx'

export const MovieDialogueContext = createContext();

export default function MovieDialogueProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    function ExpandMovie(id) {
        setId(() => id);
        setOpen(() => true);
        console.log(id);

    }

    return (
        <MovieDialogueContext.Provider value={{ ExpandMovie }}>
            {children}
            <MovieDialogue id={id} open={open} setOpen={setOpen} />
        </MovieDialogueContext.Provider>
    )
}




