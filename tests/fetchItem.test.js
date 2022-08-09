require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('is a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('calls fetch', async() => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('call fetch with the right endpoint', async() => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('returns an object equal to "item"', async() => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('returns an error if the function is empty', async () => {
    await expect(async () => await fetchItem()).toThrow(new Error('You must provide an url'));
  });
});
