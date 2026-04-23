//tablue products
let  products = [
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
    image: "image/1L.png",
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

function creatcard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="image-container">
      <img  src=${product.image} alt="${product.name}">
    </div>
    <h3>${product.name}</h3>
    <p >${product.price}</p>
    <div class="card-actions">
    <button class="btn-green" onclick="addToCart(${product.id})">Ajouter</button>
    <button class="btn-green" onclick="removeProduct(${product.id})">supprimer</button>
    </div>
    `;
  return card;
}


function RenderCards()
{
  const container = document.getElementById("product-card");
  container.innerHTML = "";
  products.forEach((product) => {
    let card = creatcard(product);
    container.appendChild(card);
  });
}


// supprimer card

function removeProduct(id){
  products = products.filter(product => product.id !== id )

  RenderCards();
}
//open cart and close it
let cart = []; 


function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

// add to card
function addToCart (id) {

}






RenderCards();