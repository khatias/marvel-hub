export const handlePrevSlide = (currentSlide, setCurrentSlide) => {
  if (currentSlide > 0) {
    setCurrentSlide(currentSlide - 1);
  }
};

export const handleNextSlide = (
  currentSlide,
  comicsLength,
  visibleSlides,
  setCurrentSlide
) => {
  if (currentSlide < comicsLength - visibleSlides) {
    setCurrentSlide(currentSlide + 1);
  }
};

export const calculateSlideTransform = (currentSlide) => {
  return { transform: `translateX(-${currentSlide * 100}%)` };
};
