import React from "react";
import '../CustomButton.css'
const LoadMoreButton = ({ onClick, isLoading }) => {
  return (
    <button className="loadmore-button"
      onClick={onClick}
      disabled={isLoading}
      style={{
        marginTop: "20px",
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
    >
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
};

export default LoadMoreButton;
