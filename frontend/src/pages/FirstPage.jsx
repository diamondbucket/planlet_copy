import React from "react";
import Kaka_enhanced from "../assets/Kaka_enhanced.svg";
import Road from "../assets/Road.svg";
import Road_right from "../assets/Road_right.svg"
import Left_flower from "../assets/Flower.png";
import Right_flower from "../assets/Flower.png";
import Left_cloud from "../assets/Left_cloud.svg";
import Center_cloud from "../assets/Center_cloud.svg";
import Right_cloud from "../assets/Center_cloud.svg";
import Girly_chan from "../assets/Girly_chan.svg";
import Signal from "../assets/Signal.svg";
import Planet from "../assets/Planet3.svg";



const FrontPage = () => {
  return (
    <div className="w-full min-h-screen h-screen bg-[#3bf8ff] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Signal - Mobile specific changes */}
      <div className="absolute 
        sm:w-[25vw] sm:left-[-5vw] sm:top-[-14vh] sm:max-w-[450px]
        w-[45vw] left-[-8vw] top-[-2vh] min-w-[200px] z-20 sm:z-0"
      >
        <img 
          src={Signal} 
          alt="Signal" 
          className="w-full h-auto object-contain transform scale-150 sm:scale-100"
        />
      </div>

      {/* Main Logo */}
      <div
        className="absolute 
          w-4/5 
          h-auto 
          sm:top-[6vh] 
          top-[15vh] 
          left-1/2 
          -translate-x-1/2 
          flex 
          items-center 
          justify-center 
          z-10"
        id="main-logo-container"
      > 
        <img src={Planet} className="w-full max-w-2xl mx-auto"/>
      </div>

      {/* Desktop Text - Hidden on mobile */}
      <div className="absolute 
        hidden sm:block      /* Only visible on desktop */
        w-4/5
        top-[45vh]
        left-1/2 
        -translate-x-1/2 
        text-center 
        z-10
      ">
        <p className="
          text-black
          font-bold
          text-center
          sm:text-base
          md:text-lg 
          lg:text-xl 
        ">
          Plan. Create. Post. Simplify Your Content Strategy.
        </p>
      </div>

      {/* Mobile Text - Hidden on desktop */}
      <div className="absolute 
        sm:hidden            /* Only visible on mobile */
        w-4/5
        top-[30vh]
        left-1/2 
        -translate-x-1/2 
        text-center 
        z-10
      ">
        <p className="
          text-black
          font-black
          text-center
          text-sm
          mt-8
          leading-relaxed
        ">
          Plan. Create. Post.<br /> 
          Simplify Your Content Strategy.
        </p>
      </div>

      {/* Right road Illustration */}
      <div
        className="hidden sm:block absolute right-[-10%] top-0 w-[600px] sm:w-[50vw] lg:w-[600px] min-w-[200px] h-screen"
        id="right-illustration-container"
      >
        <img 
          src={Road_right} 
          alt="Road Illustration" 
          className="w-full h-full object-cover origin-top-right scale-125" 
        />
      </div>

      {/* Left road Illustration */}
      <div 
        className="hidden sm:block absolute left-[-10%] bottom-0 w-[600px] sm:w-[50vw] lg:w-[600px] min-w-[200px] h-[70vh]"
      >
        <img 
          src={Road} 
          alt="Road Illustration" 
          className="w-full h-full object-cover origin-bottom-left scale-125" 
        />
      </div>

      <div className="absolute inset-0">
        {/* Kaka Image */}
        <div className="absolute sm:top-[30vh] top-[40vh] left-[5vw] w-[25vw] min-w-[200px] max-w-[400px] z-0">
          <img src={Kaka_enhanced} alt="Kaka Element" className="w-full h-auto object-contain" />
        </div>

        {/* Generate Button - Updated size and position for mobile */}
        <div className="absolute sm:top-[60vh] top-[70vh] left-1/2 -translate-x-1/2 w-auto">
          <button className="
            px-4 py-2
            md:px-6 md:py-3 
            bg-blue-500 text-white 
            text-lg sm:text-sm md:text-xl 
            font-semibold rounded-md shadow-lg 
            whitespace-nowrap hover:bg-blue-600 
            transition-colors
            sm:scale-100 scale-125
          ">
            GENERATE
          </button>
        </div>

        {/* Girl Image */}
        <div className="absolute sm:top-[30vh] top-[40vh] right-[-1vw] w-[30vw] min-w-[250px] max-w-[500px]">
          <img src={Girly_chan} alt="Girl" className="w-full h-auto object-contain" />
        </div>
      </div>

      {/* Clouds - Arranged in a row */}
      <div className="absolute bottom-[-1vh] left-[-1vw] w-[40vw] min-w-[200px] max-w-[368px]">
        <img src={Left_cloud} alt="Left Cloud Illustration" className="w-full h-auto object-contain" />
      </div>

      <div className="absolute bottom-[-2vh] left-[45%] -translate-x-1/2 w-[50vw] min-w-[300px] sm:min-w-[400px] max-w-[811px]">
        <img src={Center_cloud} alt="Center Cloud Illustration" className="w-full h-auto object-contain" />
      </div>

      <div className="absolute bottom-[-2vh] right-[-8vw] w-[50vw] min-w-[300px] max-w-[811px]">
        <img src={Right_cloud} alt="Right Cloud Illustration" className="w-full h-auto object-contain" />
      </div>

      {/* Flowers */}
      <div className="absolute bottom-[0] left-[-4vw] w-[20vw] min-w-[150px] max-w-[300px]">
        <img src={Left_flower} className="w-full h-auto object-contain" />
      </div>

      {/* Right Flower - Moved to bottom right corner */}
      <div className="absolute bottom-[-2vh] right-[-2vw] w-[20vw] min-w-[150px] max-w-[300px]">
        <img src={Right_flower} alt="Right Flower Illustration" className="w-full h-auto object-contain" />
      </div>
    </div>
  );
};

export default FrontPage;
