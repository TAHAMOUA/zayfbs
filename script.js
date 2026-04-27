// Produits

const products = [
  {
    id: 1,
    name: "Huile d'Olive Extra Vierge 250ml",
    price: 35,
    image: "image/250ml.png",
  },
  {
    id: 2,
    name: "Huile d'Olive Extra Vierge 500ml",
    price: 55,
    image: "image/500ml.png",
  },
  {
    id: 3,
    name: "Huile d'Olive Extra Vierge 750ml",
    price: 70,
    image: "image/1L.png",
  },
  {
    id: 4,
    name: "Huile d'Olive Extra Vierge 1L",
    price: 90,
    image: "image/bottle.png",
  },
  {
    id: 5,
    name: "Huile d'Olive Extra Vierge 2L",
    price: 150,
    image: "image/2L.png",
  },
  {
    id: 6,
    name: "Huile d'Olive Extra Vierge 5L",
    price: 350,
    image: "image/5L.png",
  },
];

// CART
let cart = [];

function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

function updateCartBadge() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document
    .querySelectorAll(".cart-badge")
    .forEach((b) => (b.textContent = total));
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const el = document.getElementById("cartTotal");
  if (el) el.textContent = total + " DH";
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartBadge();
  renderCartItems();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartBadge();
  renderCartItems();
  updateCartTotal();
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  updateCartBadge();
  renderCartItems();
  updateCartTotal();
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>Votre panier est vide</p>
            </div>`;
    updateCartTotal();
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img class="cart-item-img" src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                    <div class="qty-display">${item.qty}</div>
                    <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
                    <span class="cart-item-price">${item.price * item.qty}DH</span>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `,
    )
    .join("");

  updateCartTotal();
}

// RENDER PRODUCTS

function renderProducts() {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p class="price">${product.price}dh</p>
            <div class="card-actions">
                <button class="btn-green" onclick="addToCart(${product.id})">ajouter</button>
                <button class="btn-green" onclick="removeProduct(${product.id})">supprimer</button>
            </div>
        `;
    grid.appendChild(card);
  });
}

function removeProduct(id) {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    renderProducts();
  }
}



function openModal() {
    document.getElementById('productModal').classList.add('open');
    document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('open');
    document.getElementById('modalOverlay').classList.remove('open');
    // reset fields
    document.getElementById('newPrice').value = '';
    document.getElementById('newImage').value = '';
    document.getElementById('newDesc').value = '';
}







function setupAddProductBtn() {
    const btn = document.querySelector('.btn-primary');
    if (!btn) return;
    btn.addEventListener('click', openModal);
}

function submitNewProduct() {
    const priceInput = document.getElementById('newPrice');
    const imageInput = document.getElementById('newImage');
    const descInput  = document.getElementById('newDesc');

    const price = priceInput.value;
    const image = imageInput.value;
    const desc  = descInput.value;

    if (!price || !desc) {
        alert('insert the name of the product and the price');
        return;
    }

    products.push({
        id: Date.now(),
        name: desc,
        price: Number(price),
        image: image || 'image/1L.png' 
    });

    renderProducts();
    closeModal();
}


// CART ICON CLICK

function setupCartIcon() {
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) cartIcon.addEventListener("click", openCart);
}

// NAVBAR SCROLL

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  navbar.style.background =
    window.scrollY > 60 ? "rgba(46, 107, 18, 0.97)" : "rgba(0, 0, 0, 0.35)";
});

// ACTIVE NAV LINK

const currentPage = window.location.pathname.split("/").pop() || "Accueil.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.classList.remove("active");
  if (link.getAttribute("href").split("/").pop() === currentPage) {
    link.classList.add("active");
  }
});


// INIT


document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupAddProductBtn();
  setupCartIcon();
  updateCartBadge();
});
