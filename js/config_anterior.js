//COLORES DE LOS DATOS DE LA GRAFICA
var colores = [
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



var dataset_elimina = [];
var List_ocultaSelectSets = ['bar', 'line', 'radar'];


document.getElementById("titulo1").textContent = dataGeneral[0].titulo1;
document.getElementById("titulo2").textContent = dataGeneral[0].titulo2;
document.getElementById("titulo3").textContent = dataGeneral[0].titulo3;
document.getElementById("tituloGrfico").textContent = dataGeneral[0].tituloGrafico


//encabezados generales del reporte, necesarios para el pdf




dataFiltros.forEach(function (filtro) {
    var td_drescripcio = document.createElement("td");
    var td_filtro = document.createElement("td");

    var nuevoTR = document.createElement("tr");
    if (filtro.DES === 'Cancelados') {
        filtro.FILTRO = 'SI'
    }
    td_drescripcio.textContent = filtro.DES;
    td_filtro.textContent = filtro.FILTRO;
    nuevoTR.appendChild(td_drescripcio);
    nuevoTR.appendChild(td_filtro);

    document.getElementById("mi_tabla").getElementsByTagName('tbody')[0].appendChild(nuevoTR);

});



//******************enlista los data set de manera dinamica, segun vengnan del data.js
var arreglosSeparados = {};
var arregloDistribuciones = [];
dataSisc.forEach(function (objeto) {
    Object.keys(objeto).forEach(function (propiedad) {
        if (!arreglosSeparados[propiedad]) {
            arreglosSeparados[propiedad] = [];
        }
        arreglosSeparados[propiedad].push(objeto[propiedad]);
    });

    Object.entries(objeto).forEach(([key, value]) => {
        if (!isNaN(value)) {

        } else {
            arregloDistribuciones.push(value);
        }
        //console.log("KEY: "+key+" value: "+value);
    });

});
arregloDistribuciones = [...new Set(arregloDistribuciones)];
//console.log("distribuciones: "+[...new Set(arregloDistribuciones)]);

var selectTipoGrafico = document.getElementById('tipoGrafico'); //aqui esta los tipos de graficos ()
//para ocultar el select de dataset a ocultar
selectTipoGrafico.addEventListener('change', function () {
    DeshabiliarSelectDataSets(selectTipoGrafico);
});

function DeshabiliarSelectDataSets(selectTipoGrafico) {
    var tipoGrafico = selectTipoGrafico.value;

    if (tipoGrafico === 'bar' || tipoGrafico === 'line' || tipoGrafico === 'radar') {
        document.getElementById('Seleccion_DeDatas').style.display = 'none';
    } else {
        document.getElementById('Seleccion_DeDatas').style.display = 'block';
    }
}





//se llena la lista para el combobox  de dataset a ocultar y
//actualiza el chart al cambiar la opcion de tipo de charts

Object.keys(arreglosSeparados).forEach(propiedadArray => {
    if (propiedadArray.toLowerCase() !== 'nombre') {
        dataset_elimina.push(propiedadArray);
    }
})










var dropDistribucion = document.getElementById('dropDistribucion');
arregloDistribuciones.forEach(function (distibucion) {
    var listItem = document.createElement('li');
    var link = document.createElement('a');
    link.classList.add('dropdown-item');
    link.href = '#';
    link.textContent = distibucion;
    link.addEventListener('click', function () {
        event.preventDefault();
        CambiarDistribucion(distibucion, link);
    });
    listItem.appendChild(link);
    dropDistribucion.appendChild(listItem);
})


//llena el combobox dedataseta a ocultar
var dropdownMenu = document.getElementById('dropdownMenu');
//console.log(dataset_elimina);
dataset_elimina.forEach(function (dataset) {
    var listItem = document.createElement('li');
    var link = document.createElement('a');
    link.classList.add('dropdown-item');
    link.href = '#';
    link.textContent = dataset + ' ✔️';
    link.addEventListener('click', function () {
        event.preventDefault();
        toggleDataset(dataset, link);
    });
    listItem.appendChild(link);
    dropdownMenu.appendChild(listItem);
});

//para ocultar los data set desde el combox
function toggleDataset(label, link) {

    var datasetIndex = myChart.data.datasets.findIndex(dataset => dataset.label === label);

    if (datasetIndex !== -1) {
        myChart.data.datasets[datasetIndex].hidden = !myChart.data.datasets[datasetIndex].hidden;

    }
    if (!myChart.data.datasets[datasetIndex].hidden) {
        link.textContent = label + ' ✔️';
        link.title = 'Ocultar';
    } else {
        link.textContent = label + ' ✖️';
        link.title = 'Mostar';
    }
    myChart.update();
}

function CambiarDistribucion(distibucion, link) {
    //var DistibucionSelccionada = document.getElementById('dropDistribucion').value;
    const result = dataSisc.filter((word) => word["Nombre2"] === "AHORROS");
    //var dataFiltrada = dataSisc.filter(item => item["Nombre2"] === distibucion || distibucion === '');
    console.log("distibucion: " + distibucion + "  datafiltrada: " + JSON.stringify(result));

    // myChart.update();
}






var ctx = document.getElementById('myChart').getContext('2d');
var myChart;

function updateChart(selectedType) {
    if (myChart) {
        myChart.destroy(); // Destruye el gráfico existente si hay alguno
    }

    myChart = new Chart(ctx, {
        type: selectedType,
        data: {
            labels: arreglosSeparados.Nombre,
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            indexAxis: 'x', //para cambiar el eje principal al y o x

            plugins: {
                legend: {
                    labels: {
                    },
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: dataGeneral[0].tituloGrafico
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',//'logarithmic',
                    // ticks: {
                    //     callback: function (value, index, values) {
                    //         return Number(value.toString());//pass tick values as a string into Number function
                    //     }
                    // },
                    // Edita las escalas del eje Y
                    //min: 500, // Valor mínimo del eje Y
                    //max: 50000000, // Valor máximo del eje Y
                    //stepSize: 1, // Tamaño del paso entre los valores del eje Y
                    // Otros ajustes del eje Y
                    title: {
                        display: false,
                        text: 'Valor'
                    },
                    //stacked: true
                },
                x: {
                    //stacked: true,
                },
            }
        }
    });

    Object.keys(arreglosSeparados).forEach(propiedadArray => {
        var nombre = 'nombre';
        var nombre2 = 'tipo cuenta.';


        if (propiedadArray.toLowerCase() !== nombre.toLowerCase()) {

            dataset_elimina.push(propiedadArray.toUpperCase());
            myChart.data.datasets.push({
                label: propiedadArray,
                data: arreglosSeparados[propiedadArray],
                backgroundColor: colores,
                borderColor: colores,
                borderWidth: 3,
                //stack: propiedadArray.toLowerCase()==='monto principal' || propiedadArray.toLowerCase()==='monto intereses'? 'Stack 0':'Stack 1',
            });
        }

    });
    myChart.update();
}

document.getElementById('tipoGrafico').addEventListener('change', function () {
    var selectedType = this.value;
    // console.log(selectedType);
    updateChart(selectedType);
});

if (List_ocultaSelectSets.includes(document.getElementById('tipoGrafico').value)) {
    document.getElementById('Seleccion_DeDatas').style.display = 'none';
}
// Actualiza el gráfico al cargar la página con el valor actual del select
if (dataGeneral[0].tipoGrafico) {
    var select = document.getElementById('tipoGrafico');
    select.value = dataGeneral[0].tipoGrafico;
    DeshabiliarSelectDataSets(select);
    updateChart(dataGeneral[0].tipoGrafico);

} else {
    updateChart(document.getElementById('tipoGrafico').value);
}



//-------------------------------para las dimenciones del mapa----------------------------------------------------------------->
function Ampliar() {
    var contenedorChart = document.getElementById("contenedor_delChart");
    var alturaActual = parseFloat(contenedorChart.style.height.replace('vh', ''));
    var anchoActual = parseFloat(contenedorChart.style.width.replace('vh', ''));
    console.log("socio: " + alturaActual);
    if (alturaActual <= 300) {
        contenedorChart.style.height = (alturaActual * 1.2) + 'vh';
        contenedorChart.style.width = (anchoActual * 1.2) + 'vh';
        console.log("ancho: " + contenedorChart.style.width);
        console.log("Alto: " + contenedorChart.style.height);
    }


}
function Encoger() {
    var contenedorChart = document.getElementById("contenedor_delChart");
    var alturaActual = parseFloat(contenedorChart.style.height.replace('vh', ''));
    var anchoActual = parseFloat(contenedorChart.style.width.replace('vh', ''));
    if (alturaActual >= 80) {
        contenedorChart.style.height = (alturaActual / 1.2) + 'vh';
        contenedorChart.style.width = (anchoActual / 1.2) + 'vh';
        console.log("ancho: " + contenedorChart.style.width);
        console.log("Alto: " + contenedorChart.style.height);
    }

}


function subirAltura(params) {

}
function subirAncho() {
    var contenedorChart = document.getElementById("contenedor_delChart");
    var anchoActual = parseFloat(contenedorChart.style.width.replace('vh', ''));
    var alturaActual = parseFloat(contenedorChart.style.height.replace('vh', ''));
    if (alturaActual >= 80) {
        contenedorChart.style.width = (anchoActual * 1.2) + 'vh';
    }
}

var Escala;
function Escalar() {
    myChart.options.scales.y.type = 'logarithmic';
    myChart.update();
}
function NoEscalar() {
    myChart.options.scales.y.type = 'linear';
    myChart.update();
}
// updateChart('bar');

//intento #22




