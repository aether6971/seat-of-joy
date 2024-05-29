"use client";
import { useState } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "./ui/avatar";
import { CarouselItem, CarouselContent, Carousel } from "./ui/carousel";
import sliderData from "../lib/sliderData";
import classNames from "classnames";
import { Button } from "./ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { type CarouselApi } from "./ui/carousel";

export const ReviewComponent = () => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-dark leading-[70px] text-6xl pt-20 pb-10 max-md:pt-12 max-md:leading-[55px] max-md:text-5xl font-semibold">
        how our customers feel
      </h2>
      <div className="w-full px-4 py-12 md:py-16 lg:px-0">
        <div className="relative mx-auto max-w-7xl">
          <Carousel
            className="w-ful"
            opts={{
              align: "start",
            }}
            setApi={setApi}
            orientation="horizontal"
          >
            <CarouselContent className="w-full flex gap-6 ">
              {sliderData.map((el) => (
                <CarouselItem key={el.id} className="md:basis-1/3 lg:basis-1/5">
                  <div className="bg-dark text-white fill-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="bg-white text-dark">
                        <AvatarImage
                          alt="Customer Avatar"
                          src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>
                          {el.name
                            .match(/(\b\S)?/g)
                            ?.join("")
                            .match(/(^\S|\S$)?/g)
                            ?.join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{el.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => {
                            return (
                              <StarIcon
                                className={classNames(
                                  "w-5 h-5",
                                  el.stars > i ? "fill-yellow stroke-none" : ""
                                )}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      "{el.review}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <Button
          variant={"outline"}
          size={"icon"}
          className="!rounded-full w-8 h-8 mr-10 hover:bg-grey hover:text-white transition-colors duration-100 ease-in"
        >
          <ChevronLeft
            className="h-4 w-4"
            onClick={() => {
              api?.scrollPrev();
            }}
          />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="!rounded-full w-8 h-8 hover:bg-grey hover:text-white transition-colors duration-100 ease-in"
        >
          <ChevronRight
            className="h-4 w-4"
            onClick={() => {
              api?.scrollNext();
            }}
          />
        </Button>
      </div>
    </div>
  );
};

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
