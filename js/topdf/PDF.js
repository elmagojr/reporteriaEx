// playground requires you to assign document definition to a variable called dd

var sino = 1;
var body_table = dataFiltros.map(filtro => {
	return [filtro.DES, filtro.FILTRO]
})

var sp_membrete = localStorage.getItem('sp_membrete');
var sp_logo = localStorage.getItem('sp_logo');


function IMPRIME_PDF(BODY_IMAGE, resolucion) {
	//console.log(BODY_IMAGE);

	var dd = {
		pageSize: 'LETTER',
		pageOrientation: 'Portrait',
		// pageMargins: [0, 0, 0, 0],
		//footer: function(currentPage, pageCount) { return currentPage.toString() + ' de ' + pageCount; },
		// header: function(currentPage, pageCount, pageSize) {


		//   return [
		// 	{ text: '', alignment: (currentPage % 2) ? 'left' : 'right' },
		// 	{ canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
		//   ]
		// },
		header: [
			sp_membrete ? {
				image: sp_membrete,
				width: 611,
				height: 30,
				opacity: 0.3,
				alignment: 'center'
			} : {},
		],

		content: [


			{
				style: 'tableExample',
				table: {
					widths: [80, '*'],
					//margin: [40, 0, 40, 0], // Márgenes en puntos: arriba, izquierda, abajo, derecha
					body: [
						[
							sp_logo ? {
								image: sp_logo,
								width: 80,
								height: 80,
							} : {},
							[
								{ text: dataGeneral[0].titulo1, style: 'header', alignment: 'center' },
								{ text: dataGeneral[0].titulo2, style: 'header_dereccion', alignment: 'center' },
								{ text: dataGeneral[0].titulo3, style: 'header_dereccion', alignment: 'center' },
							]

						],
					]
				},
				layout: 'noBorders'
			},
			{
				style: 'tableExample',
				table: {
					widths: ['*'],
					body: [
						[
							{
								image: BODY_IMAGE,
								width: resolucion,
								//height: 551,
								alignment: 'center'
							}
						],
					]
				},
				layout: 'noBorders'
			},


			{ text: 'Listado de Filtros utilizados', style: 'subheader' },

			{
				style: 'tableExample',
				table: {
					widths: ['*', 'auto'],
					body: [
						['Descripción', 'Filtro'],
						...body_table
					]
				}
			}
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				//margin: [0, 0, 0, 10],

			},
			header_dereccion: {
				fontSize: 9,
				bold: true,
				//margin: [0, 0, 0, 10],

			},
			subheader: {
				fontSize: 16,
				bold: true,
				margin: [0, 10, 0, 5]
			},
			tableExample: {
				//margin: [0, 5, 0, 15]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: 'black'
			}
		},
		defaultStyle: {
			// alignment: 'justify'
		}

	};
	// pdfMake.createPdf(dd).open();
	pdfMake.createPdf(dd).open();
	// pdfMake.createPdf(dd).download(dataGeneral[0].tituloGrafico);
}

