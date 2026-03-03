const cartsItem= []
const cart = [];

const cartList = document.querySelector(".cart-list");
const totalElement = document.querySelector(".cart-total");
const addButtons = document.querySelectorAll(".add-to-cart");
const cartTab = document.querySelector(".cart-tab");
const cartIcon = document.querySelector(".nav__cart");
const closeBtn = document.querySelector(".close-btn");


cartIcon.addEventListener("click", () => {
  cartTab.classList.add("active");
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.remove("active");
});
addButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const image = button.dataset.image;

    addToCart(name, price, image);
    cartTab.classList.add("active");
  });
});
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  updateCart();
}
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      </div>
      <div class="quantity">
        <button onclick="decrease(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increase(${index})">+</button>
      </div>
    `;

    cartList.appendChild(div);
  });

  totalElement.textContent = "$" + total.toFixed(2);
}
function increase(index) {
  cart[index].quantity++;
  updateCart();
}

function decrease(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

const foodItem=[{
id:1,
name:'Pizza',
price:'200',
image:'image/pizza.png'
},
{
  id:2,
  name:'Burger',
  price:'150',
  image:'image/burger.png'
},
{
  id:3,
  name:'Sandwich',
  price:'100',
  image:'image/sandwich.png'

},
{
  id:4,
  name:'Spaghetti',
  price:'167',
  image:'image/spaghetti.png'
},
{
  id:5,
  name:'Extra Cheese lasagna',
  price:'300',
  image:'image/lasagna.png'
}]

const cardList = document.querySelector(".card-list");
foodItem.forEach((item, index) => {
const div = document.createElement("div");
  div.classList.add("order-card");
  div.innerHTML = `
    <div class="card-image">
      <img src="${item.image}" alt="${item.name}">
    </div>
    <h4>${item.name}</h4>
    <h4 class="price">$${item.price}</h4>
    

  <button class="btn">
  Add to cart </button>
  `;

const btn = document.querySelector(".btn");




  const button = div.querySelector(".btn");

  button.addEventListener("click", function () {
    addToCart(item);
  });
 
 
  
  cardList.appendChild(div);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartListContainer = document.querySelector(".cart-list");
const totalElement = document.querySelector(".cart-total");
const cartTab = document.querySelector(".cart-tab");
const cartIcon = document.querySelector(".nav__cart");
const closeBtn = document.querySelector(".close-btn");

cartIcon.addEventListener("click", () => {
  cartTab.classList.add("active");
});

closeBtn.addEventListener("click", (e) => {
  console.log(cartTab);
  e.preventDefault();
  cartTab.classList.remove("active");
});

function addToCart(item) {

// alert("too much");

 
    cartsItem.push(item);
  console.log(cartsItem);

  localStorage.setItem("cart", JSON.stringify(cartsItem));
  showCart();
}

function showCart() {

  cartListContainer.innerHTML = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {

    total += cart[i].price * cart[i].quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${cart[i].image}" width="60">
      <h4>${cart[i].name}</h4>
      <p>Price: ${cart[i].price}</p>
      
      <hr>
    `;
    

    cartListContainer.appendChild(div);
  }

  totalElement.textContent = "$" + total;
}
showCart();

});