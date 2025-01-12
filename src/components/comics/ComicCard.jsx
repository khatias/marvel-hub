import React from "react";
import "./ComicCard.css";
import { Link } from "react-router-dom";

const ComicCard = ({ product, onViewDetail }) => {
  return (
    <div className="comic-card">
      <Link to={`/products/${product.id}`} className="comic-card-link">
        <div className="image-container">
          <img
            src={`${product.thumbnail.path}.${product.thumbnail.extension}`}
            alt={product.title}
            className="comic-card-image"
          />
        </div>
        <div className="comic-card-content">
          <p>{product.title}</p>

          {product.prices && product.prices.length > 0 ? (
            <ul>
              {product.prices.map((price, priceIndex) => (
                <li key={priceIndex}>
                  <strong>{price.type}:</strong> ${price.price || 5}
                </li>
              ))}
            </ul>
          ) : (
            <p>No price information available</p>
          )}
        </div>
      </Link>
      <button onClick={() => onViewDetail(product.id)}>View Details</button>
    </div>
  );
};

export default ComicCard;
