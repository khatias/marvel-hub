import md5 from "md5";

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

const generateHash = (ts) => md5(ts + privateKey + publicKey).toString();

export const getProducts = async () => {
  const ts = Date.now();
  const hash = generateHash(ts);
  const BASE_URL = `https://gateway.marvel.com:443/v1/public/comics?limit=5&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch products.");
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getSingleProduct = async (id) => {
  const ts = Date.now();
  const hash = generateHash(ts);
  const SINGLE_URL = `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(SINGLE_URL);
    if (!response.ok) throw new Error(`Failed to fetch product with id: ${id}`);
    const data = await response.json();
    console.log(data);
    return data; // Ensure data is returned
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null; // Return null in case of error
  }
};
