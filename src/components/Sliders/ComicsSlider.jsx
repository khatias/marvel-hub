import "./ComicsSlider.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../Loader/SmallLoader";
import useFetchComics from "../../hooks/useFetchRelatedComics";
import useWindowResize from "../../hooks/useWindowResize";

const ComicsSlider = ({ fetchComics, title, characterId, SliderTitle }) => {
  const { comics, loading, error } = useFetchComics(
    fetchComics,
    title,
    characterId
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleSlides = useWindowResize();
  const navigate = useNavigate();

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < comics.length - visibleSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  if (loading) return <SmallLoader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="slider-wrapper">
      <div className="container slider-container">
        <h2 className="slider-title">{SliderTitle}</h2>
        <div className="slider">
          {comics.map((comic) => (
            <div
              key={comic.id}
              className="slide"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <Link to={`/products/${comic.id}`} className="comic-title">
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="slide-image"
                />
                <p className="comic-title">{comic.title}</p>
              </Link>
              <button
                className="see-detail"
                onClick={() => navigate(`/products/${comic.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {comics.length > visibleSlides && (
          <div className="slider-controls">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="slider-button prev"
            >
              <ChevronLeftIcon className="icon" />
            </button>
            <button
              onClick={handleNextSlide}
              disabled={currentSlide === comics.length - visibleSlides}
              className="slider-button next"
            >
              <ChevronRightIcon className="icon" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicsSlider;
