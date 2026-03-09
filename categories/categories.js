const categories = [
  { id: 1, name: "Pizza", price: 200, image: "../image/pizza.png" },
  { id: 2, name: "Burger", price: 150, image: "../image/burger.png" },
  { id: 3, name: "Sandwich", price: 100, image: "../image/sandwich.png" },
  { id: 4, name: "Spaghetti", price: 167, image: "../image/spaghetti.png" },
  { id: 5, name: "Extra Cheese Lasagna", price: 300, image: "../image/lasagna.png" },
  { id: 6, name:"Sushi" , price : 250, image:"../image/sushi.png" },
  { id: 7, name:"Fried Chicken" , price : 620, image:"../image/chicken.png" },
  

];
const categoriesList = document.querySelector(".categories__list");

categories.forEach((item) => {

  const card = document.createElement("div");
  card.classList.add("categories__card");

  card.innerHTML = `
    <div class="categories__image">
      <img src="${item.image}" alt="${item.name}">
    </div>
    <h4 class="categories__title">${item.name}</h4>
    <p class="categories__price">$${item.price}</p>
    <button class="btn add-to-cart"
      data-name="${item.name}"
      data-price="${item.price}"
      data-image="${item.image}">
      Add to cart
    </button>
  `;

  categoriesList.appendChild(card);
    const button = card.querySelector(".btn");
  button.addEventListener("click", () => {
    console.log(item);
    addToCart(item.name, item.price, item.image);
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

