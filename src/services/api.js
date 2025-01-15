import md5 from "md5";

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

const generateHash = (ts) => md5(ts + privateKey + publicKey).toString();

export const getProducts = async (offset = 0) => {
  const ts = Date.now();
  const hash = generateHash(ts);
  const BASE_URL = `https://gateway.marvel.com:443/v1/public/comics?limit=20&hasDigitalIssue=false&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch products.");
    const data = await response.json();

    const filteredData = data.data.results.filter(
      (product) =>
        product.thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    );

    console.log(filteredData);
    return { ...data, data: { ...data.data, results: filteredData } };
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
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};

export const fetchComicsByTitle = async (title) => {
  const ts = Date.now();
  const hash = generateHash(ts);
  const BASE_URL = `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${encodeURIComponent(
    title
  )}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch related comics.");
    const data = await response.json();

    const filteredComics = data.data.results.filter(
      (comic) =>
        comic.thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    );

    return filteredComics;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
};

export const getCharacters = async (offset = 0) => {
  const ts = Date.now();
  const hash = generateHash(ts);
  const BASE_URL = `https://gateway.marvel.com:443/v1/public/characters?limit=20&orderBy=name&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch products.");
    const data = await response.json();

    const filteredData = data.data.results.filter(
      (product) =>
        product.thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    );

    console.log(filteredData);
    return { ...data, data: { ...data.data, results: filteredData } };
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getSingleCharacter = async (id) => {
  const ts = Date.now();
  const hash = generateHash(ts);
  const SINGLE_CHARACTER = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(SINGLE_CHARACTER);
    if (!response.ok) throw new Error(`Failed to fetch product with id: ${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
};


export const fetchComicsByCharacter = async (characterId) => {
  const ts = Date.now();
  const hash = generateHash(ts);
  const BASE_URL = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;


  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch related comics.");
    const data = await response.json();

    const filteredComics = data.data.results.filter(
      (comic) =>
        comic.thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    );

    return filteredComics;
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error;
  }
};