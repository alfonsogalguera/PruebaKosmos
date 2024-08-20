function calculoMotor(tipoNomina, fechaPrimerEmpleo, genero) {
  const fechaActual = new Date();
  const mesesDesdePrimerEmpleo =
    (fechaActual.getFullYear() - fechaPrimerEmpleo.getFullYear()) * 12 +
    (fechaActual.getMonth() - fechaPrimerEmpleo.getMonth());

  // Tablas de montos mínimos y máximos según género
  const montosMinimos = {
    m: {
      A: [100, 400, 900, 100, 600],
      B: [1000, 600, 1000, 1000, 1000],
      C: [400, 200, 200, 1000, 600],
      D: [400, 300, 500, 900, 1000],
      rangos: [26, 27, 28, 29, Infinity],
    },
    f: {
      A: [800, 800, 800, 600, 200],
      B: [800, 700, 100, 600, 700],
      C: [200, 900, 700, 800, 100],
      D: [500, 1000, 600, 400, 700],
      rangos: [24, 25, 26, 27, Infinity],
    },
  };

  const montosMaximos = {
    m: {
      A: [4900, 4700, 4600, 4600, 4500],
      B: [4700, 4400, 5000, 4400, 4900],
      C: [5000, 4700, 5000, 4200, 4600],
      D: [4400, 4700, 4300, 4900, 4300],
      rangos: [26, 27, 28, 29, Infinity],
    },
    f: {
      A: [4000, 4200, 4100, 4200, 4500],
      B: [4700, 4200, 4500, 4300, 4400],
      C: [4600, 4900, 4600, 4700, 4000],
      D: [5000, 4900, 4700, 5000, 4300],
      rangos: [24, 25, 26, 27, Infinity],
    },
  };

  const buscarMonto = (montos, meses) => {
    for (let i = 0; i < montos.rangos.length; i++) {
      if (meses < montos.rangos[i]) {
        return montos[tipoNomina][i];
      }
    }
  };

  const montoMinimo = buscarMonto(
    montosMinimos[genero],
    mesesDesdePrimerEmpleo
  );
  const montoMaximo = buscarMonto(
    montosMaximos[genero],
    mesesDesdePrimerEmpleo
  );

  const p1 = montoMinimo + Math.sqrt(montoMaximo - montoMinimo);
  const p2 = montoMinimo + 0.0175 * (montoMaximo - montoMinimo);

  const recomendacionLinea = Math.max(p1, p2);

  return {
    tipoNomina: tipoNomina,
    fechaPrimerEmpleo: fechaPrimerEmpleo,
    genero: genero,
    montoMinimo: montoMinimo,
    montoMaximo: montoMaximo,
    recomendacionLinea: recomendacionLinea
  };
}

const datosEvaluacion = [
  { tipoNomina: "A", fechaPrimerEmpleo: new Date("2022-06-12"), genero: "f" },
  { tipoNomina: "B", fechaPrimerEmpleo: new Date("1993-12-30"), genero: "f" },
  { tipoNomina: "C", fechaPrimerEmpleo: new Date("2020-09-19"), genero: "m" },
  { tipoNomina: "D", fechaPrimerEmpleo: new Date("2019-01-15"), genero: "m" },
];

const resultados = datosEvaluacion.map((dato) => {
  return calculoMotor(dato.tipoNomina, dato.fechaPrimerEmpleo, dato.genero);
});

console.log(resultados);
