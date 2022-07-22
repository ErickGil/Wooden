const stock = []

class Producto {
    constructor(id, nombre, calidad, precio, cantidad, imagen) {
        this.id = id
        this.nombre = nombre
        this.calidad = calidad
        this.precio = precio
        this.cantidad = cantidad
        this.imagen = imagen
    }
}
class Carrito {
    constructor(id) {
        this.id = id;
        this.productos = [];
    }

    calcularTotal() {
        let total = 0;
        for (let i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].precio
        }
        return total;
    }

}

function Agregarproductos(id, nombre, calidad, precio, cantidad, imagen) {
    let productoNuevo = new Producto(id, nombre, calidad, precio, cantidad, imagen)
    stock.push(productoNuevo)
}

function limpiarCarro() {
    let divCarro = document.querySelector("#carro")
    divCarro.innerHTML = "";
}

function vaciarCarro() {
    let divCarro = document.querySelector("#carro")
    divCarro.innerHTML = ""
    localStorage.removeItem("carro");
    localStorage.clear();
    carro = new Carrito(1)

}

function tarjetaCarro(producto) {
    let carroTarjeta = `
    <div class="tarjeta-carrito">
    <div class="imagen">
        <img src="./fotosMuebles/${producto.imagen}" alt="">
    </div>
    <div >
        <h5>${producto.nombre}</h5>
    </div>
    <div>
        <h5> ${producto.calidad}</h5>
    </div>
    <div>
        <h5>$ ${producto.precio}</h5>
    </div>
</div>`
    return carroTarjeta
}


function actualizarCarro(carro) {
    let divCarro = document.querySelector("#carro")
    carro.productos.forEach(productos => {
        divCarro.innerHTML += tarjetaCarro(productos)
    })
    divCarro.innerHTML += `<p class="text-right">Total: $<span id="total"></span>${carro.calcularTotal()}</p>`

}
// cargar carro existente utilizacion de json y storage//

function toast(){
    Toastify({
        text: "Se Agrego al Carrito!",
        duration: 1500
    }).showToast();
}
function renovarStorage() {
    localStorage.removeItem("carro");
    localStorage.setItem("carro", JSON.stringify(carro));

}
window.addEventListener('DOMContentLoaded', (e) => {
    let storage = JSON.parse(localStorage.getItem("carro"));
    let carritoGuardado = new Carrito(storage.id, storage.productos);
    storage.productos.forEach(producto => {
        carritoGuardado.productos.push(producto);
    })
    limpiarCarro();
    actualizarCarro(carritoGuardado);
});

Agregarproductos(1, "Escritorio", "De Diseño", 24000, 2, "escritorio.jpg")
Agregarproductos(2, "Mesa Comerdor", "Generico", 12000, 5, "mesa.jpg")
Agregarproductos(3, "Mesa de Tv", "De Diseño", 15000, 3, "mesaTv.jpg")
Agregarproductos(4, "Mesa de Tv", "Generico", 10000, 6, "mesaTvDos.jpg")
Agregarproductos(5, "Puerta", "Generico", 17000, 4, "puerta.jpg")
Agregarproductos(6, "Silla", "Generico", 4000, 8, "silla.jpg")
Agregarproductos(7, "Velador", "Generico", 6000, 4, "velador.jpg")
Agregarproductos(8, "Ventana", "Generico", 15000, 4, "ventanaDos.jpg")
Agregarproductos(9, "Ventana", "De Diseño", 20000, 1, "ventanaUno.jpg")


let contenedorProductos = document.getElementById("contenedor-productos")

for (const elemnt of stock) {
    let columna = document.createElement("div")
    columna.className = "col-md-4 mt-3"
    columna.id = `columna-${elemnt.id}`
    columna.innerHTML = `
        <div class="card">
        <img class="card-img-top" src="./fotosMuebles/${elemnt.imagen}" alt="Card image">
            <div class = "card-body">
                <h4 class="card-title"<b>${elemnt.nombre}</b></h4>
                <p class="card-text">Calidad: <b>${elemnt.calidad}</b></p>
                <p class="card-text">Precio: <b>$${elemnt.precio}</b></p>
                <p class="card-text">Cantidad: <b>${elemnt.cantidad}</b></p>
                <a class="btn btn-primary botonDeCompra" id= ${elemnt.id} >Agregar al carrito</a>
            </div>
        </div>
    `
    contenedorProductos.append(columna)
}

let carro = new Carrito(1);

let botones = document.querySelectorAll(".botonDeCompra");
let arrayDeBotones = Array.from(botones)


arrayDeBotones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        let productoSeleccionado = stock.find(producto => producto.id == e.target.id)
        carro.productos.push(productoSeleccionado);
        
        limpiarCarro();
        actualizarCarro(carro);
        renovarStorage();
        toast();
    })
})

let botonLimpiar = document.querySelector(".botonLimpiar")
botonLimpiar.addEventListener("click", () => {
    Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Eliminado!',
                'Su carro esta Vacio.',
                'success'
            )
            vaciarCarro();
        }
    })


})