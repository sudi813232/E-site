const cart = [];


const cartTab = document.getElementById("cartTab");
const cartListEl = document.getElementById("cartList");
const cartTotalEl = document.getElementById("cartTotal");
const cartIcon = document.getElementById("cartIcon");
const closeBtn = document.getElementById("closeBtn");
const cartBadge = document.getElementById("cartBadge");
const checkoutBtn = document.getElementById("checkoutBtn");
cartIcon.addEventListener("click", () => {
  cartTab.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("active");
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
  cartListEl.innerHTML = "";
  let total = 0;
  let totalItems = 0;
  if (cart.length === 0) {
    cartListEl.innerHTML = `
      <p style="color:rgba(255,255,255,0.5);
                text-align:center;
                margin-top:30px;">
        Cart is empty 🍽️
      </p>`;
  }
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

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
    cartListEl.appendChild(div);
  });
  cartTotalEl.textContent = "$" + total.toFixed(2);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? "flex" : "none";
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

const pizzaItems = [
  { name: "Veg Pizza", price: 180, image: "../image/pizza.png" },
  { name: "Chicken Pizza", price: 220, image: "../image/pizza.png" },
  { name: "Paneer Tandoori Pizza", price: 250, image: "../image/pizza.png" },
  { name: "Margherita Pizza", price: 200, image: "../image/pizza.png" },
];

const pizzaGrid = document.getElementById("pizzaGrid");

pizzaItems.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("food-card");
  card.innerHTML = `
    <div class="food-card-image">
      <img src="${item.image}" alt="${item.name}">
    </div>
    <p class="food-card-name">${item.name}</p>
    <p class="food-card-price">$${item.price}</p>
    <button class="food-card-btn">Add to Cart</button>
  `;

  card.querySelector(".food-card-btn").addEventListener("click", () => {
    addToCart(item.name, item.price, item.image);
    cartTab.classList.add("active");
  });
  pizzaGrid.appendChild(card);
});
checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty! Add some food first 🍕");
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("checkoutTotal").textContent = "$" + total.toFixed(2);
  document.getElementById("checkoutForm").style.display = "block";
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("checkoutPopup").classList.add("checkout-box-open");
  document.getElementById("checkoutOverlay").classList.add("checkout-background-open");
});

function placeOrder() {
  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("userPhone").value.trim();
  const address = document.getElementById("userAddress").value.trim();
  const payment = document.getElementById("paymentMethod").value;
  if (!name || !phone || !address || !payment) {
    alert("Please fill in all fields!");
    return;
  }

  document.getElementById("thankYouName").textContent = name;
  document.getElementById("thankYouAddress").textContent = address;
  document.getElementById("thankYouPhone").textContent = phone;
  document.getElementById("thankYouPayment").textContent = payment;


  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("successMessage").style.display = "block";

  cart.length = 0;
  updateCart();
}

function closeCheckout() {
  document.getElementById("checkoutPopup").classList.remove("checkout-box-open");
  document.getElementById("checkoutOverlay").classList.remove("checkout-background-open");
  cartTab.classList.remove("active");
}