
  

  // Datos originales
var dataSisc = [
  {"Nombre":"(AHORROS) DEPOSITOS A CUENTA","Monto":"144908373.0100","Cantidad":"169635","Tipo Cuenta.":"AHORROS"},
  {"Nombre":"(AHORROS) RETIRO DE CUENTA","Monto":"139347712.6600","Cantidad":"40473","Tipo Cuenta.":"AHORROS"},
  {"Nombre":"(CREDITOS) PAGO A PRESTAMO","Monto":"126417068.6100","Cantidad":"54481","Tipo Cuenta.":"CREDITOS"},
];

// Agrupar los datos por Tipo Cuenta y sumar los montos y cantidades
var dataAgrupada = dataSisc.reduce((acc, curr) => {
  if (!acc[curr["Tipo Cuenta."]]) {
      acc[curr["Tipo Cuenta."]] = {
          Monto: 0,
          Cantidad: 0
      };
  }
  acc[curr["Tipo Cuenta."]].Monto += parseFloat(curr.Monto);
  acc[curr["Tipo Cuenta."]].Cantidad += parseInt(curr.Cantidad);
  return acc;
}, {});

// Convertir los datos agrupados en un formato compatible con Chart.js
var labels = Object.keys(dataAgrupada);
var dataMonto = labels.map(label => dataAgrupada[label].Monto);
var dataCantidad = labels.map(label => dataAgrupada[label].Cantidad);

// Configuración del gráfico
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: labels,
      datasets: [{
          label: 'Monto',
          data: dataMonto,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
      },
      {
          label: 'Cantidad',
          data: dataCantidad,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});
