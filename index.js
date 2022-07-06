const stock = []

class Producto{
    constructor(id, nombre, calidad, precio, cantidad){
        this.id = id
        this.nombre = nombre
        this.calidad = calidad
        this.precio = precio
        this.cantidad = cantidad
    }
}

function Agregarproductos(id, nombre, calidad, precio,cantidad ){
    let Productonuevo = new Producto(id, nombre, calidad, precio, cantidad)
    stock.push(Productonuevo)
}


Agregarproductos(1, "Escritorio", "De Diseño", 24000, 2)
Agregarproductos(2, "Mesa Comerdor", "Generico", 12000,5)
Agregarproductos(3, "Mesa de Tv", "De Diseño",15000,3)
Agregarproductos(4, "Mesa de Tv", "Generico",10000, 6)
Agregarproductos(5, "Puerta","Generico",17000,4)
Agregarproductos(6, "Silla", "Generico",4000,8)
Agregarproductos(7,"Velador","Generico",6000,4)
Agregarproductos(8, "Ventana","Generico",15000,4)
Agregarproductos(9, "Ventana","De Diseño",20000,1)
console.log(stock)

let contenedorProductos = document.getElementById("contenedor-productos")

for(const elemnt of stock){
    let columna = document.createElement("div")
    columna.className = "col-md-4 mt-3"
    columna.id = `columna-${elemnt.id}`
    columna.innerHTML = `
        <div class="card">
            <div class = "card-body">
                <h4 class="card-title"<b>${elemnt.nombre}</b></h4>
                <p class="card-text">Calidad: <b>${elemnt.calidad}</b></p>
                <p class="card-text">Precio: <b>$${elemnt.precio}</b></p>
                <p class="card-text">Cantidad: <b>${elemnt.cantidad}</b></p>
            </div>
        </div>
    `
    contenedorProductos.append(columna)
}