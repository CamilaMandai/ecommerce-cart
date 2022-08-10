let savedItems = JSON.parse(getSavedCartItems('cartItems'));
const cartItems = document.getElementsByClassName('cart__items')[0];
const emptyCart = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');

const calculaTotal = async () => {
    // let total = 0;
    const items = JSON.parse(getSavedCartItems('cartItems'));
    const total = await items.reduce(async (acc, curr) => { // https://zellwk.com/blog/async-await-in-loops/
      const { sku } = curr;
      const item = await fetchItem(sku);
      const sum = await acc;
      return sum + item.price;
    }, 0);
    // for (let index = 0; index < items.length; index += 1) {
    //   const { sku } = items[index];
    //   // const item = await fetchItem(sku);
    //   const item = await fetchItem(sku);
    //     total += item.price;
    // }
    totalPrice.innerText = `${total}`;
  };

const clearAll = () => {
  localStorage.clear();
  savedItems = [];
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }
  totalPrice.innerText = 0;
};

emptyCart.addEventListener('click', clearAll);

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

const loadingProduct = (n) => {
  const itemsSection = document.getElementsByClassName('items')[0];
  for (let times = 0; times < n; times += 1) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'loading', 'carregando...'));
  itemsSection.append(section);
  }
};

const endLoadingProduct = () => {
  const itemsSection = document.getElementsByClassName('items')[0];
  while (itemsSection.firstChild) {
    itemsSection.removeChild(itemsSection.firstChild);
  }
};

const listProducts = async () => {
  loadingProduct(8);
  const result = await fetchProducts('computador');
  endLoadingProduct();
  const itemsSection = document.getElementsByClassName('items')[0];
  result.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const productElements = createProductItemElement({ sku, name, image });
    itemsSection.appendChild(productElements);
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = async (event) => {
  const item = event.target;
  const sku = item.innerText.split(' ')[1];
  const indexRemove = savedItems.map((element, index) => {
    if (element.sku === sku) {
      return index;
    }
    return undefined;
  }).find((element) => element !== undefined);
  // console.log(indexRemove)
  savedItems.splice(indexRemove, 1);
  saveCartItems(savedItems);
  item.remove();
  await calculaTotal();
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
  // localItems = JSON.parse(getSavedCartItems('cartItems'));
  savedItems.push(item);
  saveCartItems(savedItems);
};

const addItem = async () => {
  const buttons = document.getElementsByClassName('item__add');
  for (let i = 0; i < buttons.length; i += 1) {
    // savedItems = JSON.parse(getSavedCartItems('cartItems'));
    const itemId = buttons[i].parentElement.firstChild.innerText;
    buttons[i].addEventListener('click', async () => {
      const results = await fetchById(itemId);
      const { id: sku, title: name, price: salePrice } = results;
      const productCart = createCartItemElement({ sku, name, salePrice });
      cartItems.appendChild(productCart);
      pushAndSaveItem({ sku, name, salePrice });
      await calculaTotal();
    });
  }
};

const addSavedItems = async () => {
  if (!savedItems) {
    savedItems = [];
  } else {
    savedItems.forEach((element) => {
      const { sku, name, salePrice } = element;
      const productCart = createCartItemElement({ sku, name, salePrice });
      cartItems.appendChild(productCart);
    });
    await calculaTotal();
  }
};

window.onload = async () => {
  await listProducts();
  addSavedItems();
  addItem();
  await calculaTotal();
};
