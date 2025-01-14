import { useState, useEffect } from "react";

const useWindowResize = () => {
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const calculateVisibleSlides = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    calculateVisibleSlides();
    window.addEventListener("resize", calculateVisibleSlides);
    return () => window.removeEventListener("resize", calculateVisibleSlides);
  }, []);

  return visibleSlides;
};

export default useWindowResize;
