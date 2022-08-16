class Carrito {
    constructor(id) {
        this.id = id;
        this.productos = [];
    }

    calcularTotal() {
        let total = 0;
        for (let i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].precio;
        }
        return total;
    }
}

let carro = new Carrito(1);

fetch("https://62e8682593938a545be58877.mockapi.io/articulos")
    .then((result) => result.json())
    .then((stock) => {
        function limpiarCarro() {
            let divCarro = document.querySelector("#carro");
            divCarro.innerHTML = "";
        }

        function vaciarCarro() {
            limpiarCarro();
            localStorage.removeItem("carro");
            localStorage.clear();
            carro = new Carrito(1);
        }

        //Crea tarjetas del carro
        function tarjetaCarro(producto) {
            let carroTarjeta = `
        <div class="container tarjeta-carrito">
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
        </div>`;
            return carroTarjeta;
        }

        //Productos Local Storage
        let storage = JSON.parse(localStorage.getItem("carro"));
        if (storage) {
            let carritoGuardado = new Carrito(storage.id, storage.productos);
            storage.productos.forEach((item) => {
                stock.forEach((stockItem) => {
                    if (stockItem.id == item.id) {
                        stockItem.cantidad -= 1;
                    }
                });
            });
            storage.productos.forEach((producto) => {
                carritoGuardado.productos.push(producto);
                let productosLS = stock.find((prodLS) => prodLS.id == producto.id);
                carro.productos.push(productosLS);
            });
            limpiarCarro();
            actualizarCarro(carritoGuardado);
        }

        function actualizarCarro(carrito) {
            let divCarro = document.querySelector("#carro");
            carrito.productos.forEach((productos) => {
                divCarro.innerHTML += tarjetaCarro(productos);
            });
            divCarro.innerHTML += `<p class="text-right">Total: $<span id="total"></span>${carro.calcularTotal()}</p>`;
        }

        function toast() {
            Toastify({
                text: "Se Agrego al Carrito!",
                duration: 1500,
            }).showToast();
        }

        function renovarStorage() {
            localStorage.removeItem("carro");
            localStorage.setItem("carro", JSON.stringify(carro));
        }

        //Crear tarjetas iniciales
        let contenedorProductos = document.getElementById("contenedor-productos");
        for (const elemnt of stock) {
            let columna = document.createElement("div");
            columna.className = "col-md-4 mt-3";
            columna.id = `columna-${elemnt.id}`;
            columna.innerHTML = `
            <div class="card">
            <img class="card-img-top" src="./fotosMuebles/${elemnt.imagen}" alt="Card image">
                <div class = "card-body">
                    <h4 class="card-title"<b>${elemnt.nombre}</b></h4>
                    <p class="card-text">Calidad: <b>${elemnt.calidad}</b></p>
                    <p class="card-text">Precio: <b>$${elemnt.precio}</b></p>
                    <p id="seccionCantidad${elemnt.id}" class="card-text" >Cantidad: <b>${elemnt.cantidad}</b></p>
                    <a class="btn btn-primary botonDeCompra" id= ${elemnt.id} >Agregar al carrito</a>
                </div>
            </div>
        `;
            contenedorProductos.append(columna);
        }

        //Agregar al carrito onClick
        let botones = document.querySelectorAll(".botonDeCompra");
        let arrayDeBotones = Array.from(botones);
        arrayDeBotones.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                let productoSeleccionado = stock.find(
                    (producto) => producto.id == e.target.id
                );
                carro.productos.push(productoSeleccionado);
                console.log(productoSeleccionado);

                if (productoSeleccionado.cantidad > 0) {
                    limpiarCarro();
                    actualizarCarro(carro);
                    renovarStorage();
                    toast();
                    productoSeleccionado.cantidad = productoSeleccionado.cantidad - 1;
                    const demoId = document.querySelector(
                        "#seccionCantidad" + productoSeleccionado.id
                    );
                    demoId.innerHTML = `<p class="card-text" >Cantidad: <b>${productoSeleccionado.cantidad}</b></p>`;
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Sin Stock!",
                    });
                }
            });
        });

        //Limpiar carro
        let botonLimpiar = document.querySelector(".botonLimpiar");
        botonLimpiar.addEventListener("click", () => {
            Swal.fire({
                title: "Estas seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Sí, bórralo!",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("¡Eliminado!", "Su carro esta Vacio.", "success");
                    vaciarCarro();
                    location.reload();
                }
            });
        });
    });