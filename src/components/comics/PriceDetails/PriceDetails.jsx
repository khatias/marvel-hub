import styles from "../../../styles/pages/ProductDetail.module.css";
const PriceDetails = ({ prices }) => {
  const formatLabel = (type) => {
    switch (type) {
      case "printPrice":
        return "Print Price";
      case "digitalPurchasePrice":
        return "Digital Purchase Price";
      default:
        return type;
    }
  };

  return (
    <>
      {prices.map((price, index) => (
        <p key={index} className={styles.price}>
          <span className={styles.priceType}>{formatLabel(price.type)}</span>: $
          {price.price === 0 ? 5 : price.price.toFixed(2)}
        </p>
      ))}
    </>
  );
};

export default PriceDetails;
