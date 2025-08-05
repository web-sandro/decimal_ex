function decimalParaHex() {
  let decimalInput = document.getElementById("decimal");
  let hexInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let decimal = decimalInput.value;

  if (decimal === "" || isNaN(decimal)) {
    hexInput.value = "";
    resultado.innerHTML = "Digite um valor decimal válido.";
    passos.innerHTML = "";
    return;
  }

  let n = parseInt(decimal);
  let hex = "";
  let etapas = [];

  const hexChars = "0123456789ABCDEF";

  while (n > 0) {
    let resto = n % 16;
    let caractereHex = hexChars[resto];
    etapas.push(`${n} ÷ 16 = ${Math.floor(n / 16)} (resto ${resto} → '${caractereHex}')`);
    hex = caractereHex + hex;
    n = Math.floor(n / 16);
  }

  hex = hex || "0";
  hexInput.value = hex;
  resultado.innerHTML = `Decimal: <strong>( ${decimal} )₁₀</strong> → Hexadecimal: <strong>( ${hex} )₁₆</strong>`;

  etapas.push(`<br><strong>Resultado final: ( ${decimal} )₁₀ → ( ${hex} )₁₆</strong>`);

  passos.innerHTML = "<strong>Passos da conversão Decimal → Hexadecimal:</strong><br>" +
    etapas.join("<br>");
}
ado.innerHTML = `Decimal: <strong>${decimal}</strong> → Hexadecimal: <strong>${hex}</strong>`;
function hexParaDecimal() {
  let decimalInput = document.getElementById("decimal");
  let hexInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let hex = hexInput.value.trim().toUpperCase();

  if (hex === "" || !/^[0-9A-F]+$/.test(hex)) {
    decimalInput.value = "";
    resultado.innerHTML = "Digite um valor hexadecimal válido.";
    passos.innerHTML = "";
    return;
  }

  let decimal = 0;
  let etapas = [];

  let hexArray = hex.split("").reverse();

  hexArray.forEach((char, index) => {
    let valor = parseInt(char, 16);
    let parcial = valor * Math.pow(16, index);
    etapas.push(`${char} (→ ${valor}) × 16^${index} = ${parcial}`);
    decimal += parcial;
  });

  decimalInput.value = decimal;
  resultado.innerHTML = `Hexadecimal: <strong>( ${hex} )₁₆</strong> → Decimal: <strong>( ${decimal} )₁₀</strong>`;

  etapas.push(`<br><strong>Resultado final: ( ${hex} )₁₆ → ( ${decimal} )₁₀</strong>`);

  passos.innerHTML = "<strong>Passos da conversão Hexadecimal → Decimal:</strong><br>" +
    etapas.join("<br>");
}
