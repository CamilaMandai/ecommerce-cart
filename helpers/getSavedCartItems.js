const getSavedCartItems = (key) => localStorage.getItem(key);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
