"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import revi from "@/public/revi.jpg";
import praja from "@/public/praja.jpg";
import sakhron from "@/public/sakhron.jpg";
import utsman from "@/public/utsman.jpg";

// Data untuk orang-orang dalam carousel
const people = [
    {
        name: "Revialdy Arif",
        position: "Software Engineer",
        image: revi,
    },
    {
        name: "M. Praja Dewanata",
        position: "Researcher",
        image: praja,
    },
    {
        name: "Sakhron Isyama",
        position: "Data Scientist",
        image: sakhron,
    },
    {
        name: "Utsman Ahmad",
        position: "Software Engineer",
        image: utsman,
    },
];

export default function CarouselDemo() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;

        const handleSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on("select", handleSelect);
        setCurrent(api.selectedScrollSnap());

        return () => {
            api.off("select", handleSelect);
        };
    }, [api]);

    return (
        <div className="container mx-auto flex flex-col px-6 md:px-14 py-10 items-center">
            <div className="flex flex-col gap-3 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mt-4 md:mt-8">
                    Meet the talented team <br className="hidden md:block" />
                    who make all this happen
                </h1>
                <p className="text-lg md:text-xl mt-2 md:mt-4">
                    Our team is made up of passionate individuals dedicated to <br className="hidden md:block" />
                    helping you achieve your health goals.
                </p>
            </div>

            <Carousel
                setApi={setApi}
                className="w-full max-w-xs md:max-w-5xl mx-auto py-10"
                opts={{
                    align: "center",
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {people.map((person, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-2 md:pl-4 md:basis-1/3 transition-all duration-300"
                        >
                            <div className="p-1">
                                <Card
                                    className={cn(
                                        "overflow-hidden transition-all duration-500 hover:translate-y-[-5px]",
                                        current === index
                                            ? "scale-110 md:scale-120 z-10 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.2)]"
                                            : "scale-95 md:scale-90 opacity-80 shadow-md hover:shadow-lg"
                                    )}
                                >
                                    <CardContent className="p-0 rounded-lg">
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <Image
                                                src={person.image || "/placeholder.svg"}
                                                alt={person.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute bottom-4 md:bottom-9 left-4 right-4 p-3 md:p-4 backdrop-blur-md bg-black/30 rounded-lg shadow-lg transform transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl">
                                                <h3 className="text-white font-bold text-base md:text-lg">
                                                    {person.name}
                                                </h3>
                                                <p className="text-white/90 text-xs md:text-sm">
                                                    {person.position}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 md:left-6" />
                <CarouselNext className="right-3 md:right-6" />
            </Carousel>
        </div>
    );
}
