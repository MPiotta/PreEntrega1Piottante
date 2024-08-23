// Estructura de datos: Array de objetos para almacenar los créditos
let creditosAprobados =
  JSON.parse(localStorage.getItem("creditosAprobados")) || [];

// Función para validar la edad del usuario
function esMayorDeEdad(edad) {
  return edad >= 18;
}

// Función para validar la nacionalidad del usuario
function esArgentino(nacionalidad) {
  return nacionalidad.toLowerCase() === "argentino";
}

// Objeto que representa un crédito
class Credito {
  constructor(monto, cuotas) {
    this.monto = monto;
    this.cuotas = cuotas;
    this.cuotaMensual = this.calcularCuotaMensual();
  }

  // Método para calcular la cuota mensual
  calcularCuotaMensual() {
    return this.monto / this.cuotas;
  }
}

// Función principal para simular el crédito
function simularCredito(event) {
  event.preventDefault();

  let edad = parseInt(document.getElementById("edad").value);
  let nacionalidad = document.getElementById("nacionalidad").value;
  let monto = parseFloat(document.getElementById("monto").value);

  // Validar edad y nacionalidad
  if (!esMayorDeEdad(edad)) {
    mostrarAlerta("Debe ser mayor de 18 años para solicitar un crédito.");
    return;
  }
  if (!esArgentino(nacionalidad)) {
    mostrarAlerta("Debe ser argentino para solicitar un crédito.");
    return;
  }
  if (isNaN(monto) || monto <= 0 || monto > 20000) {
    mostrarAlerta(
      "El monto debe ser mayor a 0 y no puede exceder los 20.000 pesos."
    );
    return;
  }

  // Crear y almacenar el crédito aprobado
  let credito = new Credito(monto, 6); // Asumimos que siempre son 6 cuotas
  creditosAprobados.push(credito);
  localStorage.setItem("creditosAprobados", JSON.stringify(creditosAprobados));

  // Mostrar resultados en el navegador con animación
  generarResultadoHTML(credito);

  // Mostrar resultados en la consola
  console.log(
    `Crédito aprobado: Monto solicitado: $${credito.monto.toFixed(
      2
    )}, Cuota mensual (6 meses sin interés): $${credito.cuotaMensual.toFixed(
      2
    )}`
  );
}

// Función para mostrar alertas usando SweetAlert2
function mostrarAlerta(mensaje) {
  Swal.fire({
    icon: "warning",
    title: "Oops...",
    text: mensaje,
  });
}

// Función para generar el HTML de resultados dinámicamente con animación
function generarResultadoHTML(credito) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `
        <h2 class="animate__animated animate__fadeIn">Crédito aprobado</h2>
        <p>Monto solicitado: $${credito.monto.toFixed(2)}</p>
        <p>Cuota mensual (6 meses sin interés): $${credito.cuotaMensual.toFixed(
          2
        )}</p>
    `;
}

// Capturar el evento del formulario
document
  .getElementById("formularioCredito")
  .addEventListener("submit", simularCredito);

// Carga de datos desde un JSON local o API externa usando fetch y manejo de promesas
async function cargarDatosExternos() {
  try {
    const response = await fetch("data/creditos.json"); // Ruta del archivo JSON local
    if (!response.ok) {
      throw new Error("Error al cargar el JSON");
    }
    const datosExternos = await response.json();

    // Procesar los datos cargados
    datosExternos.forEach((credito) => {
      creditosAprobados.push(new Credito(credito.monto, credito.cuotas));
    });

    localStorage.setItem(
      "creditosAprobados",
      JSON.stringify(creditosAprobados)
    );
    console.log("Datos cargados y procesados desde JSON local o API externa");
  } catch (error) {
    console.error("Error al cargar los datos externos:", error);
    mostrarAlerta(
      "Hubo un problema al cargar los datos. Inténtelo de nuevo más tarde."
    );
  }
}

// Ejecutar la carga de datos externos al cargar la página
cargarDatosExternos();
