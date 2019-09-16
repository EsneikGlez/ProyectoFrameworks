	<div class="mobileView"></div>
	<header class="container-fluid hidden-print" id="cabecera">
    	<div align="center"><img class="img-responsive" src="/Proyecto/img/header.jpg" alt="Proyecto" /></a></div>
	</header>

    <nav class="navbar navbar-inverse" id="navegador">
    	<div class="container-fluid">
        	<div class="navbar-header">
          		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            		<span class="icon-bar"></span>
            		<span class="icon-bar"></span>
            		<span class="icon-bar"></span>                        
          		</button>
          		<a class="navbar-brand" href="/Proyecto">Inicio</a>
        	</div>

        	<div class="collapse navbar-collapse" id="myNavbar">
          		<ul class="nav navbar-nav" style="">
            		<li><a class ="" href="/Proyecto/interfaces/contacto.php">Contacto</a></li>
         		</ul>


         		<ul class="nav navbar-nav navbar-right">
					<li id="optRegistrarse" class=""><a href="#">Registrarse</a></li>
					<li class="dropdown">
                		<a class="dropdown-toggle" data-toggle="dropdown" href="#">Entrar<span class="caret"></span></a>
                		<ul class="dropdown-menu drop-right" style="width:300px; height:auto;">
							<form form action= "usuario.php" method="GET"class="form-horizontal">
                  				
                  				<li class="form-group error">
								    <div class="has-feedback" id="inputUSER">
								    	<input class="form-control" name="user" type="text" id="user" placeholder="Usuario" aria-describedby="basic-addon2" autocomplete="on" title="Ingrese su usuario">
								    	<span class="glyphicon glyphicon-user form-control-feedback"></span>
								    </div>
				  				</li>


                 				<li class="form-group error" id="fieldPassword">
								    <div class="has-feedback">
								    	<input class="form-control" name="password" type="password" id="password" placeholder="Contraseña" aria-describedby="basic-addon2" title="Ingrese su contraseña">
								    	<span class="glyphicon glyphicon-lock form-control-feedback"></span>
								    </div>
				  				</li>
		
                  				<li class="form-group">
									<div class="btn-group btn-group-justified">
										<div class="btn-group">
											<button type="submit" name="submit" id="btnEntrar" class="btn btn-primary" value="Enviar"><span class=""></span> Entrar</button>
										</div>
									</div>
				  				</li> 
				  				<li class="form-group">
				  					<div id="instruccResPass"></div>
				  					<p class="text-center text-info bg-danger" style="cursor:pointer;" id="optForgot" value="forgot">Olvidé mi contraseña</p>
				  				</li> 
				  			</form>
                		</ul>
					</li>            		
          </ul>
        </div>
      </div>
    </nav>

	<div id="alertStatus" class="hidden" style="position: fixed; top:5; right:0; width: 50%; height: auto; z-index: 1000;">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		<div id="msgStatus"></div>
	</div>
	