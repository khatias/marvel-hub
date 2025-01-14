export const addToFavorites = (product) => {
  localStorage.setItem(`favorites:${product.id}`, JSON.stringify(product));
};

export const removeFromFavorites = (product) => {
  localStorage.removeItem(`favorites:${product.id}`);
};