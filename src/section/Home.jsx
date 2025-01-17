import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import MovieFeed from "@/section/MovieFeed";
import HomeCarousel from '../components/HomeCarousel';
import { MovieContext } from '@/utils/MovieContextProvider';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function Home() {
    const { getTrendingMovie } = useContext(MovieContext);
    const [moviesList, setMoviesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
    }

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
        <div className='max-w-full overflow-x-clip pb-52'>
            <HomeCarousel />
            <MovieFeed moviesList={moviesList} />
            <Pagination className="my-4">
                <PaginationContent className="*:cursor-pointer *:select-none">
                    {
                        renderPageButtons(5, currentPage, changePage)
                    }
                </PaginationContent>
            </Pagination>
        </div>
    );
}

const renderPageButtons = (noOfPage, currentPage, handleOptionChange) => {
    let elements = [];
    if (!(currentPage === 1)) {
        elements.push(
            <PaginationItem key={"PreviousButton"} onClick={() => handleOptionChange("<")}>
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
            <PaginationItem key={`PreviousButton-${i}th-button`} onClick={() => handleOptionChange(i)}>
                <PaginationLink isActive={currentPage === i}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        );

    }

    if (!(currentPage === noOfPage)) {
        elements.push(
            <PaginationItem key={"NextButton"} onClick={() => handleOptionChange(">")}>
                <PaginationNext />
            </PaginationItem>
        );
    }
    return elements;
};