import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MovieContext } from "@/utils/MovieContextProvider";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { MovieSheetContext } from "@/utils/MovieSheetProvider";

export default function MovieCard({ movie, index }) {
    const { ExpandMovie } = useContext(MovieSheetContext);
    const { toggleFavorite, isFavorite } = useContext(MovieContext);
    const [liked, setLiked] = useState(false);
    const [Censor, setCensor] = useState(true);
    useEffect(() => {
        const run = async () => setLiked(await isFavorite(movie.imdbID));
        run();
        setCensor(
            !(
                movie?.Rated == "PG-13" ||
                movie?.Rated == "R" ||
                movie?.Rated == "unrated"
            )
        );
    }, [movie.imdbID]);
    const togglingFavorite = () => {
        async function run() {
            let toggled = await toggleFavorite(movie.imdbID);
            setLiked(toggled);
            const showToast = (turnedFavorite) => {
                const args = [
                    turnedFavorite
                        ? "Added to Favorite List"
                        : "Removed from Favorite List",
                    {
                        description: `Movie Name : ${movie.Title}`,
                        action: {
                            label: "Undo",
                            onClick: async () => {
                                toggled = await toggleFavorite(movie.imdbID);
                                setLiked(toggled);
                                showToast(toggled);
                            },
                        },
                    },
                ];
                if (turnedFavorite) {
                    toast.success(...args);
                } else {
                    toast(...args);
                }
                console.log("Showing toast");
            };
            showToast(toggled);
        }
        run();
    };

    const unCensorIt = () => setCensor(false);

    return (
        <Card className="w-[280px] max-w-[97vw] gap-2 overflow-hidden">
            <CardContent className="relative h-96 overflow-hidden border p-0">
                <img
                    src={movie.Poster}
                    className={`h-full w-full max-w-[95vw] select-none object-cover  ${Censor ? "blur-lg cursor-pointer" : ""
                        }`}
                    alt=""
                    onClick={unCensorIt}
                />
                <div
                    className="absolute right-2 top-2 flex aspect-square cursor-pointer items-center justify-center rounded-full border bg-black p-1"
                    onClick={togglingFavorite}
                >
                    <Heart
                        fill={liked ? "#fff" : ""}
                        className="transition-all"
                        height={18}
                    />
                </div>
            </CardContent>

            <CardFooter className="relative grid grid-cols-[1fr_60px] gap-3 p-3">
                {/* <img
                    src={movie.Poster}
                    className="absolute -top-full left-4 max-w-20 select-none rounded-sm object-cover shadow-2xl shadow-[rgba(255,255,255,0.2)]"
                    alt=""
                /> // Thumbnail image */ }
                <div className="text-content">
                    <Badge
                        variant="outline"
                        className="bg-red-500 p-0 px-2 text-center text-xs"
                    >
                        Rated {movie?.Rated}
                    </Badge>
                    <h3 className="line-clamp-1 scroll-m-20 text-2xl font-semibold tracking-tight">
                        {movie.Title}
                    </h3>
                    <p className="line-clamp-3 h-12 scroll-m-20 overflow-hidden text-ellipsis text-xs tracking-tight text-zinc-600">
                        {movie.Plot}
                    </p>
                </div>
                <div className="flex h-full flex-col justify-between">
                    <Badge variant="outline" className="block w-full p-0 text-center">
                        {movie?.Ratings?.[0]?.Value}
                    </Badge>
                    <Button
                        className="w-full"
                        onClick={() => {
                            ExpandMovie(movie.imdbID, movie);
                        }}
                    >
                        Read
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
