const API_MERCADO_LIVRE = 'https://api.mercadolibre.com/';

export async function getCategories() {
  const response = await fetch(`${API_MERCADO_LIVRE}sites/MLB/categories`);
  const categories = await response.json();
  // console.log(categories);
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`${API_MERCADO_LIVRE}sites/MLB/search?category=
  ${categoryId}&q=${query}`);
  const products = await response.json();
  // console.log(products);
  return products;
}

export async function getProductById(categoryId) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const response = await fetch(`${API_MERCADO_LIVRE}sites/MLB/search?category=
  ${categoryId}`);
  const categories = await response.json();
  // console.log(categories);
  return categories;
}

export async function getProduct(id) {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
}
