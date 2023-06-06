import { useState, useEffect, useRef } from "react";
import temp1 from "../assets/ad1.jpg";
import ad from "../assets/eppl.jpg";

const featuredProducts = [ad, temp1];

let count = 0;
let slideInterval;

const AdSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };
  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  return (
    <div ref={slideRef} className="w-full mt-4 mb-6 select-none px-5 md:px-16">
      <div className="aspect-w-16 aspect-h-9">
        <img
          className="w-full h-40 md:h-80 object-fit border-2 border-gray-200"
          src={featuredProducts[currentIndex]}
          alt=""
        />
      </div>
    </div>
  );
};
export default AdSlider;
