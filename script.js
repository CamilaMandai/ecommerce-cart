let savedItems = JSON.parse(getSavedCartItems('cartItems'));
const cartItems = document.getElementsByClassName('cart__items')[0];
const emptyCart = document.querySelector('.empty-cart');

emptyCart.addEventListener('click', () => {
  localStorage.clear();
  // window.location.reload();
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }
});

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const listProducts = async () => {
  const result = await fetchProducts('computador');
  const itemsSection = document.getElementsByClassName('items')[0];
  result.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const productElements = createProductItemElement({ sku, name, image });
    itemsSection.appendChild(productElements);
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const item = event.target;
  item.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const fetchById = (id) => fetchItem(id);

const pushAndSaveItem = (item) => {
  savedItems.push(item);
  saveCartItems(savedItems);
};

const addItem = () => {
  const buttons = document.getElementsByClassName('item__add');
  for (let i = 0; i < buttons.length; i += 1) {
    const itemId = buttons[i].parentElement.firstChild.innerText;
    buttons[i].addEventListener('click', async () => {
      const results = await fetchById(itemId);
      const { id: sku, title: name, price: salePrice } = results;
      const productCart = createCartItemElement({ sku, name, salePrice });
      cartItems.appendChild(productCart);
      pushAndSaveItem({ sku, name, salePrice });
    });
  }
};

const addSavedItems = () => {
  // const [temp] = savedItems;
  if (!savedItems) {
    savedItems = [];
  } else {
    savedItems.forEach((element) => {
    const { sku, name, salePrice } = element;
    const productCart = createCartItemElement({ sku, name, salePrice });
    cartItems.appendChild(productCart);
    });
  }
};

window.onload = async () => {
  await listProducts();
  addSavedItems();
  addItem();
};
