import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { MovieContext } from "@/utils/MovieContextProvider";
import { useContext, useState } from "react";
import { Heart } from "lucide-react";

export default function MovieDialogue({ id, open, setOpen, movie }) {
    const { toggleFavorite, isFavorite } = useContext(MovieContext);
    const [liked, setLiked] = useState(false);
    const togglingFavorite = () => {
        async function run() {
            let toggled = await toggleFavorite(movie.imdbID);
            setLiked(toggled);
            const showToast = (turnedFavorite) => {
                const args = [(turnedFavorite ? "Added to Favorite List" : "Removed from Favorite List"), {
                    description: `Movie Name : ${movie.Title}`,
                    action: {
                        label: "Undo",
                        onClick: async () => {
                            toggled = await toggleFavorite(movie.imdbID)
                            setLiked(toggled);
                            showToast(toggled);
                        },
                    },
                }]
                if (turnedFavorite) {
                    toast.success(...args);
                } else {
                    toast(...args);
                }
                console.log("Showing toast")
            }
            showToast(toggled);
        }
        run();
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-screen overflow-y-scroll sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{movie?.Title ? movie?.Title : ""}</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <DialogContent>
                    <img
                        src={movie?.Poster}
                        className="h-full w-full max-w-[95vw] select-none object-cover"
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
                </DialogContent>
                <DialogFooter>
                    <Button type="submit" onClick={() => setOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
