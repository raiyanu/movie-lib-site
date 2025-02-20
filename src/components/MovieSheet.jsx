import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";

import React, { useEffect, useState } from "react";

export default function MovieSheet({ id, open, onOpenChange, movie }) {
    const [Censor, setCensor] = useState(true);
    useEffect(() => {
        setCensor(
            !(
                movie?.Rated == "PG-13" ||
                movie?.Rated == "R" ||
                movie?.Rated == "unrated"
            )
        );
    }, [id]);
    const unCensorIt = () => setCensor(false);
    return (
        <Sheet open={open} onOpenChange={onOpenChange} movie={movie}>
            <SheetContent className="w-[100vw] !max-w-[70vh] overflow-y-scroll">
                <SheetHeader className="mt-3">
                    <SheetTitle>{movie?.Title ? movie.Title : "N/A"}</SheetTitle>
                    <img
                        src={movie?.Poster ? movie.Poster : ""}
                        className={`mt-4 h-full w-full max-w-[95vw] select-none rounded-sm object-cover ${Censor ? "blur-lg cursor-pointer" : ""
                            }`}
                        alt=""
                        onClick={unCensorIt}
                    />
                    <div className="flex flex-col gap-8">
                        <SheetDescription className="text-start text-sm">
                            <strong className="w-full text-start text-lg text-gray-600">
                                Plot:
                            </strong>
                            {movie?.Plot || "N/A"}
                        </SheetDescription>

                        <div className="mb-2 grid place-content-start gap-x-2 text-start md:grid-cols-2">
                            <p className="text-sm">
                                <strong>Released:</strong> {movie?.Released || "N/A"}
                            </p>
                            <p className="text-sm">
                                <strong>Year:</strong> {movie?.Year || "N/A"}
                            </p>
                            <p className="text-sm">
                                <strong>Rated:</strong> {movie?.Rated || "N/A"}
                            </p>

                            <p className="text-sm">
                                <strong>Runtime:</strong> {movie?.Runtime || "N/A"}
                            </p>
                            <p className="text-sm">
                                <strong>Genre:</strong> {movie?.Genre || "N/A"}
                            </p>
                            <p className="text-sm">
                                <strong>Country:</strong> {movie?.Country || "N/A"}
                            </p>
                            <p className="text-sm">
                                <strong>Director:</strong> {movie?.Director || "N/A"}
                            </p>
                            <p className="text-sm">
                                <strong>Language:</strong> {movie?.Language || "N/A"}
                            </p>
                            <p className="text-sm">
                                <strong>Awards:</strong> {movie?.Awards || "N/A"}
                            </p>
                            <p className="text-sm">
                                <strong>IMDBRating:</strong> {movie?.imdbRating || "N/A"} {"( "}
                                vote: {movie?.imdbVotes || "N/A"} {" )"}
                            </p>
                        </div>
                    </div>

                </SheetHeader>
                <SheetFooter>
                    <SheetTrigger
                        type="button"
                        className="dark: dark:hover: my-3 mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        Close
                    </SheetTrigger>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
