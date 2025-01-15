import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ComicCard from "../components/comics/ComicCard";
import styles from "../styles/pages/Product.module.css";
import LoadMoreButton from "../components/buttons/LoadMoreButton/LoadMoreButton";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import useSearch from "../hooks/useSearch";
import useFetchData from "../hooks/useFetchData";
import { getProducts } from "../services/api";

const Products = () => {
  const [offset, setOffset] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const { data: products, loading, error } = useFetchData(getProducts, offset, );
  const filteredProducts = useSearch(products, searchTerm, "title");
  const navigate = useNavigate();

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setOffset((prevOffset) => prevOffset + 5);
  };

  useEffect(() => {
    if (!loading && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [loading, isLoadingMore]);

  if (loading && products.length === 0) return <Loader />;
  if (error)
    return <Error message={error} onRetry={() => window.location.reload()} />;

  const handleProductDetailClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <main>
      <div className={styles.productContainer}>
        {filteredProducts.map((product, index) => (
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
