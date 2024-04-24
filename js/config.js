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


var selectTipoGrafico = document.getElementById('tipoGrafico'); //aqui esta los tipos de graficos ()
//para ocultar el select de dataset a ocultar
selectTipoGrafico.addEventListener('change', function () {
    var tipoGrafico = selectTipoGrafico.value;

    if (tipoGrafico === 'bar' || tipoGrafico === 'line' || tipoGrafico === 'radar') {
        document.getElementById('Seleccion_DeDatas').style.display = 'none';
    } else {
        document.getElementById('Seleccion_DeDatas').style.display = 'block';
    }
});






//se llena la lista para el combobox  de dataset a ocultar y
//actualiza el chart al cambiar la opcion de tipo de charts

Object.keys(arreglosSeparados).forEach(propiedadArray => {
    if (propiedadArray.toLowerCase() !== 'nombre') {
        dataset_elimina.push(propiedadArray);
    }
})












//llena el combobox dedataseta a ocultar
var dropdownMenu = document.getElementById('dropdownMenu');
console.log(dataset_elimina);
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
            plugins: {
                legend: {
                    labels: {
                    },
                    position: 'top',
                },
                title: {
                    display: true,
                    text: dataGeneral[0].tituloGrafico
                }
            },
            scales: {
                y: {
                    // stacked: true
                }
            }
        }
    });

    Object.keys(arreglosSeparados).forEach(propiedadArray => {
        var nombre = 'nombre';
        if (propiedadArray.toLowerCase() !== nombre.toLowerCase()) {
            dataset_elimina.push(propiedadArray.toUpperCase());
            myChart.data.datasets.push({
                label: propiedadArray,
                data: arreglosSeparados[propiedadArray],
                backgroundColor: colores,
                borderColor: colores,
                borderWidth: 2,

            });
        }

    });
    myChart.update();
}

document.getElementById('tipoGrafico').addEventListener('change', function () {
    var selectedType = this.value;
    console.log(selectedType);
    updateChart(selectedType);
});

if (List_ocultaSelectSets.includes(document.getElementById('tipoGrafico').value)) {
    document.getElementById('Seleccion_DeDatas').style.display = 'none';
}
// Actualiza el gráfico al cargar la página con el valor actual del select
if (dataGeneral[0].tipoGrafico) {
    updateChart(dataGeneral[0].tipoGrafico);
}else{
    updateChart(document.getElementById('tipoGrafico').value);
}


// updateChart('bar');



