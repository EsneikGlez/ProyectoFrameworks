// JavaScript Document

    $(document).ready(function(){ 
		/*
		$("form").submit(function(event){
			event.preventDefault();
			alert("Fin");
		});
		*/
		$("#ayudaRegistroUVD").click(function(){
			$("#modalRegistroUVD").modal({show: true});
		});

		$.validator.setDefaults( {
			submitHandler: function () {
				enviar(2);
			}
		} );
		
		$( "#form" ).validate( {
			rules: {	
				//tfNombreProyecto: "required"
			},
			messages: {
				//tfNombreProyecto: "Por favor ingrese un nombre para el proyecto"
			},
			errorElement: "em",
			errorPlacement: function ( error, element ) {
				// Add the `help-block` class to the error element
				error.addClass( "help-block" );
				error.removeAttr("id");
				error.attr("id","erro-"+$(element).attr("id"));
				$(element).parents(".error").append(error);
				
			},
			highlight: function ( element, errorClass, validClass ) {
				$( element ).parents( ".error" ).addClass( "has-error" ).removeClass( "has-success" );
			},
			unhighlight: function (element, errorClass, validClass) {
				$( element ).parents( ".error" ).addClass( "has-success" ).removeClass( "has-error" );
			}
		} );
		
		var dias_totales=0;
		var actividades=0;
		var docentes=0;
		var alumnos=15;
		var mostrar=0;
		
        //$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover({html: true, placement: "right", container: 'body'}); 
		
		//Recuperación de Datos desde BD para los selectores
		var fuente = "", tipoBeneficiario = "", dataFacultad="";
		//=> Fuentes de Financiamiento
		$.post("/inc/actions/selectFinanciamiento.php",function(data,status){
				fuente = data;
			}
		);
		//=> Beneficiados
		$.post("/inc/actions/selectBeneficiario.php",function(data,status){
				tipoBeneficiario = data;
			}
		);
		//=> Facultades
		$.post("/inc/actions/selectFacultad.php",function(data,status){
				dataFacultad = data;
			}
		);
		
		//Beneficiarios
		//=>Agregar/Quitar Beneficiarios
		var cbd = 0;
		$("#btngroupBDirectos").on('click','button',function(){
			
			if($(this).attr("id")=="btnAgregarBD"){
				cbd++;
				$("#bDirectos").append('<div id="BD'+cbd+'"><div class="form-group"><span class="help-block">Beneficiarios '+cbd+'</span><hr></div><div class="input-group"> <div class="col-xs-3"><div class="error"><label for="selectTipoBeneficiario'+cbd+'">Tipo de beneficiario:</label><select class="form-control" name="selectTipoBeneficiario'+cbd+'" id="selectTipoBeneficiario'+cbd+'" required title="Seleccione un tipo de beneficiario."><option value="">Seleccione una opción</option><option value="D">Directo</option><option value="I">Indirecto</option></select></div></div> <div class="col-xs-3"><div class="error"><label for="tfcantidadBeneficiarioD'+cbd+'">Cantidad:</label><input class="form-control" type="number" name="tfcantidadBeneficiarioD'+cbd+'" id="tfcantidadBeneficiarioD'+cbd+'" required placeholder="Número de beneficiados" min="1" title="Por favor proporcione la cantidad de beneciados."></div></div>  <div class="col-xs-3" id="colBD'+cbd+'"><div class="error"><label for="selectBeneficiados'+cbd+'">Beneficiados:</label><select name="'+cbd+'" class="form-control" id="selectBeneficiados'+cbd+'" required title="Seleccione un tipo de beneficiado."><option value="">Seleccione una opción</option>'+tipoBeneficiario+'</select></div></div>  <div class="col-xs-3"><div class="error"><label for="tfcantidadBeneficiarioD'+cbd+'">Sexo:</label><br><label class="radio-inline"><input type="radio" name="optradioB'+cbd+'" id="radioSBD'+cbd+'M" value="M" required title="Indique el sexo de los beneficiarios.">Masculino</label><br><label class="radio-inline"><input type="radio" name="optradioB'+cbd+'" id="radioSBD'+cbd+'F" value="F">Femenino</label></div></div> </div></div><hr><br>');
				$("#btnQuitarBD").removeAttr("disabled");
			}
			else{
				$("#BD"+cbd).remove();
				if(cbd==1)
					$("#btnQuitarBD").attr("disabled","true");
				cbd--;
			}
			
		});
		
		//=>Campo Especificar
		$("#bDirectos").on('change','select',function(){
			if($(this).val()=="0"){
				$("#colBD"+$(this).attr("name")).after('<div class="col-xs-3" id="colTBD'+$(this).attr("name")+'"><div class="error"><label for="tfespecificarBD'+$(this).attr("name")+'">Especifique:</label><input class="form-control" type="text" name="tfespecificarBD'+$(this).attr("name")+'" id="tfespecificarBD'+$(this).attr("name")+'" required title="Ingrese el tipo de beneficiario." placeholder="Especifique tipo de beneficiario" maxlength="100"></div></div>')
			}
			else{
				$("#colTBD"+$(this).attr("name")).remove();
			}
		});
		
		
		//Selector de Sector
		$("#sector0").change(function(){
			if($(this).attr("checked")==null){
				$(this).attr("checked","checked");
				var contenido = "<div class='error' id='divOtroSector'><div class='input-group'><span class='input-group-addon'>Especifique</span><input name='tfNombreSector' id='tfNombreSector' type='text' class='form-control' name='msg' title='Por favor ingrese el sector.' placeholder='Ingrese el sector' maxlength='100' required='required'></div></div>";
				$("#formSector").append(contenido);
			}
			else{
				$("#divOtroSector").remove();
				$(this).removeAttr("checked");
			}
		
		});
		
		/*
		//Limitador de checks
		$.fn.limitarCheckbox = function(num) {
		var check = this;
		this.click(function(){ return (check.filter(":checked").length<=num); });      
		}
		
		//Limitación de checks en vinculaciones
		$(".classVinculacion:checkbox").limitarCheckbox(2);
		*/
		
		//Agregado de nuevos elementos
		var DO1M=2,DO2M=2,DO3M=2,DO4M=2,DO5M=2,DO=3; 
		var IO1M=2,IO2M=2,IO3M=2,IO4M=2,IO5M=2,IO=3;
		var EO1M=2,EO2M=2,EO3M=2,EO4M=2,EO5M=2,EO=3;
		//=>int Minímo de elementos, int Máximo de elementos, String id boton agregar, String id boton quitar, String Elemento de referencia o elemento existente(ej. tfElemento1 -> tfelemento), String id del contenedor en donde se va a insertar, String Contenido a insertar (ej. tfelementoReplace), String contenedor o elemento a eliminar (ej. tfelementoReplace)  
		$.fn.limitarClicks = function(min_elements, max_elements, add, remove, elementos, pos_insertar,insertar,deleterow) 
		{
			this.on('click',function()
			{
				var id = $(this).attr("id");
				var elementos_actuales = $("[id^='"+elementos+"']").length;
			
				if(id == add && elementos_actuales+1<=max_elements)
				{
					elementos_actuales++;
					$("#"+remove).removeAttr("disabled");
					$("#"+pos_insertar).append(insertar.replace(/Replace/g,""+String(elementos_actuales)+""));
					

					if(id=="btnAgregarDO"||id=="btnAgregarIO"||id=="btnAgregarEO"){
						if(id=="btnAgregarDO"){
							DO++;
							objetivo = DO;
							tipo_objetivo = "D";
						}
						else if(id=="btnAgregarIO"){
							IO++;
							objetivo = IO;
							tipo_objetivo = "I";
						}
						else{
							EO++;
							objetivo = EO;
							tipo_objetivo = "E";
						}
						$("#"+pos_insertar).find('#btnAgregar'+tipo_objetivo+'O'+objetivo+'M1, #btnQuitar'+tipo_objetivo+'O'+objetivo+'M1').limitarClicks(1,3,'btnAgregar'+tipo_objetivo+'O'+objetivo+'M1','btnQuitar'+tipo_objetivo+'O'+objetivo+'M1','Meta'+tipo_objetivo+'O'+objetivo+'M','dinamic'+tipo_objetivo+'O'+objetivo+'M1','<div class="row" id="Meta'+tipo_objetivo+'O'+objetivo+'MReplace"> <!-- Fila C2--><div class="col-md-6"><br><div class="error"><label for="tf'+tipo_objetivo+'O'+objetivo+'MReplace">'+objetivo+'.Replace - Meta</label><textarea class="form-control" name="tfmeta'+tipo_objetivo+'O'+objetivo+'MReplace" id="tfmeta'+tipo_objetivo+'O'+objetivo+'MReplace" placeholder="Descripción de la meta" title="Describa la meta." required maxlength="200"></textarea></div> <div class="error"><label for="tfC'+tipo_objetivo+'O'+objetivo+'MReplace"> Cantidad:</label><input class="form-control" type="number" name="tfC'+tipo_objetivo+'O'+objetivo+'MReplace" id="tfC'+tipo_objetivo+'O'+objetivo+'MReplace" title="Ingrese la cantidad de la meta." required min="1"></div></div><!--C2--><div class="col-md-6" id="c3'+tipo_objetivo+'O'+objetivo+'MReplace"> <!--C3--> <div class="row"> <!--Filas C3--><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O'+objetivo+'MReplaceA1">'+objetivo+'.Replace.1 - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O'+objetivo+'MReplaceA1" id="tf'+tipo_objetivo+'O'+objetivo+'MReplaceA1" placeholder="Describa la actividad" title="Describa la actividad." required maxlength="200"></textarea></div><br></div></div><div id="dinamic'+tipo_objetivo+'O'+objetivo+'MReplaceA1"><!--Conteni'+tipo_objetivo+'O dinámico--></div><div class="row" id="rowbtnp'+tipo_objetivo+'O'+objetivo+'MReplaceA1"> <!--Filas C3--><div class="col-md-12"><div class="btn-group btn-group-justified" id="btngroup'+tipo_objetivo+'O'+objetivo+'MReplaceA1"><div class="btn-group"><button type="button" class="btn btn-success" id="btnAgregar'+tipo_objetivo+'O'+objetivo+'MReplaceA" title="Agregar una nueva Actividad"><span class="glyphicon glyphicon-plus"> Actividad</span></button></div><div class="btn-group"><button disabled type="button" class="btn btn-danger" id="btnQuitar'+tipo_objetivo+'O'+objetivo+'MReplaceA1" title="Quitar Actividad"><span class="glyphicon glyphicon-minus"> Actividad</button></div></div></div></div></div> <!--Fin C3--></div> <!-- Fin Fila C2-->','Meta'+tipo_objetivo+'O'+objetivo+'M');		
						$("#"+pos_insertar).find('#btnAgregar'+tipo_objetivo+'O'+objetivo+'M1A, #btnQuitarActividad'+tipo_objetivo+'O'+objetivo+'M1A').limitarClicks(1,3,'btnAgregar'+tipo_objetivo+'O'+objetivo+'M1A','btnQuitarActividad'+tipo_objetivo+'O'+objetivo+'M1A','tf'+tipo_objetivo+'O'+objetivo+'M1A','dinamic'+tipo_objetivo+'O'+objetivo+'M1A','<div class="row" id="row'+tipo_objetivo+'O'+objetivo+'M1AReplace"><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O'+objetivo+'M1AReplace">'+objetivo+'.1.Replace - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O'+objetivo+'M1AReplace" id="tf'+tipo_objetivo+'O'+objetivo+'M1AReplace" placeholder="Describa la actividad" title="Describa la actividad." required maxlength="200"></textarea></div><br></div></div>','row'+tipo_objetivo+'O'+objetivo+'M1A');
					}
					
					if(id=="btnAgregarDO1M1"||id=="btnAgregarIO1M1" ||id=="btnAgregarEO1M1" ||id=="btnAgregarDO2M1"||id=="btnAgregarIO2M1" ||id=="btnAgregarEO2M1"||id=="btnAgregarDO3M1"||id=="btnAgregarIO3M1"||id=="btnAgregarEO3M1"||id=="btnAgregarDO4M1"||id=="btnAgregarIO4M1"||id=="btnAgregarEO4M1"||id=="btnAgregarDO5M1"||id=="btnAgregarIO5M1"||id=="btnAgregarEO5M1"){

						if(id=="btnAgregarDO1M1"||id=="btnAgregarIO1M1" ||id=="btnAgregarEO1M1"){
							objetivo=1;
							if(id=="btnAgregarDO1M1"){
								meta = DO1M;
								DO1M++;
								tipo_objetivo = "D";
							}
							else if(id=="btnAgregarIO1M1"){
								meta = IO1M;
								IO1M++;
								tipo_objetivo = "I";
							}
							else{
								meta = EO1M;
								EO1M++;
								tipo_objetivo = "E";
							}
						}
						else if (id=="btnAgregarDO2M1"||id=="btnAgregarIO2M1" ||id=="btnAgregarEO2M1"){				
							objetivo=2;
							if(id=="btnAgregarDO2M1"){
								meta = DO2M;
								DO2M++;
								tipo_objetivo = "D";
							}
							else if(id=="btnAgregarIO2M1"){
								meta = IO2M;
								IO2M++;
								tipo_objetivo = "I";
							}
							else{
								meta = EO2M;
								EO2M++;
								tipo_objetivo = "E";
							}
							
						}
						else if (id=="btnAgregarDO3M1"||id=="btnAgregarIO3M1" ||id=="btnAgregarEO3M1"){
							objetivo=3;
							if(id=="btnAgregarDO3M1"){
								meta = DO3M;
								DO3M++;
								tipo_objetivo = "D";
							}
							else if(id=="btnAgregarIO3M1"){
								meta = IO3M;
								IO3M++;
								tipo_objetivo = "I";
							}
							else{
								meta = EO3M;
								EO3M++;
								tipo_objetivo = "E";
							}
						}
						else if (id=="btnAgregarDO4M1"||id=="btnAgregarIO4M1" ||id=="btnAgregarEO4M1"){
							objetivo=4;
							if(id=="btnAgregarDO4M1"){
								meta = DO4M;
								DO4M++;
								tipo_objetivo = "D";
							}
							else if(id=="btnAgregarIO4M1"){
								meta = IO4M;
								IO4M++;
								tipo_objetivo = "I";
							}
							else{
								meta = EO4M;
								EO4M++;
								tipo_objetivo = "E";
							}
						}
						else if (id=="btnAgregarDO5M1"||id=="btnAgregarIO5M1" ||id=="btnAgregarEO5M1"){
							objetivo=5;
							if(id=="btnAgregarDO5M1"){
								meta = DO5M;
								DO5M++;
								tipo_objetivo = "D";
							}
							else if(id=="btnAgregarIO5M1"){
								meta = IO5M;
								IO5M++;
								tipo_objetivo = "I";
							}
							else{
								meta = EO5M;
								EO5M++;
								tipo_objetivo = "E";
							}
						}

					$("#"+pos_insertar).find('#btnAgregar'+tipo_objetivo+'O'+objetivo+'M'+meta+'A, #btnQuitar'+tipo_objetivo+'O'+objetivo+'M'+meta+'A1').limitarClicks(1,3,"btnAgregar"+tipo_objetivo+"O"+objetivo+"M"+meta+"A","btnQuitar"+tipo_objetivo+"O"+objetivo+"M"+meta+"A1","tf"+tipo_objetivo+"O"+objetivo+"M"+meta+"A","dinamic"+tipo_objetivo+"O"+objetivo+"M"+meta+"A1",'<div class="row" id="row'+tipo_objetivo+'O'+objetivo+'M'+meta+'AReplace"><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O'+objetivo+'M'+meta+'AReplace">'+objetivo+'.'+meta+'.Replace - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O'+objetivo+'M'+meta+'AReplace" id="tf'+tipo_objetivo+'O'+objetivo+'M'+meta+'AReplace" placeholder="Describa la actividad" title="Describa la actividad." required maxlength="200"></textarea></div><br></div></div>',"row"+tipo_objetivo+"O"+objetivo+"M"+meta+"A");
					}
					
					$('[name^="tfActividad"]').change(function(){addActividad_Cronograma(1);});
					
					if(elementos_actuales==max_elements)
						$("#"+add).attr("disabled","true");
					
				}
				else if(elementos_actuales>min_elements){
					if(id=="btnQuitarDO1M1"||id=="btnQuitarIO1M1" ||id=="btnQuitarEO1M1" ||id=="btnQuitarDO2M1"||id=="btnQuitarIO2M1" ||id=="btnQuitarEO2M1" ||id=="btnQuitarDO3M1"||id=="btnQuitarIO3M1" ||id=="btnQuitarEO3M1" ||id=="btnQuitarDO4M1"||id=="btnQuitarIO4M1" ||id=="btnQuitarEO4M1" ||id=="btnQuitarDO5M1"||id=="btnQuitarIO5M1" ||id=="btnQuitarEO5M1"){
						if(id=="btnQuitarDO1M1"||id=="btnQuitarIO1M1" ||id=="btnQuitarEO1M1"){
							if(id=="btnQuitarDO1M1")
								DO1M--;
							else if(id=="btnQuitarIO1M1")
								IO1M--;
							else
								EO1M--;
						}
						else if (id=="btnQuitarDO2M1"||id=="btnQuitarIO2M1" ||id=="btnQuitarEO2M1"){				
							if(id=="btnQuitarDO2M1")
								DO2M--;
							else if(id=="btnQuitarIO2M1")
								IO2M--;
							else
								EO2M--;
						}
						else if (id=="btnQuitarDO3M1"||id=="btnQuitarIO3M1" ||id=="btnQuitarEO3M1"){
							if(id=="btnQuitarDO3M1")
								DO3M--;
							else if(id=="btnQuitarIO3M1")
								IO3M--;
							else
								EO3M--;
						}
						else if (id=="btnQuitarDO4M1"||id=="btnQuitarIO4M1" ||id=="btnQuitarEO4M1"){
							if(id=="btnQuitarDO4M1")
								DO4M--;
							else if(id=="btnQuitarIO4M1")
								IO4M--;
							else
								EO4M--;
						}
						else if (id=="btnQuitarDO5M1"||id=="btnQuitarIO5M1" ||id=="btnQuitarEO5M1"){
							if(id=="btnQuitarDO5M1")
								DO5M--;
							else if(id=="btnQuitarIO5M1")
								IO5M--;
							else
								EO5M--;
						}
					}
					if(id=="btnQuitarDO"||id=="btnQuitarIO"||id=="btnQuitarEO"){
						if(id=="btnQuitarDO")
							DO--;
						else if(id=="btnQuitarIO")
							IO--;
						else
							EO--;
					}
					$("#"+deleterow+elementos_actuales).remove();
					$("#"+add).removeAttr("disabled");
					if(elementos_actuales==min_elements+1)
						$("#"+remove).attr("disabled","true");
					elementos_actuales--;
				}	
			});      
		}	
		// *** Fin Agregado de nuevos elementos ***
		
		//Objetivos Específicos
		var tipo_objetivo="";
		for(var i=1;i<=3;i++){
			switch(i){
				case 1:
					tipo_objetivo = "D";
					break;
				case 2:
					tipo_objetivo = "I";
					break;
				case 3:
					tipo_objetivo = "E";
					break;
			}
			//Actividad
			$('#btnAgregar'+tipo_objetivo+'O1M1A, #btnQuitarActividad'+tipo_objetivo+'O1M1A').limitarClicks(1,3,'btnAgregar'+tipo_objetivo+'O1M1A','btnQuitarActividad'+tipo_objetivo+'O1M1A','tf'+tipo_objetivo+'O1M1A','dinamic'+tipo_objetivo+'O1M1A','<div class="row" id="row'+tipo_objetivo+'O1M1AReplace"><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O1M1AReplace">1.1.Replace - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O1M1AReplace" id="tf'+tipo_objetivo+'O1M1AReplace" title="Describa la actividad." placeholder="Describa la actividad" required maxlength="200"></textarea></div><br></div></div>','row'+tipo_objetivo+'O1M1A');
			$('#btnAgregar'+tipo_objetivo+'O2M1A, #btnQuitarActividad'+tipo_objetivo+'O2M1A').limitarClicks(1,3,'btnAgregar'+tipo_objetivo+'O2M1A','btnQuitarActividad'+tipo_objetivo+'O2M1A','tf'+tipo_objetivo+'O2M1A','dinamic'+tipo_objetivo+'O2M1A','<div class="row" id="row'+tipo_objetivo+'O2M1AReplace"><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O2M1AReplace">2.1.Replace - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O2M1AReplace" id="tf'+tipo_objetivo+'O2M1AReplace" title="Describa la actividad." placeholder="Describa la actividad" required maxlength="200"></textarea></div><br></div></div>','row'+tipo_objetivo+'O2M1A');
			$('#btnAgregar'+tipo_objetivo+'O3M1A, #btnQuitarActividad'+tipo_objetivo+'O3M1A').limitarClicks(1,3,'btnAgregar'+tipo_objetivo+'O3M1A','btnQuitarActividad'+tipo_objetivo+'O3M1A','tf'+tipo_objetivo+'O3M1A','dinamic'+tipo_objetivo+'O3M1A','<div class="row" id="row'+tipo_objetivo+'O3M1AReplace"><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O3M1AReplace">3.1.Replace - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O3M1AReplace" id="tf'+tipo_objetivo+'O3M1AReplace" title="Describa la actividad." placeholder="Describa la actividad" required maxlength="200"></textarea></div><br></div></div>','row'+tipo_objetivo+'O3M1A');
			
		


			//Metas
			$('#btnAgregar'+tipo_objetivo+'O1M1, #btnQuitar'+tipo_objetivo+'O1M1').limitarClicks(1,3,'btnAgregar'+tipo_objetivo+'O1M1','btnQuitar'+tipo_objetivo+'O1M1','Meta'+tipo_objetivo+'O1M','dinamic'+tipo_objetivo+'O1M1','<div class="row" id="Meta'+tipo_objetivo+'O1MReplace"> <!-- Fila C2--><div class="col-md-6"><br><div class="error"><label for="tf'+tipo_objetivo+'O1MReplace">1.Replace - Meta</label><textarea class="form-control" name="tfmeta'+tipo_objetivo+'O1MReplace" id="tfmeta'+tipo_objetivo+'O1MReplace" title="Describa la meta." placeholder="Descripción de la meta" required maxlength="200"></textarea></div> <div class="error"><label for="tfC'+tipo_objetivo+'O1MReplace"> Cantidad:</label><input class="form-control" type="number" name="tfC'+tipo_objetivo+'O1MReplace" id="tfC'+tipo_objetivo+'O1MReplace" title="Ingrese la cantidad de la meta." required min="1"></div></div><!--C2--><div class="col-md-6" id="c3'+tipo_objetivo+'O1MReplace"> <!--C3--> <div class="row"> <!--Filas C3--><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O1MReplaceA1">1.Replace.1 - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O1MReplaceA1" id="tf'+tipo_objetivo+'O1MReplaceA1" title="Describa la actividad." placeholder="Describa la actividad" required maxlength="200"></textarea></div><br></div></div><div id="dinamic'+tipo_objetivo+'O1MReplaceA1"><!--Conteni'+tipo_objetivo+'O dinámico--></div><div class="row" id="rowbtnp'+tipo_objetivo+'O1MReplaceA1"> <!--Filas C3--><div class="col-md-12"><div class="btn-group btn-group-justified" id="btngroup'+tipo_objetivo+'O1MReplaceA1"><div class="btn-group"><button type="button" class="btn btn-success" id="btnAgregar'+tipo_objetivo+'O1MReplaceA" title="Agregar una nueva Actividad"><span class="glyphicon glyphicon-plus"> Actividad</span></button></div><div class="btn-group"><button disabled type="button" class="btn btn-danger" id="btnQuitar'+tipo_objetivo+'O1MReplaceA1" title="Quitar Actividad"><span class="glyphicon glyphicon-minus"> Actividad</button></div></div></div></div></div> <!--Fin C3--></div> <!-- Fin Fila C2-->','Meta'+tipo_objetivo+'O1M');
			$('#btnAgregar'+tipo_objetivo+'O2M1, #btnQuitar'+tipo_objetivo+'O2M1').limitarClicks(1,3,'btnAgregar'+tipo_objetivo+'O2M1','btnQuitar'+tipo_objetivo+'O2M1','Meta'+tipo_objetivo+'O2M','dinamic'+tipo_objetivo+'O2M1','<div class="row" id="Meta'+tipo_objetivo+'O2MReplace"> <!-- Fila C2--><div class="col-md-6"><br><div class="error"><label for="tf'+tipo_objetivo+'O2MReplace">2.Replace - Meta</label><textarea class="form-control" name="tfmeta'+tipo_objetivo+'O2MReplace" id="tfmeta'+tipo_objetivo+'O2MReplace" title="Describa la meta." placeholder="Descripción de la meta" required maxlength="200"></textarea></div> <div class="error"><label for="tfC'+tipo_objetivo+'O2MReplace"> Cantidad:</label><input class="form-control" type="number" name="tfC'+tipo_objetivo+'O2MReplace" id="tfC'+tipo_objetivo+'O2MReplace" title="Ingrese la cantidad de la meta." required min="1"></div></div><!--C2--><div class="col-md-6" id="c3'+tipo_objetivo+'O2MReplace"> <!--C3--> <div class="row"> <!--Filas C3--><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O2MReplaceA1">2.Replace.1 - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O2MReplaceA1" id="tf'+tipo_objetivo+'O2MReplaceA1" title="Describa la actividad." placeholder="Describa la actividad" required maxlength="200"></textarea></div><br></div></div><div id="dinamic'+tipo_objetivo+'O2MReplaceA1"><!--Conteni'+tipo_objetivo+'O dinámico--></div><div class="row" id="rowbtnp'+tipo_objetivo+'O2MReplaceA1"> <!--Filas C3--><div class="col-md-12"><div class="btn-group btn-group-justified" id="btngroup'+tipo_objetivo+'O2MReplaceA1"><div class="btn-group"><button type="button" class="btn btn-success" id="btnAgregar'+tipo_objetivo+'O2MReplaceA" title="Agregar una nueva Actividad"><span class="glyphicon glyphicon-plus"> Actividad</span></button></div><div class="btn-group"><button disabled type="button" class="btn btn-danger" id="btnQuitar'+tipo_objetivo+'O2MReplaceA1" title="Quitar Actividad"><span class="glyphicon glyphicon-minus"> Actividad</button></div></div></div></div></div> <!--Fin C3--></div> <!-- Fin Fila C2-->','Meta'+tipo_objetivo+'O2M');
			$('#btnAgregar'+tipo_objetivo+'O3M1, #btnQuitar'+tipo_objetivo+'O3M1').limitarClicks(1,3,'btnAgregar'+tipo_objetivo+'O3M1','btnQuitar'+tipo_objetivo+'O3M1','Meta'+tipo_objetivo+'O3M','dinamic'+tipo_objetivo+'O3M1','<div class="row" id="Meta'+tipo_objetivo+'O3MReplace"> <!-- Fila C2--><div class="col-md-6"><br><div class="error"><label for="tf'+tipo_objetivo+'O3MReplace">3.Replace - Meta</label><textarea class="form-control" name="tfmeta'+tipo_objetivo+'O3MReplace" id="tfmeta'+tipo_objetivo+'O3MReplace" title="Describa la meta." placeholder="Descripción de la meta" required maxlength="200"></textarea></div> <div class="error"><label for="tfC'+tipo_objetivo+'O3MReplace"> Cantidad:</label><input class="form-control" type="number" name="tfC'+tipo_objetivo+'O3MReplace" id="tfC'+tipo_objetivo+'O3MReplace" title="Ingrese la cantidad de la meta." required min="1"></div></div><!--C2--><div class="col-md-6" id="c3'+tipo_objetivo+'O3MReplace"> <!--C3--> <div class="row"> <!--Filas C3--><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'O3MReplaceA1">3.Replace.1 - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'O3MReplaceA1" id="tf'+tipo_objetivo+'O3MReplaceA1" title="Describa la actividad." placeholder="Describa la actividad" required maxlength="200"></textarea></div><br></div></div><div id="dinamic'+tipo_objetivo+'O3MReplaceA1"><!--Conteni'+tipo_objetivo+'O dinámico--></div><div class="row" id="rowbtnp'+tipo_objetivo+'O3MReplaceA1"> <!--Filas C3--><div class="col-md-12"><div class="btn-group btn-group-justified" id="btngroup'+tipo_objetivo+'O3MReplaceA1"><div class="btn-group"><button type="button" class="btn btn-success" id="btnAgregar'+tipo_objetivo+'O3MReplaceA" title="Agregar una nueva Actividad"><span class="glyphicon glyphicon-plus"> Actividad</span></button></div><div class="btn-group"><button disabled type="button" class="btn btn-danger" id="btnQuitar'+tipo_objetivo+'O3MReplaceA1" title="Quitar Actividad"><span class="glyphicon glyphicon-minus"> Actividad</button></div></div></div></div></div> <!--Fin C3--></div> <!-- Fin Fila C2-->','Meta'+tipo_objetivo+'O3M');
			
			
			
			//Objetivos
			$('#btnAgregar'+tipo_objetivo+'O,#btnQuitar'+tipo_objetivo+'O').limitarClicks(3,5,'btnAgregar'+tipo_objetivo+'O','btnQuitar'+tipo_objetivo+'O',''+tipo_objetivo+'O','dinamic'+tipo_objetivo+'O','<div class="row" id="'+tipo_objetivo+'OReplace"> <!--Inicia Row--><div class="col-md-12"><!--Inicio de contene'+tipo_objetivo+'Or style="background-color:#CCC;"--><div class="row"><div class="col-md-4"><br><div class="error"><label for="tf'+tipo_objetivo+'OReplace">Replace. - Objetivo</label><textarea class="form-control" title="Describa el objetivo." name="tfobjetivo'+tipo_objetivo+'OReplace" id="tfobjetivo'+tipo_objetivo+'OReplace" required placeholder="Descripción del objetivo" maxlength="500" rows="6"></textarea></div><br></div> <!--Columna1--><div class="col-md-8"> <!--Columna 2--> <div class="row" id="Meta'+tipo_objetivo+'OReplaceM1"> <!-- Fila C2--><div class="col-md-6"><br><div class="error"><label for="tf'+tipo_objetivo+'OReplaceM1">Replace.1 - Meta</label><textarea class="form-control" name="tfmeta'+tipo_objetivo+'OReplaceM1" id="tfmeta'+tipo_objetivo+'OReplaceM1" title="Describa la meta." placeholder="Descripción de la meta" required maxlength="200"></textarea></div> <div class="error"><label for="tfC'+tipo_objetivo+'OReplaceM1"> Cantidad:</label><input class="form-control" type="number" name="tfC'+tipo_objetivo+'OReplaceM1" id="tfC'+tipo_objetivo+'OReplaceM1" title="Ingrese la cantidad de la meta." required min="1"></div></div> <!--C2--><div class="col-md-6" id="c3'+tipo_objetivo+'OReplaceM1"> <!--C3--> <div class="row"> <!--Filas C3--><div class="col-md-12"><br><div class="error"><label for="tf'+tipo_objetivo+'OReplaceM1A1">Replace.1.1 - Actividad</label><textarea class="form-control" name="tfActividad'+tipo_objetivo+'OReplaceM1A1" id="tf'+tipo_objetivo+'OReplaceM1A1" title="Describa la actividad." placeholder="Describa la actividad" required maxlength="200"></textarea></div><br></div></div><div id="dinamic'+tipo_objetivo+'OReplaceM1A"><!--Conteni'+tipo_objetivo+'O dinámico--></div><div class="row" id="rowbtn'+tipo_objetivo+'OReplaceM1A"> <!--Filas C3--><div class="col-md-12"><div class="btn-group btn-group-justified" id="btngroup'+tipo_objetivo+'ORepleaceM1A"><div class="btn-group"><button type="button" class="btn btn-success" id="btnAgregar'+tipo_objetivo+'OReplaceM1A" title="Agregar una nueva Actividad"><span class="glyphicon glyphicon-plus"> Actividad</span></button></div><div class="btn-group"><button disabled type="button" class="btn btn-danger" id="btnQuitarActividad'+tipo_objetivo+'OReplaceM1A" title="Quitar Actividad"><span class="glyphicon glyphicon-minus"> Actividad</button></div></div></div></div></div> <!--Fin C3--></div> <!-- Fin Fila C2--><br><div id="dinamic'+tipo_objetivo+'OReplaceM1"><!--Conteni'+tipo_objetivo+'O dinámico--></div><br><div class="row" id="rowbtn'+tipo_objetivo+'OReplaceM1"><div class="btn-group btn-group-justified" id="btngroup'+tipo_objetivo+'OReplaceM1"><div class="btn-group"><button type="button" class="btn btn-success" id="btnAgregar'+tipo_objetivo+'OReplaceM1" title="Agregar una nueva Meta"><span class="glyphicon glyphicon-plus"> Meta</span></button></div><div class="btn-group"><button disabled type="button" class="btn btn-danger" id="btnQuitar'+tipo_objetivo+'OReplaceM1" title="Quitar Meta"><span class="glyphicon glyphicon-minus"> Meta</button></div></div></div></div><!--Fin columna 2-->	</div><!--Fin Row 2--></div><!--Fin contene'+tipo_objetivo+'Or--></div> <!--Fin Row-->',''+tipo_objetivo+'O');
			
			$("#tf"+tipo_objetivo+"O1M1A1").change(function(){addActividad_Cronograma(1);});
			$("#tf"+tipo_objetivo+"O2M1A1").change(function(){addActividad_Cronograma(1);});
			$("#tf"+tipo_objetivo+"O3M1A1").change(function(){addActividad_Cronograma(1);});
		}
		// *** Fin Objetivos Específicos ***
		
		
		//Financiamiento
		function campoFinanciado(){
			$("#financiado").append('<div class="row"><div class="col-lg-6"><div class="error"><div class="input-group"><span class="input-group-addon" id="basic-addon1">Monto $</span><input class="form-control" name="tfMonto" id="tfMonto" type="number" min="1" required title="Por favor ingrese el monto."></div></div><!-- /input-group --></div><!-- /.col-lg-6 --><div class="col-lg-6"><div class="error"><div class="input-group"><span class="input-group-addon" id="basic-addon1">Fuente</span><select class="form-control" name="selectFinanciamiento" id="selectFinanciamiento" required title="Por favor seleccione una fuente de financiamiento."><option value="">Seleccione una opción</option>'+fuente+'</select></div></div><!-- /input-group --></div><!-- /.col-lg-6 --></div><!-- /.row -->');
		}
		
		$("#radioFinanciadoS, #radioFinanciadoN").change(function(){
			if($(this).attr("id")=="radioFinanciadoS"){
				campoFinanciado();
			}
			else
				$("#financiado").empty()
			
		});
		// *** Fin Financiamiento ***
		
		
		//Docentes
		var btnsdocente=0;
		var multiS = "";
		var optionDocente = ""
		var datafacultad = "";
		//=>Campo facultad docentes
		$("#radioDocentes").on('click','input[type="radio"]',function(){
				for(i=1; i<=docentes; i++){
					$("#columnaSelectDocente"+i).remove();
				}
				
				if($(this).attr("id")=="radioMultiS"){
					multiS="true";
					for(i=1; i<=docentes; i++){
						$("#columnaEmailDocente"+i).after("<div class='col-xs-3' id='columnaSelectDocente"+i+"'><div class='error'><label for='selectDocente"+i+"'>Facultad:</label><select class='form-control' name='selectFacultadDocente"+i+"' id='selectFacultadDocente"+i+"' required title='Por favor seleccione una facultad.'><option value=''>Seleccione una opción</option>"+dataFacultad+"</select></div></div>");
					}
				}
				else{
					multiS="false";
				}
					
				if(btnsdocente==0){
					btnsdocente=1;
					$("#btngroupDocente").append('<div class="btn-group btn-group-justified" id="btngroupDocente"><div class="btn-group"><button  type="button" class="btn btn-success" id="btnAgregarDocente"><span class="glyphicon glyphicon-plus-sign"></span>Agregar Docente</button></div>  <div class="btn-group"><button disabled type="button" class="btn btn-danger" id="btnQuitarDocente"><span class="glyphicon glyphicon-minus-sign"></span>Quitar Docente</button> </div> </div>');
					$("#btngroupDocente").find("#btnAgregarDocente").click(function(){addDocente("btnAgregarDocente");});
					$("#btngroupDocente").find("#btnQuitarDocente").click(function(){addDocente("btnQuitarDocente");});
				}
		
		});
		
		//=>Agregar/Quitar docentes
		function addDocente(btn){
				if(btn =="btnAgregarDocente"){
					$("#btnQuitarDocente").removeAttr("disabled");
					docentes++;
					if(docentes<=5){
						var selectDocente="";
						if($("[id^='radioMulti']:checked").val()=='S')
							selectDocente = "<div class='col-xs-3' id='columnaSelectDocente"+docentes+"'><div class='error'><label for='selectDocente"+docentes+"'>Facultad:</label><select class='form-control' name='selectFacultadDocente"+docentes+"' id='selectFacultadDocente"+docentes+"' required title='Por favor seleccione una facultad.'><option value=''>Seleccione una opción</option>"+dataFacultad+"</select></div></div>";

						var nombre = "<div id='divDocente"+docentes+"'><div class='form-group'><span class='help-block'>Docente "+docentes+" Para evitar problemas introduce y verifica la CURP completa del docente</span><hr></div><div class='input-group'><div class='col-xs-3'><div class='error'><label for='tfCURPDocente"+docentes+"'>CURP:</label><input class='form-control' name='tfCURPDocente"+docentes+"' id='tfCURPDocente"+docentes+"' type='text' required onkeyup='javascript:this.value=this.value.toUpperCase();' maxlength='18' minlength='18' title='Por favor ingrese la CURP completa (18 dígitos) del docente.'></div></div> <div class='col-xs-3'><div class='error'><label for='tfNombreDocente"+docentes+"'>Nombre:</label><input class='form-control' name='tfNombreDocente"+docentes+"' id='tfNombreDocente"+docentes+"' type='text' required title='Ingrese el nombre del docente.'></div></div> <div class='col-xs-3'><div class='error'><label for='tfAPaternoDocente"+docentes+"'>Apellido Paterno:</label><input class='form-control' name='tfAPaternoDocente"+docentes+"' id='tfAPaternoDocente"+docentes+"' type='text' required title='Por favor ingrese el apellido paterno del docente.'></div></div> <div class='col-xs-3'><div class='error'><label for='tfAMaternoDocente"+docentes+"'>Apellido Materno:</label><input class='form-control' name='tfAMaternoDocente"+docentes+"' id='tfAMaternoDocente"+docentes+"' type='text' required title='Por favor ingrese el apellido materno del docente.'></div></div> <div class='col-xs-3'><div class='error'><label for='radioSexoDocente"+docentes+"'>Sexo: </label><br><label class='radio-inline'><input type='radio' name='optradioDocente"+docentes+"' id='radioDocente"+docentes+"M' value='M' required title='Por favor seleccione el sexo del docente.'>Masculino</label><br><label class='radio-inline'><input type='radio' name='optradioDocente"+docentes+"' id='radioDocente"+docentes+"F' value='F' >Femenino</label></div></div> <div class='col-xs-3'><div class='error'><label for='selectGradoDocente"+docentes+"'>Grado de estudio: </label><br><select class='form-control' name='selectGradoDocente"+docentes+"' id='selectGradoDocente"+docentes+"' required title='Por favor seleccione el grado de estudio del docente.'><option value=''>Seleccione una opción</option><option value='1'>Licenciatura</option><option value='2'>Maestria</option><option value='3'>Doctorado</option></select></div></div> <div class='col-xs-3' id='columnaEmailDocente"+docentes+"'><div class='error'><label for='tfEmailDocente"+docentes+"'>Email:</label><input class='form-control' name='tfEmailDocente"+docentes+"' id='tfEmailDocente"+docentes+"' type='email' required placeholder='ejemplo@dominio.com' title='Por favor proporcione el correo electrónico del docente.'></div></div>"+selectDocente+"</div><hr><br></div>";
						$("#dinamicDocentes").append(nombre);
						if(docentes==5){
							$("#"+btn).attr("disabled","true");
						}
					}			
				}
				else{
					if(docentes>=1){
						if(docentes==5)
							$("#btnAgregarDocente").removeAttr("disabled");
						$("#divDocente"+docentes).remove();
						if(docentes==1)
							$("#"+btn).attr("disabled","true");
						docentes--;
					} 
				}

		}
		// *** Fin Docentes ***
		
		//Alumnos
		//=>Agregar Alumno
		$("#btnAgregarAlumno").click(function(){
			$("#btnQuitarAlumno").removeAttr("disabled");
			var alumnos = $("[id^='tfMatriculaAlumno']").length+1;
			if(alumnos<=40){
				var nombre = "<div id='divAlumno"+alumnos+"'> <div class='form-group'><span class='help-block'>Alumno "+alumnos+"</span></div> <hr> <div class='input-group'> <div class='col-xs-3'><div class='error'><label for='tfMatriculaAlumno"+alumnos+"'>Matricula:</label><input class='form-control' name='tfMatriculaAlumno"+alumnos+"' id='tfMatriculaAlumno"+alumnos+"' type='text' required title='Ingrese la matrícula del alumno.'></div></div> <div class='col-xs-3'><div class='error'><label for='tfNombreAlumno"+alumnos+"'>Nombre:</label><input class='form-control' name='tfNombreAlumno"+alumnos+"' id='tfNombreAlumno"+alumnos+"' type='text' required title='Ingrese el nombre del alumno.'></div></div> <div class='col-xs-3'><div class='error'><label for='tfAPaternoAlumno"+alumnos+"'>Apellido Paterno:</label><input class='form-control' name='tfAPaternoAlumno"+alumnos+"' id='tfAPaternoAlumno"+alumnos+"' type='text' required title='Ingrese el apellido materno del alumno.'></div></div> <div class='col-xs-3'><div class='error'><label for='tfAMaternoalumno"+alumnos+"'>Apellido Materno:</label><input class='form-control' name='tfAMaternoAlumno"+alumnos+"' id='tfAMaternoAlumno"+alumnos+"' type='text' required title='Ingrese el apellido materno del alumno.'></div></div> <div class='col-xs-3'><div class='error'><label for='radioSexoAlumno"+alumnos+"'>Sexo: </label><br><label class='radio-inline'><input type='radio' name='optradioAl"+alumnos+"' id='radioAlumno"+alumnos+"M' value='M' required title='Indique el sexo del alumno.'>Masculino</label><br><label class='radio-inline'><input type='radio' name='optradioAl"+alumnos+"' id='radioAlumno"+alumnos+"F' value='F'>Femenino</label></div></div> <div class='col-xs-3'><div class='error'><label for='tfSemestrelAlumno"+alumnos+"'>Semestre:</label><input class='form-control' name='tfSemestreAlumno"+alumnos+"' id='tfSemestreAlumno"+alumnos+"'  type='number' required min='1' max='15' value='1' title='Ingrese el número de semestre que cursa el alumno.'></div></div> <div class='col-xs-3'><div class='error'><label for='tfMateriaAlumno"+alumnos+"'>Materia:</label><input class='form-control' name='tfMateriaAlumno"+alumnos+"' id='tfMateriaAlumno"+alumnos+"' type='text' required title='Ingrese la materia que cursa el alumno.'></div></div> <div class='col-xs-3'><div class='error'><label for='tfEmailAlumno"+alumnos+"'>Email:</label><input class='form-control' name='tfEmailAlumno"+alumnos+"' id='tfEmailAlumno"+alumnos+"' type='email' required placeholder='ejemplo@dominio.com' title='Proporcione el correo eléctronico del alumno.'></div></div> </div><hr><br></div>";
				$("#btngroupAlumno").before(nombre);
				if(alumnos==40){
					$(this).attr("disabled","true");
				}
			}
			
			 
		});
			
		//=>Quitar Alumno
		$("#btnQuitarAlumno").click(function(){
			var alumnos = $("[id^='tfMatriculaAlumno']").length;
			if(alumnos>=16){
				if(alumnos==40)
					$("#btnAgregarAlumno").removeAttr("disabled");
				$("#divAlumno"+alumnos).remove();
				if(alumnos==16)
					$(this).attr("disabled","true");
			} 
		});
		// *** Fin Alumnos ***
		
		//Agregar/Quitar Bibliografia
		$('#btnAgregarBibliografia,#btnQuitarBibliografia').limitarClicks(1,10,'btnAgregarBibliografia','btnQuitarBibliografia','tfBibliografia','dinamicBibliografia','<div class="form-group" id="formBiblioReplace"><div class="error"><input id="tfBibliografiaReplace" type="text" class="form-control" name="tfBibliografiaReplace" placeholder="Bibliografía Replace" required title="Ingrese la bibliografia."></div></div>','formBiblio');

		
		//Calendario
		var meses_array=new Array();
        $('#datetimeFechaIn').datetimepicker({
			locale: 'es',
			format : 'DD/MM/YYYY',
			disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24],
			useCurrent: false
		});
		
        $('#datetimeFechaOut').datetimepicker({
			locale: 'es',
			format : 'DD/MM/YYYY',
            useCurrent: false, //Important! See issue #1075
			disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24]
        });
		
        $("#datetimeFechaIn").on("dp.change", function (e) {
            $('#datetimeFechaOut').data("DateTimePicker").minDate(e.date);
			var fecha_entrada = $('#datetimeFechaIn').data("DateTimePicker").date();
			var fecha_salida = $('#datetimeFechaOut').data("DateTimePicker").date();
			if(fecha_salida!=null){
				crearCronograma(fecha_entrada, fecha_salida);
			}
        });
		
        $("#datetimeFechaOut").on("dp.change", function (e) {
			$('#datetimeFechaIn').data("DateTimePicker").maxDate(e.date);
			var fecha_entrada = $('#datetimeFechaIn').data("DateTimePicker").date();
			var fecha_salida = $('#datetimeFechaOut').data("DateTimePicker").date();
			if(fecha_entrada==null){
				$('#datetimeFechaIn').data("DateTimePicker").date(fecha_salida);
			}
			else{
				crearCronograma(fecha_entrada, fecha_salida);
				$("#btnAgregarCronograma").removeAttr("disabled");
			}
			
        });

		function daysInMonth(humanMonth, year) {
		  return new Date(year || new Date().getFullYear(), humanMonth, 0).getDate();
		}
		
		
		//Cronograma => Meses y Fechas
		function crearCronograma(fecha_entrada, fecha_salida){
				var date_in = new Date(fecha_entrada);
				var date_out = new Date(fecha_salida);
				//The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order:
				//var d = new Date(99, 5, 24, 11, 33, 30, 0);
				var date_days_in = new Date(date_in.getFullYear(),date_in.getMonth(),date_in.getDate(),0,0,0,0);
				var date_days_out = new Date(date_out.getFullYear(),date_out.getMonth(),date_out.getDate(),0,0,0,0);
				var total_days = String(date_days_out-date_days_in);
				if(Number(total_days)==0){
					dias_totales = 1;
				}
				else{
					total_days = total_days.slice(0,-5); //un dia equivale a ‪86400000‬ milliseconds
					dias_totales = Math.round(1+Number(total_days)/864);
				}
				for(var i=1;i<=actividades;i++){
					$("#checks"+actividades).remove();
				}
				actividades = 0;
				meses_array.length=0;
				$("#meses").empty();
				$("#dias").empty();
				$("#meses").append('<th class="text-center">Mes</th>');
				$("#dias").append('<th class="text-center">Día</th>');
				var months_string = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
				var months_color = ["active","success","warning","danger","info"];
				var years = date_out.getFullYear() - date_in.getFullYear();
				var month_in = date_in.getMonth();
				var month_out = date_out.getMonth();
				var year_in = date_in.getFullYear();
				var day_in = date_in.getDate();
				var day_out = date_out.getDate();
				var one_year = 0;
				if(years==0)
					one_year=1;
					
				var mes_inicial=0;
				var mes_final=0;
				var color=0;
				var total_meses=0;
				for(var y=0;y<=years;y++){
					if(y==0){
						mes_inicial = month_in;
						if(one_year==1)
							mes_final = month_out;
						else
							mes_final = 11;
					}
					else if(y==years){
						mes_inicial = 0;
						mes_final = month_out;
					}
					else{
						mes_inicial = 0;
						mes_final = 11;
					}
					var dia_inicial=0;
					var dia_final=0;
					for(var i=mes_inicial;i<=mes_final;i++){
						meses_array[total_meses]=new Array(4);
						if(color==4)
							color=0;
						var days_month = daysInMonth(i+1, Number(year_in+y));
						if(mes_inicial==mes_final && y==0){
							dia_inicial = day_in;
							dia_final = day_out;
						}
						else if(i==mes_inicial && y==0){
							dia_inicial = day_in;
							dia_final = days_month;
						}
						else if(i==mes_final && y==years){
							dia_inicial=1;
							dia_final = day_out;
						}
						else{
							dia_inicial=1;
							dia_final = days_month;
						}
						$("#meses").append('<th colspan="'+Number(dia_final-dia_inicial+1)+'" class="'+months_color[color]+' text-center">'+months_string[i]+' '+Number(year_in+y)+'</td>');
						//año,mes,dias,color
						meses_array[total_meses][0]=Number(year_in+y)+'/'+(i+1); //Año y mes
						meses_array[total_meses][1]=dia_inicial; 
						meses_array[total_meses][2]=Number(dia_final-dia_inicial+1); //Total de dias
						total_meses++;
						for(var day=dia_inicial;day<=dia_final; day++){
							$("#dias").append('<td class="'+months_color[color]+' text-center" rowspan="2">'+day+'</td>');
							
						}
						color++;
					}
				}
				addActividad_Cronograma(1);
		}
		
		//Cronograma => Actividades
		var arrayFechasActividades = null;
		var cadenaFechas = null;
		function addActividad_Cronograma(action){
			
			//Salvar Fechas
			var cronograma = new Array();
			cadenaFechas = new Array();
			$("[name^='tfActividad']").each(function(j) {
				cadenaFechas[j] = "";
				if($(this).val()!=""){
					cronograma[j]=new Array();
					cronograma[j][0]=$(this).attr("id");
					cadenaFechas[j] = "";
					$("[id^='f"+cronograma[j][0]+"c']:checked").each(function(i) {
						cronograma[j][i+1]=$(this).val();
						if(i<($("[id^='f"+cronograma[j][0]+"c']:checked").length)-1)
							cadenaFechas[j] += $(this).val()+",";
						else
							cadenaFechas[j] += $(this).val();
					});
				}
			});
			if(action==1)
				arrayFechasActividades = cronograma;
			
			//Limpiar
			/*
			$("[id^='checks']").each(function() {
				$(this).remove();
			});	
			*/
			
			$("#bodyCrono").empty();	
			
			//Checar todos los tf de actividad e insertar
			
			$($("[name^='tfActividad']")).each(function(j) {
				if($(this).val()!=""){
					//var months_color = ["active","success","warning","danger","info"];
					//var color=0;
					var idActividad=$(this).attr("id");
					var desplazar=0;
					var cont=0;
					var contenido_html='<tr id="checks'+(j+1)+'" class="error text-nowrap"><td><label id="f'+idActividad+'" class="help-block">'+$(this).val()+'</label></td>';
					for(var i=1;i<=dias_totales;i++){
						cont++
						if(cont>meses_array[desplazar][2]){
							desplazar++;
							cont=1;
							//color++;
						}
						
						//if(color==5)
						//	color=0;
						
						var fechaTitle = meses_array[desplazar][0].split("/");	
						fechaTitle = (meses_array[desplazar][1]+cont-1)+'/'+fechaTitle[1]+'/'+fechaTitle[0];
						
						//class="text-center '+months_color[color]+'"
						contenido_html = contenido_html+'<td class="text-center" title="'+fechaTitle+'"><input required name="fila'+idActividad+'[]" title="Seleccione la o las fechas para esta actividad" type="checkbox" id="f'+idActividad+'c'+meses_array[desplazar][0]+'/'+(meses_array[desplazar][1]+cont-1)+'" value="'+meses_array[desplazar][0]+'/'+(meses_array[desplazar][1]+cont-1)+'" aria-label="..."></td>';
						
					}
					contenido_html = contenido_html+"</tr>";
					$("#bodyCrono").append(contenido_html);
					
					$.each(arrayFechasActividades, function(i,activity){
						$.each(activity, function(x){
							if(idActividad==activity[0]){
								$("[id='f"+idActividad+"c"+activity[x]+"']").attr("checked", "true");
							}
						});
					});
				}
				

			});
			
			
		}
	
	
		//$("#cronograma").click(function(){addActividad_Cronograma(1);});
		//End cronograma
		
		//Mostrar u Ocultar todos los campos
		$("#btnMostrarCampos").click(function(){
			if($(this).val()==0){
				$(this).empty();
				$(this).append('<span class="glyphicon glyphicon-eye-close"></span> Ocultar Todos los Campos');
				$(this).attr("value","1");
				//$('#accordion .panel-collapse').collapse('show');	
				
				//$("[data-toggle='collapse']").attr("aria-expanded","true");
				//$("[data-toggle='collapse']").attr("class","");
				$("[href^='collapse']").attr("aria-expanded","true");
				$("[href^='collapse']").attr("class","");
				$("[class='panel-collapse collapse']").removeClass("in");
				$("[class='panel-collapse collapse']").addClass("in");
				$("[class='panel-collapse collapse in']").attr("aria-expanded","true");
				$("[class='panel-collapse collapse in']").attr("style","");
			}
			else{
				$(this).empty();
				$(this).append('<span class="glyphicon glyphicon-eye-open"></span> Mostrar Todos los Campos');
				$(this).attr("value","0");
				//$('#accordion .panel-collapse').collapse('hide');
				//$("[data-toggle='collapse']").attr("aria-expanded","false");
				//$("[data-toggle='collapse']").attr("class","collapsed");
				$("[href^='collapse']").attr("aria-expanded","false");
				$("[href^='collapse']").attr("class","collapsed");
				$("[class='panel-collapse collapse in']").removeClass("in");
				$("[class='panel-collapse collapse']").attr("aria-expanded","false");
				$("[class='panel-collapse collapse']").attr("style","height: 0px;");
			}
			
		});
		
		
		//Registrar UVD
		$("#btnRegistrarUVD").click(function(){
			/*
			$("#saving").modal({
				show: true,
			});
			$("#modalHeader, #modalBody, #modalFooter").empty();
			$("#modalHeader").append('<button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">¿Está seguro de registrar la UVD?</h4>');
			$("#modalBody").append('<h5>Al registrar el proyecto ya no podrá ser modificado. <br>Para poder registrar la UVD asegurese de que se hayan llenado todos los campos requeridos.</h5>');
			$("#modalFooter").append('<button type="button" class="btn btn-default" data-dismiss="modal" id="btnCancel">Cancelar</button><button type="button" class="btn btn-default" data-dismiss="modal" id="btnOK">Aceptar</button>');
			*/
					
			var confirmar = confirm("¿Está seguro de registrar la UVD?\n* Al registrar el proyecto ya no podrá ser modificado. \n* Para poder registrar la UVD asegurese de que se hayan llenado todos los campos requeridos."); 
			if(confirmar){
				$("#btnMostrarCampos").empty();
				$("#btnMostrarCampos").append('<span class="glyphicon glyphicon-eye-close"></span> Ocultar Todos los Campos');
				$("#btnMostrarCampos").attr("value","1");
				//$('#accordion .panel-collapse').collapse('show');
				addActividad_Cronograma(1);
				$("#btnMostrarCampos").attr("value","0");
				$("#btnMostrarCampos").click();
				return true;
			}
			else
				return false;
			
		});
		
		//Guardad UVD
		$("#btnGC, #btnGC2").click(function(){
			enviar(1);
		});
		
		//Recuperación abrv. grado de estudio
		function gradoEstudio(sexoVal, rangoVal){
			if(rangoVal>1){
				switch(sexoVal){
					case 'M':
						if(rangoVal==2)
							rangoVal = "Mtro.";
						else
							rangoVal = "Dr."
						break;
					case 'F':
						if(rangoVal==2)
							rangoVal = "Mtra.";
						else
							rangoVal = "Dra."
						break;
				}
			}
			else
				rangoVal = "Lic."
			
			return rangoVal;
		
		}
		
		function gradoEstudioInversa(rangoVal){
			if(rangoVal=="Mtro."||rangoVal=="Mtra."){
				rangoVal = 2;
			}
			else if (rangoVal=="Dr."||rangoVal=="Dra."){
				rangoVal = 3;
			}
			else{
				rangoVal = 1;
			}
			return rangoVal;
		
		}
		
		//Recolección de Datos
		function enviar(estado){
			//Docentes
			var array_docentes = new Array();
			var mlti = $("[id^='radioMulti']:checked").val();
			$("[id^='tfNombreDocente']").each(function(i,val) {
				var facultadD = facultadCoordinador;
				if(mlti == "S")
					facultadD = $("#selectFacultadDocente"+(i+1)+"").val();
				array_docentes.push(new Array($("#tfNombreDocente"+(i+1)).val(), $("#tfAPaternoDocente"+(i+1)).val(), $("#tfAMaternoDocente"+(i+1)).val(), $("#tfEmailDocente"+(i+1)).val(), facultadD, $("#tfCURPDocente"+(i+1)).val(), $("[id^='radioDocente"+(i+1)+"']:checked").val(), gradoEstudio($("[id^='radioDocente"+(i+1)+"']:checked").val(), $("#selectGradoDocente"+(i+1)).val())));
			});	
	
			//Alumnos
			var array_alumnos = new Array();
			$("[id^='tfMatriculaAlumno']").each(function(i) {
				array_alumnos.push(new Array($("#tfMatriculaAlumno"+(i+1)).val(), $("#tfNombreAlumno"+(i+1)).val(), $("#tfAPaternoAlumno"+(i+1)).val(), $("#tfAMaternoAlumno"+(i+1)).val(), $("[id^='radioAlumno"+(i+1)+"']:checked").val(),$("#tfSemestreAlumno"+(i+1)).val(),$("#tfMateriaAlumno"+(i+1)).val(), $("#tfEmailAlumno"+(i+1)).val()));
			});
			
			//Delimitación Temporal
			var fecha_inicial = $("#tfFechaIn").val();
			fecha_inicial = fecha_inicial.slice(6)+'/'+fecha_inicial.slice(3,5)+'/'+fecha_inicial.slice(0,2);
			var fecha_final = $("#tfFechaOut").val();
			fecha_final = fecha_final.slice(6)+'/'+fecha_final.slice(3,5)+'/'+fecha_final.slice(0,2);
			var delimitacion_temporal = new Array(fecha_inicial,fecha_final);
			
			//Sector
			var sector = new Array();
			$("[id^='sector']:checked").each(function() {
				if($(this).attr("id")=="sector0")
					sector.push($("#tfNombreSector").val());
				else
					sector.push($(this).val());
			});

			//Vinculación
			var vinculaciones = new Array();
			$("[id^='vinculacion']:checked").each(function() {
				vinculaciones.push($(this).val());
			});

			//Financiamiento
			var financiamiento = new Array();
			if($("#radioFinanciadoS").is(":checked")){
				financiamiento.push('S', $("#tfMonto").val(),$("#selectFinanciamiento").val());
			}
			else
				financiamiento.push('N',"",'');
			
			//Indicadores y líneas de accion
			var indicadores = new Array();
			$("[id^='indicador']:checked").each(function() {
				indicadores.push($(this).val());
			});
			
			//Delimitación espacial
			var delimitacion_espacial = new Array($("#tfLugar").val(),$("#selectMunicipio").val());	

			//Ejes Transversales
			var ejes_transversales = new Array();
			$("[id^='ejeTransversal']:checked").each(function() {
				ejes_transversales.push($(this).val());
			});
			
			//Dimensión de la UVD dentro del Proyecto Académico 2014-2018
			var dimensiones = new Array();
			$("[id^='dimensiones']:checked").each(function() {
				dimensiones.push($(this).val());
			});			
			
			//Problematica
			var problematica = new Array($("#txtProblema").val(),$("#txtCausas").val(),$("#txtEfectos").val());
			
			//Referente Académico
			var referente_academico = $("#txtRAcademico").val();
			
			//Objetivo General
			var objetivo_general = $("#txtObjetivo").val();
			
			//Objetivos Especificos
			addActividad_Cronograma(1);
			var array_Objetivos = new Array();
			var acts = 0;
			var mts = 1;
			$("[id^='tfobjetivo']").each(function(i) {
				var tipo_obj = $(this).attr("id");
				tipo_obj = tipo_obj.slice(10,11);
				array_Objetivos[i]=new Array(tipo_obj,$(this).val());
				if(i>0){
					if(array_Objetivos[i-1][0]==array_Objetivos[i][0])
						mts++;
					else
						mts=1;
				}
				array_Objetivos[i][2] = new Array();
				$("[id^='tfmeta"+tipo_obj+"O"+mts+"M']").each(function(j){
					array_Objetivos[i][2][j] = new Array($(this).val(),$("#tfC"+tipo_obj+"O"+mts+"M"+(j+1)).val());
					array_Objetivos[i][2][j][2] = new Array();
					$("[id^='tf"+tipo_obj+"O"+mts+"M"+(j+1)+"A']").each(function(k){
						array_Objetivos[i][2][j][2][k] = new Array($(this).val(),cadenaFechas[acts]);
						acts++;
						
					});
					
				});
			});
			//obj/arraymeta[2]/meta/arrayactividad[2]/actividad/
			
			
			//Competencias profesionales
			var competencias_profesionales = new Array($("#txtBasicas").val(), $("#txtEspecificas").val());
			
			//Beneficiarios
			var beneficiarios = new Array();
			$("[id^='tfcantidadBeneficiarioD']").each(function(i) {
				var beneficiado = $("#selectBeneficiados"+(i+1)).val();
				if(beneficiado == 0){
					beneficiado = $("#tfespecificarBD"+(i+1)).val();
				} 
				beneficiarios.push(new Array($("#tfcantidadBeneficiarioD"+(i+1)).val(), $("[id^='radioSBD"+(i+1)+"']:checked").val(), $("#selectTipoBeneficiario"+(i+1)).val(), beneficiado));
			});	
			
			//Bibliografia
			var bibliografia = new Array();
			$("[id^='tfBibliografia']").each(function(){
				bibliografia.push($(this).val());
			});
			
			INFO = new FormData();
			INFO.append('proyecto', JSON.stringify(proyecto));
			INFO.append('idCoordinador', JSON.stringify(curp));
			INFO.append('nombre_proyecto', JSON.stringify($("#tfNombreProyecto").val()));
			INFO.append('multidisciplinaria', JSON.stringify($("[id^='radioMulti']:checked").val()));
			INFO.append('docentes', JSON.stringify(array_docentes));
			INFO.append('alumnos', JSON.stringify(array_alumnos));
			INFO.append('sector', JSON.stringify(sector));
			INFO.append('prospectiva', JSON.stringify($("[id^='radioProspectiva']:checked").val()));
			INFO.append('vinculacion', JSON.stringify(vinculaciones));
			INFO.append('financiamiento', JSON.stringify(financiamiento));
			INFO.append('indicadores', JSON.stringify(indicadores));
			INFO.append('delimitacion_espacial', JSON.stringify(delimitacion_espacial));
			INFO.append('delimitacion_temporal', JSON.stringify(delimitacion_temporal));
			INFO.append('ejes_transversales', JSON.stringify(ejes_transversales));
			INFO.append('dimensiones', JSON.stringify(dimensiones));
			INFO.append('problematica', JSON.stringify(problematica));
			INFO.append('referente_academico', JSON.stringify(referente_academico));
			INFO.append('objetivo_general', JSON.stringify(objetivo_general));
			INFO.append('estado', JSON.stringify(estado));
			INFO.append('objetivos', JSON.stringify(array_Objetivos));
			INFO.append('competencias_profesionales', JSON.stringify(competencias_profesionales));
			INFO.append('bibliografia', JSON.stringify(bibliografia));
			INFO.append('beneficiarios', JSON.stringify(beneficiarios));


			
			
			$("#saving").modal({
				show: true,
				backdrop: 'static'
			});
			$("#modalHeader, #modalBody, #modalFooter").empty();
			$("#modalHeader").append('<h4 class="modal-title">Guardando</h4>');
			$("#modalBody").append('<div class="text-center"><img src="/img/spinner.gif" alt="Spinner"></img></div><h5>Estamos realizando las operaciones necesarias para guardar los datos ingresados.  Por favor sea paciente.</h5>');
			
			$.ajax({
				data: INFO,
				type: 'POST',
				url : '/inc/actions/registrarUVDF1.php',
				jsonp : 'callback',
				dataType: 'jsonp',
				processData: false, 
				contentType: false,
				success: function(datos,estado){
					proyecto = datos['idProyecto'];
					//Una vez que se haya ejecutado de forma exitosa hacer el código para que muestre esto mismo.
					$("#modalHeader, #modalBody, #modalFooter").empty();
					$("#modalFooter").append('<button type="button" class="btn btn-default" data-dismiss="modal" id="btnOK">Aceptar</button>');
					$("#modalHeader").append('<button type="button" class="close" data-dismiss="modal" id="btnDismiss">&times;</button><h4 class="modal-title">Estado</h4>');
					$("#modalBody").append('<h5>'+datos['estado']['mensaje']+'</h5>');
					if(datos['redir']==1){
						$("#btnOK, #btnDismiss").click(function(){$(location).attr("href","/Proyectos");});
					}
				},
				error: function(jqXHR, textStatus, errorThrown){
					$("#modalHeader, #modalBody, #modalFooter").empty();
					$("#modalFooter").append('<button type="button" class="btn btn-default" data-dismiss="modal" id="btnOK">Aceptar</button>');
					$("#modalHeader").append('<button type="button" class="close" data-dismiss="modal" id="btnDismiss">&times;</button><h4 class="modal-title">Estado</h4>');
					$("#modalBody").append('Ups!! algo salió mal al tratar de guardar los datos. Por favor intente nuevamente.<br>Error: '+errorThrown);
				}
			});	
			
		}

		$('input[type=file]').change(function(event){
			var idInput = $(this).attr('id');
			var inputFileImage = document.getElementById(idInput);
			var file = inputFileImage.files[0];
			var data = new FormData();
			data.append('archivo',file);
			data.append('nombre', idInput);
			data.append('proyecto', JSON.stringify(proyecto));
			data.append('action', JSON.stringify('uploadDP'));
			$.ajax({
				url:'/upload',
				jsonp : 'callback',
				dataType: 'jsonp',
				type:'POST',
				contentType:false,
				data:data,
				processData:false,
				cache:false,
				success: function(datos,estado){
					showAlertStatus(datos['estado']['error'], datos['estado']['msg']);
					if(datos['proyecto']!=null){
						proyecto = datos['proyecto'];
					}
					if(!datos['estado']['error']){
						$("#img"+idInput).fadeIn("fast").attr('src',datos['url']+'?t='+(new Date()).getTime()).attr("alt","Debería visualizar la imágen subida, de lo contrario probablemente la imágen haya subido con errores, por favor suba nuevamente el archivo.");
					}
					else{
						$("#"+idInput).val("");
					}
				},
				error: function(jqXHR, textStatus, errorThrown){
					showAlertStatus(true, "Error: "+errorThrown);
				}
			});
		});
		
		if(proyecto!=""){
			PROJECT = new FormData();
			PROJECT.append('proyecto', JSON.stringify(proyecto));
			$.ajax({
				data: PROJECT,
				type: 'POST',
				url:"/getProject",
				jsonp : 'callback',
				dataType: 'jsonp',
				processData: false, 
				contentType: false,
				success:function(datos){
					/*alert("Success");
					$.each(datos, function(indice, valor){
						alert(indice+" : "+valor);
					});*/
			
					$("#tfNombreProyecto").attr("value",datos['uvd']['nombreUVD']);
					$("#radioMulti"+datos['uvd']['multidisUVD']).attr("checked","true");
					if($("[id^='radioMulti']:checked").length>0){
						//camposDocente();
						$("#radioMulti"+datos['uvd']['multidisUVD']).click();
					}
					
					if(datos['coadyuvantes']!=null){
						var mlti=$("[id^='radioMulti']:checked").val();
						$.each(datos["coadyuvantes"], function(i,doc_actual){
							i++; 
							$("#btnAgregarDocente").click();
							$("#tfCURPDocente"+i).attr("value",doc_actual['id']); 
							$("#selectGradoDocente"+i+" option[value="+gradoEstudioInversa(doc_actual['grado'])+"]").attr("selected",true);  
							$("#tfNombreDocente"+i).attr("value",doc_actual['nombre']); 
							$("#tfAPaternoDocente"+i).attr("value",doc_actual['apaterno']); 
							$("#tfAMaternoDocente"+i).attr("value",doc_actual['amaterno']); 
							$("#radioDocente"+i+""+doc_actual['sexo']).attr("checked", "true"); 
							$("#tfEmailDocente"+i).attr("value",doc_actual['email']); 
							if(mlti=='S')
								$("#selectFacultadDocente"+i+" option[value="+ doc_actual['idFacultadDocente'] +"]").attr("selected",true); 
						});
					}				
					
					if(datos['alumnos']!=null){
						$.each(datos["alumnos"], function(i,alumno_actual){
							i++;
							if(i>15)
								$("#btnAgregarAlumno").click();
							$("#tfMatriculaAlumno"+i).attr("value",alumno_actual['id']); 
							$("#tfNombreAlumno"+i).attr("value",alumno_actual['nombre']); 
							$("#tfAPaternoAlumno"+i).attr("value",alumno_actual['apaterno']); 
							$("#tfAMaternoAlumno"+i).attr("value",alumno_actual['amaterno']); 
							$("#radioAlumno"+i+""+alumno_actual['sexo']).attr("checked", "true"); 
							$("#tfEmailAlumno"+i).attr("value",alumno_actual['email']); 
							$("#tfMateriaAlumno"+i).attr("value",alumno_actual['materia']); 
							$("#tfSemestreAlumno"+i).attr("value",alumno_actual['semestre']); 
						
						});
					}
					
					//$("#selectSector option[value="+ datos['proyecto'][9] +"]").attr("selected",true);
					$.each(datos["sector"], function(i,val){
						$("#sector"+val).attr("checked", "true");
						
					});
					
					$("#radioProspectiva"+datos['uvd']['prospectivaUVD']).attr("checked","true"); 
					
					$.each(datos["vinculaciones"], function(i,val){
						$("#vinculacion"+val).attr("checked", "true");
						
					});
					if(datos['financiamiento']['financiado']==null){ 
						datos['financiamiento']['financiado'] = 'N';
					}
					$("#radioFinanciado"+datos['financiamiento']['financiado']).attr("checked","true");
					
					if(datos['financiamiento']['financiado']=='S'){
						campoFinanciado();
						$("#tfMonto").attr("value",datos['financiamiento']['monto']);
						$("#selectFinanciamiento option[value="+ datos['financiamiento']['idFuente'] +"]").attr("selected",true);
					}
					
					$.each(datos["indicadores"], function(i,val){
						$("#indicador"+val).attr("checked", "true");
						
					});
					
					$("#tfLugar").attr("value",datos['delimitacion_espacial']['lugar']);
					$("#selectMunicipio option[value="+ datos['delimitacion_espacial']['id_municipio'] +"]").attr("selected",true);

					
					var fechaIn = null, fechaFin = null;
					if (datos['delimitacion_temporal']['inicio']!=null) {
						fechaIn = datos['delimitacion_temporal']['inicio'];
						fechaIn = fechaIn.slice(8)+'/'+fechaIn.slice(5,7)+'/'+fechaIn.slice(0,4);
						$('#datetimeFechaIn').data("DateTimePicker").date(fechaIn);
					}
					if (datos['delimitacion_temporal']['fin']!=null) {
						fechaFin = datos['delimitacion_temporal']['fin'];
						fechaFin = fechaFin.slice(8)+'/'+fechaFin.slice(5,7)+'/'+fechaFin.slice(0,4);
						$('#datetimeFechaOut').data("DateTimePicker").date(fechaFin);
					}
								
					$.each(datos["ejes_transversales"], function(i,val){
						$("#ejeTransversal"+val).attr("checked", "true");
						
					});
					
					$.each(datos["dimensiones"], function(i,val){
						$("#dimensiones"+val).attr("checked", "true");
						
					});
					$("#txtProblema").append(datos['problematica']['problema']);
					$("#txtCausas").append(datos['problematica']['causa']);
					$("#txtEfectos").append(datos['problematica']['efecto']);
					
					$("#txtRAcademico").append(datos['uvd']['refAcademicUVD']); 
					$("#txtObjetivo").append(datos['uvd']['objGeneralUVD']); 
					
					$("#txtBasicas").append(datos['competencias_profesionales'][1]);
					$("#txtEspecificas").append(datos['competencias_profesionales'][2]);

					if(datos['beneficiarios']!=null){
						$.each(datos["beneficiarios"], function(i,benef_actual){
							i++;
							$("#btnAgregarBD").click();
							$("#tfcantidadBeneficiarioD"+i).attr("value",benef_actual['cantidad']); 
							$("#radioSBD"+i+benef_actual['sexo']).attr("checked", "true"); 
							$("#selectTipoBeneficiario"+i+" option[value="+ benef_actual['tipo'] +"]").attr("selected",true); 
							$("#selectBeneficiados"+i+" option[value="+benef_actual['idBeneficiado']+"]").attr("selected",true); 
						});
					}
					
					$.each(datos["bibliografia"], function(i,val){
						if(i==0){
							$("#tfBibliografia1").attr("value",val);
						}
						else{
							$("#btnAgregarBibliografia").click();
							$("#tfBibliografia"+(i+1)).attr("value",val);
						}
							
					});
					
					var D=0,I=0,E=0;
					var acts=0;
					arrayFechasActividades = new Array();
					$.each(datos['objetivos'],function(i,obj){
						
						var No_Obj = 0;
						switch (obj[0]){
							case 'D':
								D++;
								if(D>1)
									$("#btnAgregarDO").click();
								No_Obj = D;
							break;
							case 'I':
								I++;
								if(I>1)
									$("#btnAgregarIO").click();
								No_Obj = I;
							break;
							case 'E':
								E++;
								if(E>1)
									$("#btnAgregarEO").click();
								No_Obj = E;
							break;
						}
						$("#tfobjetivo"+obj[0]+"O"+No_Obj).append(obj[1]);
						
						$.each(obj[2],function(j,metas){
							var btnAct="";
							if(j>0){
								$("#btnAgregar"+obj[0]+"O"+No_Obj+"M1").click();
							}
							$("#tfmeta"+obj[0]+"O"+No_Obj+"M"+(j+1)).append(metas[0]);
							$("#tfC"+obj[0]+"O"+No_Obj+"M"+(j+1)).attr("value",metas[1]);
						
							$.each(metas[3],function(k,activities){
								if(k>0){
									$("#btnAgregar"+obj[0]+"O"+No_Obj+"M"+(j+1)+"A").click();
								}
								
								$("#tf"+obj[0]+"O"+No_Obj+"M"+(j+1)+"A"+(k+1)).append(activities[0]);
								
								arrayFechasActividades[acts] = new Array();
								arrayFechasActividades[acts][0] = "tf"+obj[0]+"O"+No_Obj+"M"+(j+1)+"A"+(k+1);
								$.each(activities[1].split(","), function(l, dates){
									arrayFechasActividades[acts].push(dates);
								});
								acts++;
							});
		
						});
					});
					
					if (fechaIn!=null && fechaFin!=null) {
						addActividad_Cronograma(2);
					}
					
				},
				error:function(){
					//alert("Error");
				}
			});

			var imgsdp = new Array('dp1.jpg','dp2.jpg');
			var imgdp = new FormData();
			imgdp.append('ficheros',JSON.stringify(imgsdp));
			imgdp.append('proyecto',JSON.stringify(proyecto));
			imgdp.append('action', JSON.stringify('isExist'));
				$.ajax({
					url:'/upload',
					jsonp : 'callback',
					dataType: 'jsonp',
					type:'POST',
					contentType:false,
					data:imgdp,
					processData:false,
					cache:false,
					success: function(datos,estado){
						$.each(datos['exist'],function(k,val){
							if(val){
								$("#dp"+(k+1)).removeAttr("required");
								$("#imgdp"+(k+1)).fadeIn("fast").attr('src',datos['url'][k]+'?t='+(new Date()).getTime()).attr("alt","Debería visualizar la imágen subida, de lo contrario probablemente la imágen haya subido con errores, por favor suba nuevamente el archivo.");
							}
						});
					}
				});
		}

		

    });
