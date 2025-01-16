import * as React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MovieContext } from "@/utils/MovieContextProvider";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { MovieDialogueContext } from '@/utils/MovieDialogueProvider'
export default function MovieCard({ movie }) {
    const { ExpandMovie } = useContext(MovieDialogueContext);
    const { toggleFavorite, isFavorite } = useContext(MovieContext);
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        const run = async () => setLiked(await isFavorite(movie.imdbID));
        run();
    }, [movie.imdbID]);
    const togglingFavorite = () => {
        async function run() {
            setLiked(await toggleFavorite(movie.imdbID));
        }
        run();
    };

    return (
        <Card className="w-[300px] max-w-[97vw] gap-2 p-4">
            <CardContent className="relative h-96 overflow-hidden rounded-md border p-0">
                <img
                    src={movie.Poster}
                    className="h-full w-full max-w-[95vw] select-none object-cover"
                    id="focus"
                    alt=""
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

            <CardFooter className="mt-3 grid grid-cols-[1fr_60px] gap-3 p-0">
                <div className="text-content">
                    <h3 className="line-clamp-2 scroll-m-20 text-2xl font-semibold tracking-tight">
                        {movie.Title}
                    </h3>
                    <p className="h-12 scroll-m-20 overflow-hidden text-ellipsis tracking-tight text-zinc-600">
                        {movie.Plot}
                    </p>
                </div>
                <div className="flex h-full flex-col justify-between">
                    <Badge
                        variant="outline"
                        className="block w-full bg-red-400 p-0 text-center"
                    >
                        {movie.Ratings[0].Value}
                    </Badge>
                    <Button className="w-full" onClick={() => {
                        ExpandMovie(movie.imdbID)
                    }}>Read</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
