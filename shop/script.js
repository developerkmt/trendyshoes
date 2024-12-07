// HTML element references
const itemsContainer = document.getElementById("items");
const searchInput = document.getElementById("search");
const filters = document.querySelectorAll(".filter");
const priceCheckboxes = document.querySelectorAll("input[name='prange']");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPriceElement = document.getElementById("total-price");

let cart = [];

// Function to filter items based on search, category, and price
function filterItems() {
  const keyword = searchInput.value.toLowerCase();
  const selectedCategory = document.querySelector(".filter.active")?.id || "all";
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

// Event listeners for filters and search
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

// Function to add an item to the cart
function addToCart(itemName, price) {
  const existingItem = cart.find((item) => item.itemName === itemName);

  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity for the existing item
  } else {
    cart.push({ itemName, price, quantity: 1 }); // Add a new item with quantity 1
  }

  updateCart(); // Update cart display and total
}

// Function to update the cart display and total
function updateCart() {
  cartItemsContainer.innerHTML = ""; // Clear the cart display
  let totalPrice = 0; // Initialize total price

  cart.forEach((item) => {
    const itemTotalPrice = item.price * item.quantity;
    totalPrice += itemTotalPrice;

    // Create and append a cart item element
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `<span>${item.itemName} (x${item.quantity})</span>
                          <span>Ksh${itemTotalPrice.toFixed(2)}</span>`;
    cartItemsContainer.appendChild(cartItem);
  });

  // Update cart count and total price display
  cartCount.textContent = `(${cart.length} items)`;
  totalPriceElement.textContent = `Total: Ksh${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
}

// Function to handle checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert(`Pay total amount to M-PESA Buy Goods Till Number: 8935534 Total: Ksh${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);
    cart = []; // Clear the cart
    updateCart(); // Refresh the cart display
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
