import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import ComicCard from "../components/comics/ComicCard";
import styles from "../styles/pages/Product.module.css";
import LoadMoreButton from "../components/buttons/LoadMoreButton/LoadMoreButton";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(offset);
        setProducts((prevProducts) => [
          ...prevProducts,
          ...(data?.data?.results || []),
        ]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchProducts();
  }, [offset]);

  if (loading && products.length === 0)  return <Loader />;
 
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

  const handleProductDetailClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setOffset((prevOffset) => prevOffset + 20);
  };

  return (
    <main>
      <div className={styles.productContainer}>
        {products.map((product, index) => (
          <ComicCard
            key={index}
            product={product}
            onViewDetail={handleProductDetailClick}
          />
        ))}
      </div>
      <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} />
    </main>
  );
};

export default Products;
