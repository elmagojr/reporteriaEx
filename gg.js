var dataGeneral = [{ "titulo1": "", 
"titulo2": "LA CIUDAD, DEPARTAMENT, 2024", 
"titulo3": "la otra cosa que no recuerdo que es", 
"tituloGrafico": "GRÁFICO COLOCACIÓN DE CREDITO GENERAL" }];

con('{"nombre":"',F_Variables.STRING4,'","cantidad":"',F_Variables.LONG1,'","Monto":"',F_Variables.MONTO2,'"},')

con('var dataGeneral = [{ "titulo1": ',chr(39),Parametros.PAR_NOMBRE,chr(39),',') 
con('"titulo2": ',chr(39),Parametros.PAR_DIRECCIION_1,chr(39),',') 
con('"titulo3": ',chr(39),Parametros.PAR_DIRECCION_2,chr(39), ',') 
con('"tituloGrafico": ',chr(39),F_REP_EX.EX_1,chr(39),' }];')






con('{ "DES":"', F_REP_EX.EX_14, '", "FILTRO": "',F_REP_EX.EX_15,'" },')