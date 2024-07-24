// Variables
const maxMonto = 20000;
const maxCuotas = 6;

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

// Array para almacenar créditos aprobados
let creditosAprobados = [];

// Función principal para simular el crédito
function simularCredito() {
  let edad = parseInt(prompt("Ingrese su edad:"));
  let nacionalidad = prompt("Ingrese su nacionalidad:");
  let monto = parseFloat(
    prompt("Ingrese el monto del crédito en pesos (máximo 20.000):")
  );

  // Validar edad y nacionalidad
  if (!esMayorDeEdad(edad)) {
    alert("Debe ser mayor de 18 años para solicitar un crédito.");
    return;
  }
  if (!esArgentino(nacionalidad)) {
    alert("Debe ser argentino para solicitar un crédito.");
    return;
  }
  if (isNaN(monto) || monto <= 0 || monto > maxMonto) {
    alert("El monto debe ser mayor a 0 y no puede exceder los 20.000 pesos.");
    return;
  }

  // Crear y almacenar el crédito aprobado
  let credito = new Credito(monto, maxCuotas);
  creditosAprobados.push(credito);

  // Mostrar resultados en el navegador
  document.getElementById("resultado").innerHTML = `
        <h2>Crédito aprobado</h2>
        <p>Monto solicitado: $${credito.monto.toFixed(2)}</p>
        <p>Cuota mensual (6 meses sin interés): $${credito.cuotaMensual.toFixed(
          2
        )}</p>
    `;

  // Mostrar resultados en la consola
  console.log(
    `Crédito aprobado: Monto solicitado: $${credito.monto.toFixed(
      2
    )}, Cuota mensual (6 meses sin interés): $${credito.cuotaMensual.toFixed(
      2
    )}`
  );
}

// Ejemplo de filtrado: créditos mayores a 10.000 pesos
function filtrarCreditosGrandes() {
  return creditosAprobados.filter((credito) => credito.monto > 10000);
}

// Ejecutar filtrado y mostrar resultados en la consola
let creditosGrandes = filtrarCreditosGrandes();
console.log("Créditos mayores a 10.000 pesos:");
creditosGrandes.forEach((credito) =>
  console.log(
    `Monto: $${credito.monto.toFixed(2)}, Cuotas: ${
      credito.cuotas
    }, Cuota mensual: $${credito.cuotaMensual.toFixed(2)}`
  )
);
