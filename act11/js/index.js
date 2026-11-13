const dato1 = document.getElementById("loteVacuna");
const dato2 = document.getElementById("tempActual");
const btn = document.getElementById("btnRegistrarTemp");
const contenedor = document.getElementById("gridLecturas");
// 1. La clase
class LecturaBiologica {
    constructor(lote, temperatura, estado) {
        this.lote = lote;
        this.temperatura = temperatura;
        this.estado = estado;
    }
}
// 2. Cargar datos guardados
let historial = JSON.parse(localStorage.getItem("vacunas")) || [];
mostrar();
// 3. Acción al hacer clic
btn.addEventListener("click", function () {

    if (dato1.value == "" || dato2.value == "") {
        alert("Escribe los datos primero");
        return;
    }

    let lote = dato1.value;
    let temp = dato2.value;

    let estado = "";
    if (temp < 2 || temp > 8) {
        estado = "COMPROMETIDO";
    } else {
        estado = "ÓPTIMO";
    }
    // Guardar
    let nuevaLectura = new LecturaBiologica(lote, temp, estado);
    historial.push(nuevaLectura);
    localStorage.setItem("vacunas", JSON.stringify(historial));
    // Limpiar cajas
    dato1.value = "";
    dato2.value = "";
    mostrar(); // Dibujar otra vez
});
// 4. Función para dibujar
function mostrar() {
    contenedor.innerHTML = "";
    for (let i = 0; i < historial.length; i++) {
        let item = historial[i];
        let color = "";
        if (item.estado == "COMPROMETIDO") {
            color = "bg-danger"; // Rojo
        } else {
            color = "bg-success"; // Verde
        }
        let tarjeta = "<div class='col-md-6 mb-3'>";
        tarjeta += "<div class='card p-3 text-white " + color + "'>";
        tarjeta += "<h5>Lote: " + item.lote + "</h5>";
        tarjeta += "<p>Temperatura: " + item.temperatura + "°C</p>";
        tarjeta += "<p>Estado: " + item.estado + "</p>";
        tarjeta += "</div></div>";
        contenedor.innerHTML = contenedor.innerHTML + tarjeta;
    }
}