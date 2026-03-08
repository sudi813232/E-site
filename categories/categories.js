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

