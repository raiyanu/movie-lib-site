import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion-arrowLess";
import { Search, EllipsisVertical } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";

export default function Navbar({ children }) {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [searchOption, setSearchOption] = useState("title");
    const [searchBarOpen, setSearchBarOpen] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${searchInput} : ${searchOption}`);
        navigate(`/search/${searchOption}/${searchInput}`);
        setSearchBarOpen("")
    };

    return (
        <header className="mb-2 mt-3 flex h-fit w-full items-start [&[data-state=open]>svg]:items-start justify-between rounded-lg border px-4 py-3 max-md:flex-wrap !sticky top-0 left-0 z-[2] bg-black">
            <div className="flex items-center justify-center">
                <div className="flex gap-5">{children}</div>
                <Link
                    to="/"
                    className="ml-2 flex flex-wrap items-center gap-4 md:hidden"
                >
                    <img src="/favicon.ico" height={40} width={30} alt="" /> M-Library
                </Link>
            </div>
            <Accordion
                value={searchBarOpen}
                onValueChange={() => { setSearchBarOpen(searchBarOpen != 'searchbar' ? 'searchbar' : "") }}
                collapsible className="max-h-fit border-b-0">
                <AccordionItem
                    value={'searchbar'}
                    className="flex h-fit flex-col items-end justify-center gap-2 border-b-0"
                >
                    <AccordionTrigger className="pt-1">
                        <Search />
                    </AccordionTrigger>
                    <AccordionContent className="p-1">
                        <form
                            className="flex w-full items-center space-x-2"
                            method="GET"
                            onSubmit={handleSubmit}
                        >
                            <Input
                                type="text"
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                                value={searchInput}
                                name="search"
                                placeholder="Movie Name, ID..."
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <EllipsisVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Search By</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup
                                        value={searchOption}
                                        onValueChange={setSearchOption}
                                    >
                                        <DropdownMenuRadioItem value="title">
                                            Movie Title
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="id">
                                            IMBD ID
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button type="submit">Search</Button>
                        </form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </header>
    );
}
