import { useContext, Suspense, lazy } from "react";
import { MovieContext } from "@/utils/MovieContextProvider";
import { HalfSceenLoader } from "./Home";
import { HeartIcon } from "lucide-react";
import { motion } from "framer-motion";

const MovieCardContainer = lazy(() => import("@/section/MovieCardContainer"));

export default function Favorite() {
    const { favoriteMovie } = useContext(MovieContext);
    if (favoriteMovie.length <= 0) {
        return (
            <h4 className="mt-8 flex scroll-m-20 items-center justify-center gap-2 text-center text-2xl font-semibold tracking-tight text-secondary">
                Too empty, Click <HeartIcon /> icon to add movies to favorite
            </h4>
        );
    }
    return (
        <motion.div className="max-w-full overflow-x-clip pb-52">
            <Suspense fallback={<HalfSceenLoader />}>
                <MovieCardContainer moviesList={favoriteMovie} />
            </Suspense>
        </motion.div>
    );
}
