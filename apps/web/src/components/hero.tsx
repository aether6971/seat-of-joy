export const Hero = () => {
  return (
    <div className="relative h-[70vh]">
      <video
        loop
        muted
        autoPlay
        className="absolute top-0 bottom-0 right-0 left-0 opacity-80 w-full h-full object-cover"
        src="https://www.gordonmac.com/wp-content/uploads/storm-1.mp4"
        poster="https://www.gordonmac.com/wp-content/uploads/storm-1.png"
      ></video>
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <span className="mt-12 mx-0 max-w-80 leading-[45px] text-5xl text-white drop-shadow-lg">
          hello there
        </span>
      </div>
    </div>
  );
};
