// Datos iniciales
const productos = [
  { id: 1, nombre: "Paleta", precio: 150000 },
  { id: 2, nombre: "Zapatillas", precio: 70000 },
  { id: 3, nombre: "Grip", precio: 10000 },
  { id: 4, nombre: "Gorra", precio: 15000 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosContainer = document.getElementById("productos-container");
const carritoLista = document.getElementById("carrito-lista");
const totalGastadoEl = document.getElementById("total-gastado");
const vaciarBtn = document.getElementById("vaciar-carrito");

// Mostrar productos
function renderizarProductos() {
  productosContainer.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button data-id="${prod.id}">Agregar al carrito</button>
    `;
    productosContainer.appendChild(div);
  });
}

// Agregar al carrito
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (producto) {
    carrito.push(producto);
    guardarCarrito();
    renderizarCarrito();
  }
}

// Mostrar carrito
function renderizarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    carritoLista.appendChild(li);
  });
  totalGastadoEl.textContent = total;
}

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar carrito
vaciarBtn.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
});

// Escuchar clics en botones "Agregar"
productosContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.dataset.id);
    agregarAlCarrito(id);
  }
});

// Inicialización
renderizarProductos();
renderizarCarrito();
