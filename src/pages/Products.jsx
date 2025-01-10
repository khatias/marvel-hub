import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data?.data?.results || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleProductDetailClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      <h2>Marvel Comics</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "20px" }}>
            <div>
              <strong>Title:</strong> {product.title}
            </div>
            <div>
              <strong>ID:</strong> {product.id}
            </div>
            <button
              onClick={() => handleProductDetailClick(product.id)}
              style={{ marginTop: "10px", cursor: "pointer" }}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
