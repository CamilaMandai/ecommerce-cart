require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('calls fetch', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('calls fetch with endpoint', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('returns the object computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch.results);
  });
  it('returns an error if the function is empty', async () => {
    expect(await fetchProducts()).toEqual( new Error('You must provide an url'));
  })
});
