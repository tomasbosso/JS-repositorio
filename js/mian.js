let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosContainer = document.getElementById("productos-container");
const carritoLista = document.getElementById("carrito-lista");
const totalGastadoEl = document.getElementById("total-gastado");
const vaciarBtn = document.getElementById("vaciar-carrito");
const finalizarBtn = document.getElementById("finalizar-compra");

async function cargarProductos() {
  try {
    const res = await fetch("productos.json");
    productos = await res.json();
    renderizarProductos();
  } catch (error) {
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  }
}

function renderizarProductos() {
  productosContainer.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button data-id="${prod.id}">Agregar al carrito</button>
    `;
    productosContainer.appendChild(div);
  });
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (producto) {
    carrito.push(producto);
    guardarCarrito();
    renderizarCarrito();

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${producto.nombre} se agregó al carrito`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}

function renderizarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    total += item.precio;
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    carritoLista.appendChild(li);
  });
  totalGastadoEl.textContent = total;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

vaciarBtn.addEventListener("click", () => {
  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Se eliminarán todos los productos",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      carrito = [];
      guardarCarrito();
      renderizarCarrito();
      Swal.fire("Carrito vacío", "", "success");
    }
  });
});

finalizarBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire("Tu carrito está vacío", "Agrega productos antes de comprar", "info");
    return;
  }

  Swal.fire({
    title: "¿Finalizar compra?",
    text: `Total a pagar: $${carrito.reduce((acc, item) => acc + item.precio, 0)}`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      carrito = [];
      guardarCarrito();
      renderizarCarrito();
      Swal.fire("¡Gracias por tu compra!", "Tu pedido ha sido procesado", "success");
    }
  });
});

productosContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.dataset.id);
    agregarAlCarrito(id);
  }
});

cargarProductos();
renderizarCarrito();
