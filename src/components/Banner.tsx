/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src={`${process.env.NEXT_PUBLIC_BANNER_IMG_LINK}`}
        alt="Logo"
        fill
        style={{ objectFit: "cover", objectPosition: "left" }}
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
        <button className="translate my-3 rounded-full bg-white px-10 py-4 font-bold text-purple-500 shadow-md duration-150 hover:shadow-xl active:scale-90">
          I'm flexible
        </button>
      </div>
    </div>
  );
};

export default Banner;
