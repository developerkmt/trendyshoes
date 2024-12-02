const itemsContainer = document.getElementById("items");
const searchInput = document.getElementById("search");
const filters = document.querySelectorAll(".filter");
const priceCheckboxes = document.querySelectorAll("input[name='prange']");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPriceElement = document.getElementById("total-price");

let cart = [];

// Filter items based on search, category, and price
function filterItems() {
  const keyword = searchInput.value.toLowerCase();
  const selectedCategory = document.querySelector(".filter.active").id;
  const selectedPrices = Array.from(priceCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  document.querySelectorAll(".item").forEach((item) => {
    const title = item.querySelector("h3").textContent.toLowerCase();
    const price = parseFloat(item.getAttribute("data-price"));
    const category = item.getAttribute("data-category");

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesPrice =
      !selectedPrices.length ||
      selectedPrices.some((range) => {
        const [min, max] =
          range === "100+" ? [100, Infinity] : range.split("-").map(Number);
        return price >= min && price <= max;
      });
    const matchesKeyword = title.includes(keyword);

    item.style.display =
      matchesCategory && matchesPrice && matchesKeyword ? "block" : "none";
  });
}

// Event listeners for filters
filters.forEach((filter) =>
  filter.addEventListener("click", function () {
    filters.forEach((f) => f.classList.remove("active"));
    this.classList.add("active");
    filterItems();
  })
);

priceCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", filterItems)
);

searchInput.addEventListener("input", filterItems);

// Add item to the cart
function addToCart(itemName, price) {
  const existingItem = cart.find((item) => item.itemName === itemName);

  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity for existing item
  } else {
    cart.push({ itemName, price, quantity: 1 }); // Add new item with quantity 1
  }

  updateCart();
}

// Update cart display and total
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `<span>${item.itemName} (x${item.quantity})</span><span>Ksh${(
      item.price * item.quantity
    ).toFixed(2)}</span>`;
    cartItemsContainer.appendChild(cartItem);
  });

  cartCount.textContent = `(${cart.length})`;
  totalPriceElement.textContent = `Total: Ksh${totalPrice.toFixed(2)}`;
}

// Checkout cart
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Checkout successful!");
    cart = [];
    updateCart();
  }
}

// Add event listeners for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".item");
    const itemName = item.querySelector("h3").textContent;
    const price = parseFloat(item.getAttribute("data-price"));

    if (!isNaN(price)) {
      addToCart(itemName, price);
    } else {
      console.error("Invalid price for item:", itemName);
    }
  });
});
