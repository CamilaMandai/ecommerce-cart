const saveCartItems = (item) => {
  localStorage.setItem('cartItems', JSON.stringify(item));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
