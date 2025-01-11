import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import styles from "../styles/pages/ProductDetail.module.css";
import GoBackButton from "../components/buttons/GoBackButton/GoBackButton";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import CreatorsList from "../components/comics/CreatorList/CreatorList";
import CharactersList from "../components/comics/CharactersList/CharactersList";
import PriceDetails from "../components/comics/PriceDetails/PriceDetails";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProductDetails = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSingleProduct(id);
        setComic(data?.data?.results?.[0] || null);
      } catch (error) {
        setError("Failed to load product details. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

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
  if (!comic) return <p>No comic found.</p>;

  return (
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
              {" "}
              <span>Publish Date: </span>
              {formatDate(comic.dates[0].date)}
            </h3>

            <CreatorsList creators={groupedCreators} />
            <p className={styles.comicDescription}>{comic.description}</p>

            <CharactersList characters={comic.characters} />

            <PriceDetails prices={comic.prices} />
            <GoBackButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
