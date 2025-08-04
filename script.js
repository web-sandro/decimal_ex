function decimalParaHex() {
  let decimalInput = document.getElementById("decimal");
  let hexInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");

  let decimal = decimalInput.value;

  if (decimal === "" || isNaN(decimal)) {
    hexInput.value = "";
    resultado.innerHTML = "Digite um valor decimal válido.";
    return;
  }

  let hex = parseInt(decimal).toString(16).toUpperCase();
  hexInput.value = hex;
  resultado.innerHTML = `Decimal: <strong>${decimal}</strong> → Hexadecimal: <strong>${hex}</strong>`;
}

function hexParaDecimal() {
  let decimalInput = document.getElementById("decimal");
  let hexInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");

  let hex = hexInput.value.trim();

  if (hex === "" || !/^[0-9A-Fa-f]+$/.test(hex)) {
    decimalInput.value = "";
    resultado.innerHTML = "Digite um valor hexadecimal válido.";
    return;
  }

  let decimal = parseInt(hex, 16);
  decimalInput.value = decimal;
  resultado.innerHTML = `Hexadecimal: <strong>${hex.toUpperCase()}</strong> → Decimal: <strong>${decimal}</strong>`;
}
