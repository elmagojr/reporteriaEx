//COLORES DE LOS DATOS DE LA GRAFICA
var colores = [
    'rgba(237, 157, 203, 0.5)',
    'rgba(49, 135, 45, 0.5)',
    'rgba(40, 203, 253, 0.5)',
    'rgba(204, 132, 231, 0.5)',
    'rgba(168, 50, 53, 0.5)',
    'rgba(235, 204, 78, 0.5)',
    'rgba(128, 230, 74, 0.5)',
    'rgba(75, 148, 27, 0.5)',
    'rgba(118, 99, 176, 0.5)',
    'rgba(147, 109, 191, 0.5)',
    'rgba(169, 231, 223, 0.5)',
    'rgba(225, 30, 55, 0.5)',
    'rgba(20, 61, 204, 0.5)',
    'rgba(212, 175, 116, 0.5)',
    'rgba(33, 46, 85, 0.5)',
    'rgba(138, 33, 147, 0.5)',
    'rgba(229, 125, 97, 0.5)',
    'rgba(252, 179, 41, 0.5)',
    'rgba(107, 18, 82, 0.5)',
    'rgba(37, 65, 42, 0.5)',
    'rgba(147, 205, 38, 0.5)',
    'rgba(236, 44, 38, 0.5)',
    'rgba(21, 219, 73, 0.5)',
    'rgba(44, 138, 219, 0.5)',
    'rgba(89, 36, 217, 0.5)',
    'rgba(43, 170, 166, 0.5)',
    'rgba(122, 124, 164, 0.5)',
    'rgba(184, 77, 27, 0.5)',
    'rgba(174, 67, 116, 0.5)',
    'rgba(68, 240, 213, 0.5)',
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)'
];

document.addEventListener("DOMContentLoaded", function () {
    var datosList = document.getElementById('datos');
    dataSisc.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = 'Nombre: ' + item.nombre + ', Cantidad: ' + item.cantidad + ', Valor: ' + item.valor;
        datosList.appendChild(li);
    });
});


//CONTRUCCION DE GRAFICO
var dataGeneral =[{"titulo1":"COOPERATIVA TAL  LCD HDMI .CV Y TAL","titulo2":"LA CIUDAD, DEPARTAMENT, 2024","titulo3":"la otra cosa que no recuerdo que es","tituloGrafico":"GRÁFICO COLOCACIÓN DE CREDITO GENERAL"}];
var titulos = [];
var cantidades = [];
var valores = [];

document.getElementById("titulo1").textContent = dataGeneral[0].titulo1;
document.getElementById("titulo2").textContent = dataGeneral[0].titulo2;
document.getElementById("titulo3").textContent = dataGeneral[0].titulo3;

dataSisc.forEach(function (item) {
    titulos.push(item.nombre);
    cantidades.push(item.cantidad);
    valores.push(item.valor);
});

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: titulos,
        datasets: [{
            label: 'Valor de Capital',
            data: valores,
            backgroundColor: colores,
            borderColor: colores,
            borderWidth: 1
        },
        {
            label: 'Cantidad',
            data: cantidades,
            backgroundColor: colores,
            borderColor: colores,
            borderWidth: 1
        }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: dataGeneral[0].tituloGrafico
            }
        }

    }
}); 
