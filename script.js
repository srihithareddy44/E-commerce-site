// Redirect if not logged in
if (!localStorage.getItem('user') && location.pathname !== '/login.html') {
  window.location.href = 'login.html';
}

function logout() {
  localStorage.removeItem('user');
  location.href = 'login.html';
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

// Render products
if (document.getElementById("product-list")) {
  const container = document.getElementById("product-list");
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img loading="lazy" src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
  updateCartCount();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
  alert("Added to cart!");
}

if (document.getElementById("cart-items")) {
  const container = document.getElementById("cart-items");
  const cart = getCart();
  let total = 0;

  cart.forEach(item => {
    total += item.qty * item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>$${item.price} × ${item.qty}</p>
    `;
    container.appendChild(div);
  });

  document.getElementById("total-amount").textContent = total.toFixed(2);
}

function checkout() {
  alert("Thanks for your purchase!");
  localStorage.removeItem("cart");
  window.location.href = 'index.html';
}
