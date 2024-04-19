// playground requires you to assign document definition to a variable called dd

var sino = 1;

function IMPRIME_PDF(BODY_IMAGE, logoEx) {
	//console.log(BODY_IMAGE);
	var dd = {
		pageSize: 'LETTER',
		pageOrientation: 'portrait',
		footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
		header: function(currentPage, pageCount, pageSize) {
		  
	  
		  return [
			{ text: '', alignment: (currentPage % 2) ? 'left' : 'right' },
			{ canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
		  ]
		},
		content: [
			
			{
				style: 'tableExample',
				table: {
					widths: [80, '*'],
					body: [
						[
							sino===1?{
								image: logoEx,
								width: 80,
								height: 80,
								}:{},
							[
								{text: 'COOPERATIVA TAL DE CV . SDL', style: 'header',alignment: 'center'},
								{text: 'Subtiutlo nuemro 2 ', style: 'header',alignment: 'center'},
								{text: 'Subtitulo 30', style: 'header',alignment: 'center'},								 
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
							image:BODY_IMAGE ,						
							width: 500,
							//height: 551,
							alignment: 'center'
							}
						],					
					]
				},
				layout: 'noBorders'
			},
			
			'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
			{text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
			'The following table has nothing more than a body array',
			{
				style: 'tableExample',
				table: {
					body: [
						['Column 1', 'Column 2', 'Column 3'],
						['One value goes here', 'Another one here', 'OK?']
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
	pdfMake.createPdf(dd).open();
}

