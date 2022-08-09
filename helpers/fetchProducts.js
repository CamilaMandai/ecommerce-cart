const fetchProducts = async (product) => {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  try {
  const response = await fetch(ENDPOINT);
  const { results } = await response.json();
  return results;
  } catch (err) { return new Error('You must provide an url'); }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
