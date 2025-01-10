import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const data = await getSingleProduct(id);
        setProduct(data?.data?.results?.[0] || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>Marvel Comics</h2>
      <ul>
        <li>
          <strong>Title:</strong> {product.title}
        </li>
        <li>
          <strong>ID:</strong> {product.id}
        </li>
        <li>
          <strong>Description:</strong>{" "}
          {product.description || "No description available"}
        </li>
      </ul>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default ProductDetails;
