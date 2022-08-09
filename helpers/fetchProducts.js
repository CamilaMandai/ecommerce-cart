const fetchProducts = async (product) => {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response  = await fetch(ENDPOINT);
  const {results} = await response.json();
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
