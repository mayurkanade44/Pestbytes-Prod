import { useState, useEffect, useRef } from "react";
import temp from "../assets/ad.jpg";
import ad from "../assets/eppl.jpeg";
import { Link } from "react-router-dom";
import AdModal from "./modals/AdModal";

const featuredProducts = [
  { image: ad, link: "https://epcorn.com/" },
  { image: temp, link: "ad" },
];

let count = 0;
let slideInterval;

const AdSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

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

  const onClose = () => {
    setOpen(false);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  return (
    <>
      <div
        ref={slideRef}
        className="w-full my-8 select-none px-5 md:px-16"
      >
        <div className="aspect-w-16 aspect-h-9">
          {featuredProducts[currentIndex].link === "ad" ? (
            <span className="hover:cursor-pointer" onClick={() => setOpen(true)}>
              <img
                className="w-full h-40 md:h-80 border-2 border-gray-400"
                src={featuredProducts[currentIndex].image}
                alt="ad-banner"
              />
            </span>
          ) : (
            <a
              href={featuredProducts[currentIndex].link}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-full h-40 md:h-80 object-fit border-2 border-gray-400"
                src={featuredProducts[currentIndex].image}
                alt="ad-banner"
              />
            </a>
          )}
        </div>
      </div>
      <AdModal onClose={onClose} open={open} />
    </>
  );
};
export default AdSlider;
