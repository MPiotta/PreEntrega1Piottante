// Función para validar la edad del usuario
function esMayorDeEdad(edad) {
  return edad >= 18;
}

// Función para validar la nacionalidad del usuario
function esArgentino(nacionalidad) {
  return nacionalidad.toLowerCase() === "argentino";
}

// Función principal para simular el crédito
function simularCredito() {
  let edad;
  let nacionalidad;
  let esValido = false;

  // Validar edad y nacionalidad
  while (!esValido) {
    edad = parseInt(prompt("Ingrese su edad:"));
    nacionalidad = prompt("Ingrese su nacionalidad:");

    if (!esMayorDeEdad(edad)) {
      alert("Debe ser mayor de 18 años para solicitar un crédito.");
    } else if (!esArgentino(nacionalidad)) {
      alert("Debe ser argentino para solicitar un crédito.");
    } else {
      esValido = true;
    }
  }

  // Solicitar datos del crédito
  let monto = parseFloat(
    prompt("Ingrese el monto del crédito en pesos (máximo 20.000):")
  );

  if (monto <= 0 || monto > 20000) {
    alert("El monto debe ser mayor a 0 y no puede exceder los 20.000 pesos.");
    return;
  }

  let plazo = 6; // Plazo fijo de 6 meses sin intereses
  let cuotaMensual = monto / plazo;

  // Mostrar resultados
  alert(
    "Crédito aprobado:\n" +
      "Monto solicitado: $" +
      monto.toFixed(2) +
      "\n" +
      "Monto total a pagar: $" +
      monto.toFixed(2) +
      "\n" +
      "Cuota mensual (6 meses sin interés): $" +
      cuotaMensual.toFixed(2)
  );
}
