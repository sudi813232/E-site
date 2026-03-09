const cart = [];

const cartList = document.querySelector(".cart-list");
const totalElement = document.querySelector(".cart-total");
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

const addButtons = document.querySelectorAll(".add-to-cart");
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
    cart.push({ name, price, image, quantity: 1 });
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


const foodItems = [
  { id: 1, name: "Pizza", price: 200, image: "image/pizza.png" },
  { id: 2, name: "Burger", price: 150, image: "image/burger.png" },
  { id: 3, name: "Sandwich", price: 100, image: "image/sandwich.png" },
  { id: 4, name: "Spaghetti", price: 167, image: "image/spaghetti.png" },
  { id: 5, name: "Extra Cheese Lasagna", price: 300, image: "image/lasagna.png" },

];

const cardList = document.querySelector(".card-list");

foodItems.forEach((item) => {
  const div = document.createElement("div");
  div.classList.add("order-card");
  div.innerHTML = `
    <div class="card-image">
      <img src="${item.image}" alt="${item.name}">
    </div>
    <h4>${item.name}</h4>
    <h4 class="price">$${item.price}</h4>
    <button class="btn">Add to cart</button>
  `;
  const button = div.querySelector(".btn");
  button.addEventListener("click", () => {
    console.log(item);
    addToCart(item.name, item.price, item.image);
    cartTab.classList.add("active");
  });
  cardList.appendChild(div);
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn--checkout").addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty! Add some food first 🍔");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("checkoutTotal").textContent = "$" + total.toFixed(2);
    document.getElementById("checkoutForm").style.display = "block";
    document.getElementById("successMessage").style.display = "none";
    document.getElementById("checkoutPopup").classList.add("checkout--active");
    document.getElementById("checkoutOverlay").classList.add("checkout-overlay--active");
  });
});

function placeOrder() {
  const name    = document.getElementById("userName").value.trim();
  const phone   = document.getElementById("userPhone").value.trim();
  const address = document.getElementById("userAddress").value.trim();
  const payment = document.getElementById("paymentMethod").value;
  if (!name || !phone || !address || !payment) {
    alert("Please fill in all fields! ");
    return;
  }
  document.getElementById("thankYouName").textContent    = name;
  document.getElementById("thankYouAddress").textContent = address;
  document.getElementById("thankYouPhone").textContent   = phone;
  document.getElementById("thankYouPayment").textContent = payment;
  document.getElementById("checkoutForm").style.display   = "none";
  document.getElementById("successMessage").style.display = "block";
  cart.length = 0;
  updateCart();
}

function closeCheckout() {
  document.getElementById("checkoutPopup").classList.remove("checkout--active");
  document.getElementById("checkoutOverlay").classList.remove("checkout-overlay--active");
  cartTab.classList.remove("active");
}
const cards = document.querySelectorAll(".card")
const observer = new IntersectionObserver(entries =>{
  console.log(entries);
})