function decimalParaHex() {
  let decimalInput = document.getElementById("decimal");
  let hexInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let decimalStr = decimalInput.value.trim();

  if (decimalStr === "" || isNaN(decimalStr)) {
    hexInput.value = "";
    resultado.innerHTML = "Digite um valor decimal válido.";
    passos.innerHTML = "";
    return;
  }

  let [parteInteiraStr, parteFracionariaStr] = decimalStr.split(".");
  let parteInteira = parseInt(parteInteiraStr, 10);
  let parteFracionaria = parteFracionariaStr ? parseFloat("0." + parteFracionariaStr) : 0;

  let etapas = [];
  const hexChars = "0123456789ABCDEF";

  // ---- Parte inteira ----
  let hexInt = "";
  let n = parteInteira;
  while (n > 0) {
    let resto = n % 16;
    let caractereHex = hexChars[resto];
    etapas.push(`${n} ÷ 16 = ${Math.floor(n / 16)} (resto ${resto} → '${caractereHex}')`);
    hexInt = caractereHex + hexInt;
    n = Math.floor(n / 16);
  }
  if (hexInt === "") hexInt = "0";

  // ---- Parte fracionária ----
  let hexFrac = "";
  let limiteCasas = 8; // máximo 8 casas
  let count = 0;
  while (parteFracionaria > 0 && count < limiteCasas) {
    parteFracionaria *= 16;
    let inteiro = Math.floor(parteFracionaria);
    let caractereHex = hexChars[inteiro];
    etapas.push(`×16 = ${parteFracionaria.toFixed(6)} → '${caractereHex}'`);
    hexFrac += caractereHex;
    parteFracionaria -= inteiro;
    count++;
  }

  let resultadoFinal = hexInt + (hexFrac ? "." + hexFrac : "");
  hexInput.value = resultadoFinal;

  resultado.innerHTML = `Decimal: <strong>( ${decimalStr} )₁₀</strong> → Hex: <strong>( ${resultadoFinal} )₁₆</strong>`;
  etapas.push(`<br><strong>Resultado final: ( ${decimalStr} )₁₀ → ( ${resultadoFinal} )₁₆</strong>`);

  passos.innerHTML = "<strong>Passos da conversão Decimal → Hex:</strong><br>" + etapas.join("<br>");
}

function hexParaDecimal() {
  let decimalInput = document.getElementById("decimal");
  let hexInput = document.getElementById("hexadecimal");
  let resultado = document.getElementById("resultado");
  let passos = document.getElementById("passos");

  let hex = hexInput.value.trim().toUpperCase();

  if (hex === "" || !/^[0-9A-F.]+$/.test(hex) || (hex.split('.').length > 2)) {
    decimalInput.value = "";
    resultado.innerHTML = "Digite um valor hexadecimal válido (0-9, A-F e no máximo um ponto).";
    passos.innerHTML = "";
    return;
  }

  let [parteInteira, parteFracionaria] = hex.split(".");
  parteFracionaria = parteFracionaria || "";

  let etapas = [];
  let decimal = 0;

  // ---- Parte inteira ----
  let hexReverso = parteInteira.split("").reverse();
  hexReverso.forEach((char, index) => {
    let valor = parseInt(char, 16);
    let parcial = valor * Math.pow(16, index);
    etapas.push(`${char} (→ ${valor}) × 16^${index} = ${parcial}`);
    decimal += parcial;
  });

  // ---- Parte fracionária ----
  for (let i = 0; i < parteFracionaria.length; i++) {
    let valor = parseInt(parteFracionaria[i], 16);
    let parcial = valor * Math.pow(16, -(i + 1));
    etapas.push(`${parteFracionaria[i]} (→ ${valor}) × 16^-${i + 1} = ${parcial}`);
    decimal += parcial;
  }

  let resultadoFinal = decimal.toString();
  decimalInput.value = resultadoFinal;

  resultado.innerHTML = `Hex: <strong>( ${hex} )₁₆</strong> → Decimal: <strong>( ${resultadoFinal} )₁₀</strong>`;
  etapas.push(`<br><strong>Resultado final: ( ${hex} )₁₆ → ( ${resultadoFinal} )₁₀</strong>`);

  passos.innerHTML = "<strong>Passos da conversão Hex → Decimal:</strong><br>" + etapas.join("<br>");
}
