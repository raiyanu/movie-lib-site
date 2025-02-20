import React, {
    useState,
    useEffect,
    useContext,
    Suspense,
    lazy,
    useRef,
} from "react";
const MovieCardContainer = lazy(() => import("@/section/MovieCardContainer"));
import HomeCarousel from "../components/HomeCarousel";
import { MovieContext } from "@/utils/MovieContextProvider";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
    const { getTrendingMovie, feedLoading } = useContext(MovieContext);
    const [moviesList, setMoviesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ref = useRef(null);

    const changePage = (pageNumber) => {
        if ("<" === pageNumber && currentPage > 1) {
            setCurrentPage(() => currentPage - 1);
        } else if (">" === pageNumber) {
            setCurrentPage(() => currentPage + 1);
        } else {
            setCurrentPage(() => pageNumber);
        }
        console.log(pageNumber);
        console.log(currentPage);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await getTrendingMovie(currentPage);
                if (Array.isArray(result)) {
                    setMoviesList([...result]);
                } else {
                    console.error("Expected an array, but got:", result);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, [currentPage]);

    return (
        <div className="max-w-full overflow-x-clip pb-8" ref={ref}>
            <Suspense fallback={<HalfSceenLoader />}>
                <HomeCarousel />
                <h3 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">Trending </h3>
                {feedLoading ? (
                    <HalfSceenLoader />
                ) : (
                    <MovieCardContainer moviesList={moviesList} />
                )}
                <Pagination className="mt-8">
                    <PaginationContent className="*:cursor-pointer *:select-none">
                        {renderPageButtons(5, currentPage, changePage)}
                    </PaginationContent>
                </Pagination>
            </Suspense>
        </div>
    );
}

const renderPageButtons = (noOfPage, currentPage, handleOptionChange) => {
    let elements = [];
    if (!(currentPage === 1)) {
        elements.push(
            <PaginationItem
                key={"PreviousButton"}
                onClick={() => handleOptionChange("<")}
            >
                <PaginationPrevious value={"<"} />
            </PaginationItem>
        );
    }
    for (
        let i = currentPage === 1 ? currentPage : currentPage - 1;
        i <= noOfPage;
        i++
    ) {
        elements.push(
            <PaginationItem
                key={`PreviousButton-${i}th-button`}
                onClick={() => handleOptionChange(i)}
            >
                <PaginationLink isActive={currentPage === i}>{i}</PaginationLink>
            </PaginationItem>
        );
    }
    // if (!(currentPage === noOfPage)) {
    //     elements.push(
    //         <PaginationItem key={`PreviousButton-th-ellipse`} >
    //             <PaginationEllipsis />
    //         </PaginationItem>
    //     )
    // }

    if (!(currentPage === noOfPage)) {
        elements.push(
            <PaginationItem
                key={"NextButton"}
                onClick={() => handleOptionChange(">")}
            >
                <PaginationNext />
            </PaginationItem>
        );
    }
    return elements;
};

export function HalfSceenLoader() {
    return (
        <div className="my-4 grid h-[300px] w-full place-content-center">
            <span className="loader"></span>
        </div>
    );
}
