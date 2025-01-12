import "./ComicsSlider.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../Loader/SmallLoader";

const ComicsSlider = ({ fetchComics, title, characterId, SliderTitle }) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedComics = async () => {
      setLoading(true);
      setError(null);
      try {
        const comicsData = await fetchComics(title || characterId);
        setComics(comicsData);
      } catch (err) {
        setError("Failed to load related comics.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedComics();
  }, [fetchComics, title, characterId]);

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
      <div className="slider-container">
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
