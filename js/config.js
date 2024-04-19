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

//HAY QUE PASARLO DESDE EL SISC

var dataGeneral = [{ "titulo1": "COOPERATIVA TAL  LCD HDMI .CV Y TAL", "titulo2": "LA CIUDAD, DEPARTAMENT, 2024", "titulo3": "la otra cosa que no recuerdo que es", "tituloGrafico": "GRÁFICO COLOCACIÓN DE CREDITO GENERAL" }];
var dataFiltros =[{"filtro":"filtro1"},{"filtro":"filtro2"},{"filtro":"filtro3"}]
var setsDataEncabezados =[{"NombreEncabezado":"Valor de Capital"},{"NombreEncabezado":"Cantidad"}];
//CONTRUCCION DE GRAFICO

var titulos = [];
var cantidades = [];
var valores = [];
var ColumsSets = [];

document.getElementById("titulo1").textContent = dataGeneral[0].titulo1;
document.getElementById("titulo2").textContent = dataGeneral[0].titulo2;
document.getElementById("titulo3").textContent = dataGeneral[0].titulo3;
document.getElementById("tituloGrfico").textContent = dataGeneral[0].tituloGrafico

dataSisc.forEach(function (item) {
    titulos.push(item.nombre);
    cantidades.push(item.cantidad);
    valores.push(item.valor);
});
setsDataEncabezados.forEach(function (item) {
    ColumsSets.push(item.NombreEncabezado);   
});
dataFiltros.forEach(function (filtro) {
    var nuevoli= document.createElement("li");
    nuevoli.className ="list-group-item d-flex justify-content-between align-items-center";
    nuevoli.textContent = filtro.filtro;
    document.getElementById("lis_filtro").appendChild(nuevoli);

});

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
                    color: 'red',
                    
                  },
                position: 'top',
                
            },
            title: {
                display: true,
                text: dataGeneral[0].tituloGrafico
            }
        }
    }
});


var coloresBarras = ['red', 'blue', 'green', 'yellow'];

Object.keys(arreglosSeparados).forEach(propiedadArray=>{
  

    if (propiedadArray !== 'nombre') {
         
        myChart.data.datasets.push({
            label: propiedadArray,
            data: arreglosSeparados[propiedadArray],
            backgroundColor: colores,
            borderColor: colores,
            borderWidth: 1
        });   
    } 
    
})

 myChart.update(); 











