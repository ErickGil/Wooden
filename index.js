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
    let Productonuevo = new Producto(id, nombre, calidad, precio, cantidad, imagen)
    stock.push(Productonuevo)
}

function limpiarCarro() {
    let divCarro = document.querySelector("#carro")
    divCarro.innerHTML = "";
}

function tarjetaCarro(producto) {
    let carroTarjeta = `
    <hr><div class="tarjeta-carrito">
    <div class="imagen">
        <img src="./fotosMuebles/${producto.imagen}" alt="">
    </div>
    <div >
        <h5>${producto.nombre}</h5>
    </div>
    <div>
        <h5>$ ${producto.precio}</h5>
    </div>
</div>`
    return carroTarjeta
}

function actualizarCarro() {
    let divCarro = document.querySelector("#carro")
    carro.productos.forEach(productos => {
        divCarro.innerHTML += tarjetaCarro(productos)
    })
    divCarro.innerHTML += `<h1 class="letrasTotal">Total: $ ${carro.calcularTotal()}</h1>`
}

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

let carro = new Carrito(1, );

let botones = document.querySelectorAll(".botonDeCompra");
let arrayDeBotones = Array.from(botones)
arrayDeBotones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        let productoSeleccionado = stock.find(producto => producto.id == e.target.id)
        carro.productos.push(productoSeleccionado);
        console.log(carro)
        limpiarCarro();
        actualizarCarro();
    })
})

let botonLimpiar = document.querySelector(".botonLimpiar")
botonLimpiar.addEventListener("click", (e) => {
    limpiarCarro();
})
