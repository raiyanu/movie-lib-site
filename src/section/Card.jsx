import React, { useContext, useEffect } from "react";
import { MovieContext } from "../utils/MovieContextProvider";


export default function Card() {
    const { test } = useContext(MovieContext);
    useEffect(() => {
        console.log(test);
    }, []);

    return (
        <div>

        </div>
    );
}
