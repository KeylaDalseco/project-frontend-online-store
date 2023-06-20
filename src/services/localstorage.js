if (!JSON.parse(localStorage.getItem('PRODUCT_CART'))) {
  localStorage.setItem('PRODUCT_CART', JSON.stringify([]));
}
export const selectProduct = () => JSON.parse(localStorage.getItem('PRODUCT_CART') || []);

const saveProducts = async (favoriteSongs) => localStorage
  .setItem('PRODUCT_CART', JSON.stringify(favoriteSongs));

export const addProduct = async (product) => {
  if (product) {
    const products = selectProduct();
    saveProducts([...products, product]);
  }
};
