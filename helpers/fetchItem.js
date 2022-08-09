const fetchItem = async (itemID) => {
  const ENDPOINT = `https://api.mercadolibre.com/items/${itemID}`;
  try {
   const response = await fetch(ENDPOINT);
   const data = await response.json();
   return data;
  } catch (err) { return new Error('You must provide an url'); }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
