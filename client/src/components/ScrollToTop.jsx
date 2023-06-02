import { useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="fixed right-5 bottom-5 md:bottom-10">
      <button className="relative  rounded-full border-2 bg-white border-black " onClick={scroll}>
        <BiUpArrowAlt className="w-8 h-8 text-blue-600" />
      </button>
    </div>
  );
};
export default ScrollToTop;
