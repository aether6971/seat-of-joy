import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { ReviewComponent } from "../components/reviews";
import { TeamComponent } from "../components/team";

export default function Home() {
  return (
    <>
      <Header invisible={true} sticky={true} />
      <Hero />
      <div className="flex flex-col max-w-[1440px] my-0 mx-auto ">
        <div className="flex flex-row max-md:flex-col-reverse justify-center w-full">
          <div className="w-full md:w-1/2 max-md:h-screen xl:w-[720px] xl:h-[939px] h-auto relative">
            <div className="w-full h-full bg-image1 -mt-20 bg-cover flex justify-center">
              <span className="mt-12 mx-0 max-w-80 leading-[45px] text-4xl text-white drop-shadow-lg">
                bring your space to life with the beauty of natural light
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:h-auto xl:w-[720px] xl:h-[939px] relative flex flex-col justify-start items-center p-28 max-md:pt-3 max-md:px-40 max-md:mb-4">
            <h2 className="text-dark leading-[70px] text-6xl pt-20 pb-10 max-md:pt-12 max-md:leading-[55px] max-md:text-5xl font-semibold">
              not all light is created equal
            </h2>
            Inspired by the natural light found in Provence, where artists have
            flocked for centuries, our unique recipe of light allows everything
            to be beautifully lit.
          </div>
        </div>
        <div className="flex flex-row max-md:flex-col justify-center w-full">
          <div className="w-full md:w-1/2 md:h-auto xl:w-[720px] xl:h-[939px] bg-accent !h-auto -mt-20">
            <div className="w-full h-full -mt-20 flex flex-col justify-start items-center p-28 bg-cover">
              <h2 className="text-dark leading-[70px] text-6xl pt-20 pb-10 font-semibold">
                not all light is created equal
              </h2>
              Inspired by the natural light found in Provence, where artists
              have flocked for centuries, our unique recipe of light allows
              everything to be beautifully lit.
            </div>
          </div>
          <div className="w-full md:w-1/2 max-md:h-screen bg-image1 bg-cover xl:w-[720px] xl:h-[939px] flex justify-center">
            <span className="mt-12 mx-0 max-w-80 leading-[45px] text-4xl text-white drop-shadow-lg">
              bring your space to life with the beauty of natural light
            </span>
          </div>
        </div>
        <div className="flex flex-row max-md:flex-col-reverse justify-center w-full">
          <div className="w-full md:w-1/2 max-md:h-screen xl:w-[720px] xl:h-[939px] h-auto relative">
            <div className="w-full h-full bg-image1 -mt-20 bg-cover flex justify-center">
              <span className="mt-12 mx-0 max-w-80 leading-[45px] text-4xl text-white drop-shadow-lg">
                bring your space to life with the beauty of natural light
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:h-auto xl:w-[720px] xl:h-[939px] relative flex flex-col justify-start items-center p-28 max-md:pt-3 max-md:px-40 max-md:mb-4">
            <h2 className="text-dark leading-[70px] text-6xl pt-20 pb-10 max-md:pt-12 max-md:leading-[55px] max-md:text-5xl font-semibold">
              not all light is created equal
            </h2>
            Inspired by the natural light found in Provence, where artists have
            flocked for centuries, our unique recipe of light allows everything
            to be beautifully lit.
          </div>
        </div>
      </div>
      <ReviewComponent />
      <TeamComponent />
      <Footer />
    </>
  );
}
