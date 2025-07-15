const productos = ["Paleta", "Zapatillas", "Grip", "Gorra"];
const precios = [150000, 70000, 10000, 15000];

let totalgastado = 0;

function mostrarproductos() {
  console.log("Productos disponibles:");
  for (let i = 0; i < productos.length; i++) {
    console.log(`${i + 1}: ${productos[i]} - $${precios[i]}`);
  }
}

function iniciarsimulador() {
  alert("¡Bienvenidos a VirtualPadelStore!");
  let seguircomprando = true;

  while (seguircomprando) {
    mostrarproductos();
    let opcion = prompt("¿Qué producto quiere comprar?\n1 = Paleta\n2 = Zapatillas\n3 = Grip\n4 = Gorra\n0 = Salir");

    if (opcion === null || opcion === "0") {
      seguircomprando = false;
    } else {
      let compra = parseInt(opcion) - 1;

      if (compra >= 0 && compra < productos.length) {
        let confirmar = confirm(`¿Confirmás la compra de ${productos[compra]} por $${precios[compra]}?`);
        if (confirmar) {
          totalgastado += precios[compra];
          alert(`¡Gracias por comprar ${productos[compra]}!`);
        } else {
          alert("Compra cancelada.");
        }
      } else {
        alert("Opción inválida. Intenta nuevamente.");
      }
    }
  }

  alert(`Gracias por visitarnos. Total gastado: $${totalgastado}`);
  console.log("Total final gastado:", totalgastado);
}

iniciarsimulador();