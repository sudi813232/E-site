const cart = [];
const cartTab = document.querySelector(".cart-tab");
const cartList = document.querySelector(".cart-list");
const totalElement = document.querySelector(".cart-total");
const cartIcon = document.querySelector(".nav__cart");
const closeBtn = document.querySelector(".close-btn");

cartIcon.addEventListener("click", () => {
  cartTab.classList.add("active");
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
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

const categories = [
  {
    id: 1,
    name: "Pizza",
    image: "../image/pizza.png",
    subItems: [
      { name: "Veg Pizza",             price: 180, image: "../image/pizza.png" },
      { name: "Chicken Pizza",         price: 220, image: "../image/pizza.png" },
      { name: "Paneer Tandoori Pizza", price: 250, image: "../image/pizza.png" },
    ]
  },
  {
    id: 2,
    name: "Burger",
    image: "../image/burger.png",
    subItems: [
      { name: "Veg Burger",     price: 120, image: "../image/burger.png" },
      { name: "Chicken Burger", price: 150, image: "../image/burger.png" },
      { name: "Double Patty",   price: 180, image: "../image/burger.png" },
    ]
  },
  // {
  //   id: 3,
  //   name: "Sandwich",
  //   image: "../image/sandwich.png",
  //   subItems: [
  //     { name: "Veg Sandwich",     price: 80,  image: "../image/sandwich.png" },
  //     { name: "Chicken Sandwich", price: 110, image: "../image/sandwich.png" },
  //   ]
  // },
  // {
  //   id: 4,
  //   name: "Spaghetti",
  //   image: "../image/spaghetti.png",
  //   subItems: [
  //     { name: "Classic Spaghetti",   price: 167, image: "../image/spaghetti.png" },
  //     { name: "Spaghetti Bolognese", price: 200, image: "../image/spaghetti.png" },
  //   ]
  // },
  // {
  //   id: 5,
  //   name: "Lasagna",
  //   image: "../image/lasagna.png",
  //   subItems: [
  //     { name: "Extra Cheese Lasagna", price: 300, image: "../image/lasagna.png" },
  //     { name: "Chicken Lasagna",      price: 320, image: "../image/lasagna.png" },
  //   ]
  // },
  // {
  //   id: 6,
  //   name: "Sushi",
  //   image: "../image/sushi.png",
  //   subItems: [
  //     { name: "Salmon Sushi", price: 250, image: "../image/sushi.png" },
  //     { name: "Tuna Sushi",   price: 270, image: "../image/sushi.png" },
  //     { name: "Veg Sushi",    price: 200, image: "../image/sushi.png" },
  //   ]
  // },
  {
    id: 7,
    name: "Fried Chicken",
    image: "../image/chicken.png",
    subItems: [
      { name: "Crispy Fried Chicken", price: 620, image: "../image/chicken.png" },
      { name: "Spicy Chicken",        price: 650, image: "../image/chicken.png" },
    ]
  },
];

const categoriesList = document.querySelector(".categories__list");

categories.forEach((category) => {

  const card = document.createElement("div");
  card.classList.add("categories__card");

  card.innerHTML = `
    <div class="categories__image">
      <img src="${category.image}" alt="${category.name}">
    </div>
    <h4 class="categories__title">${category.name}</h4>
    <p class="categories__hint">Click to see options ▾</p>
    <div class="categories__subitems" id="sub-${category.id}">
      ${category.subItems.map(sub => `
        <div class="categories__subitem">
          <span class="categories__subitem-name">${sub.name}</span>
          <span class="categories__subitem-price">$${sub.price}</span>
          <button class="categories__subitem-btn"
            data-name="${sub.name}"
            data-price="${sub.price}"
            data-image="${sub.image}">
            + Add
          </button>
        </div>
      `).join("")}
    </div>
  `;

  categoriesList.appendChild(card);
  card.addEventListener("click", function (e) {
    if (e.target.classList.contains("categories__subitem-btn")) return;

    const subList = document.getElementById(`sub-${category.id}`);
    subList.classList.toggle("categories__subitems--open");

    const hint = card.querySelector(".categories__hint");
    hint.textContent = subList.classList.contains("categories__subitems--open")
      ? "Click to close ▴"
      : "Click to see options ▾";
  });

  card.querySelectorAll(".categories__subitem-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(button.dataset.name, parseFloat(button.dataset.price), button.dataset.image);
      cartTab.classList.add("active");
    });
  });

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
    alert("Please fill in all fields!");
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