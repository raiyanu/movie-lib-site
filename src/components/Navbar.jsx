import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion-arrowLess";
import { Search } from "lucide-react";

export default function Navbar({ children }) {
    return (
        <header className="mb-2 mt-3 flex h-fit w-full items-start [&[data-state=open]>svg]:items-start justify-between rounded-lg border px-4 py-3">
            <div className="flex gap-5">{children}</div>
            <Accordion collapsible className="max-h-fit border-b-0">
                <AccordionItem value="accordian-search" className="flex h-fit flex-col items-end justify-center gap-2 border-b-0">
                    <AccordionTrigger className="pt-1">
                        <Search />
                    </AccordionTrigger>
                    <AccordionContent className="p-1">
                        <form className="flex w-full items-center space-x-2" method="GET">
                            <Input type="text" name="search" placeholder="Movie Name, ID..." />
                            <Button type="submit">Search</Button>
                        </form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </header>
    );
}