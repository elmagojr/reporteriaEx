
var arreglosSeparados = {};

// Recorrer cada objeto
dataSisc.forEach(function (objeto) {
    // Recorrer cada propiedad del objeto
    Object.keys(objeto).forEach(function (propiedad) {
        // Si no existe un arreglo para esta propiedad, crearlo
        if (!arreglosSeparados[propiedad]) {
            arreglosSeparados[propiedad] = [];
        }
        // Agregar el valor de la propiedad al arreglo correspondiente
        arreglosSeparados[propiedad].push(objeto[propiedad]);
    });
});

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arreglosSeparados.nombre,
        datasets: []
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'black' // Color del texto de la leyenda
                },
                position: 'top',
                onClick: null, // Deshabilitar el evento onClick de la leyenda
                onHover: null, // Deshabilitar el evento onHover de la leyenda
                onLeave: null, // Deshabilitar el evento onLeave de la leyenda
                display: true,
                labels: {
                    fontColor: 'black' // Color del texto de los elementos de la leyenda
                },
                title: {
                    fontColor: 'black' // Color del texto del título de la leyenda
                },
                generateLabels: function(chart) {
                    // Esta función personalizada permite modificar el color de fondo de los elementos de la leyenda
                    var labels = Chart.defaults.global.legend.labels.generateLabels(chart);
                    labels.forEach(function(label) {
                        label.fillStyle = 'grey'; // Color de fondo de los elementos de la leyenda
                    });
                    return labels;
                }
            },
            title: {
                display: true,
                text: dataGeneral[0].tituloGrafico,
                fontColor: 'black' // Color del texto del título del gráfico
            }
        }
    }
});

var coloresBarras = ['red', 'blue', 'green', 'yellow'];

Object.keys(arreglosSeparados).forEach(propiedadArray => {
    if (propiedadArray !== 'nombre') {
        myChart.data.datasets.push({
            label: propiedadArray,
            data: arreglosSeparados[propiedadArray],
            backgroundColor: coloresBarras, // Utilizar el mismo color para todas las barras
            borderColor: coloresBarras, // Utilizar el mismo color para el borde de las barras
            borderWidth: 1
        });
    }
})

myChart.update();
