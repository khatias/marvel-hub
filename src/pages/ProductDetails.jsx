import React from "react";
import { useParams } from "react-router-dom";
import useFetchSingleEntity from "../hooks/useFetchSingleEntity";
import styles from "../styles/pages/ProductDetail.module.css";
import GoBackButton from "../components/buttons/GoBackButton/GoBackButton";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import CreatorsList from "../components/comics/CreatorList/CreatorList";
import CharactersList from "../components/comics/CharactersList/CharactersList";
import PriceDetails from "../components/comics/PriceDetails/PriceDetails";
import ComicsSlider from "../components/Sliders/ComicsSlider";
import { fetchComicsByTitle, getSingleProduct } from "../services/api";
import { HeartIcon } from "@heroicons/react/outline";
import { addToFavorites } from "../utils/favoritesUtils";
import NotFound from "../components/NotFound/NotFound";
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProductDetails = () => {
  const { id } = useParams();
  const {
    entity: comic,
    loading,
    error,
  } = useFetchSingleEntity(getSingleProduct, id);

  const groupedCreators = comic?.creators?.items?.reduce((acc, creator) => {
    if (!acc[creator.role]) {
      acc[creator.role] = [];
    }
    acc[creator.role].push(creator.name);
    return acc;
  }, {});

  if (loading) return <Loader />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;
  if (!comic) return  <NotFound/>;

  return (
    <div>
      <div className={styles.pageWrapper}>
        <div className={styles.backgroundContainer}>
          <div className={styles.backgroundImageWrapper}>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className={styles.bgImage}
            />
          </div>
          <div className={styles.comicContainer}>
            <div className={styles.imageContainer}>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                className={styles.comicImage}
              />
            </div>
            <div className={styles.contentContainer}>
              <h2 className={styles.comicTitle}>{comic.title}</h2>
              <h3 className={styles.publisDate}>
                <span>On Sale Date: </span>
                {formatDate(comic.dates[0].date)}
              </h3>

              <CreatorsList creators={groupedCreators} />
              <p className={styles.comicDescription}>{comic.description}</p>

              <CharactersList characters={comic.characters} />

              <PriceDetails prices={comic.prices} />
              <button
                className={styles.favoriteButton}
                onClick={() => addToFavorites(comic)}
              >
                <HeartIcon className={styles.icon} /> Add To Favorites
              </button>
              <GoBackButton />
            </div>
          </div>
        </div>
      </div>

      <ComicsSlider
        fetchComics={fetchComicsByTitle}
        title={comic.title.split("(")[0].trim()}
        SliderTitle={`Explore the World of ${comic.title.split("(")[0].trim()}`}
      />
    </div>
  );
};

export default ProductDetails;
