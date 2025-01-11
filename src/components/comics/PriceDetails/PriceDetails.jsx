const PriceDetails = ({ prices }) => (
    <>
      {prices.map((price, index) => (
        <p key={index}>
          {price.type}: ${price.price}
        </p>
      ))}
    </>
  );
export default PriceDetails  