import React from "react";
import { useNavigate } from "react-router-dom";
const GoBackButton = () => {
  const navigate = useNavigate();

  return <button className="loadmore-button" onClick={() => navigate(-1)}>Go Back</button>;
};

export default GoBackButton;
