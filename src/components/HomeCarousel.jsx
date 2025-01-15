import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";


export default function HomeCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="h-fit"
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="w-full">
                        <div className="h-fit p-1">
                            <Card className="h-52">
                                <CardContent className="flex h-full items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="relative flex w-full items-center justify-center gap-4 *:block">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    );
}
