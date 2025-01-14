import React, { useState, useEffect } from "react";
import styles from "../styles/pages/Favorites.module.css";
import { useNavigate } from "react-router-dom";
import { removeFromFavorites } from "../utils/favoritesUtils";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const handleProductDetailClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleRemoveFavorite = (product) => {
    removeFromFavorites(product);

    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== product.id)
    );
  };

  useEffect(() => {
    const storedFavorites = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("favorites:")) {
        const item = localStorage.getItem(key);
        if (item) {
          storedFavorites.push(JSON.parse(item));
        }
      }
    }
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className={styles.favoritesWrapper}>
      <div className={styles.favoriteList}>
        {favorites.length === 0 ? (
          <p>No favorites added yet</p>
        ) : (
          favorites.map((favorite, index) => (
            <div key={favorite.id || index} className={styles.favoriteItem}>
              <img
                src={`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`}
                alt={favorite.title}
                className={styles.favoriteImage}
              />
              <div className={styles.cardContent}>
                <p>{favorite.title}</p>
                {favorite.prices && favorite.prices.length > 0 ? (
                  <ul>
                    {favorite.prices.map((price, priceIndex) => (
                      <li key={priceIndex}>
                        <strong>{price.type}:</strong> ${price.price || 5}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No price information available</p>
                )}
              </div>
              <div className={styles.favoritesButtons}>
                <button onClick={() => handleProductDetailClick(favorite.id)}>
                  View Details
                </button>
                <button onClick={() => handleRemoveFavorite(favorite)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
