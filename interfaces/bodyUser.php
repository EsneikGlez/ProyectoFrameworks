<?php
$user = $_SESSION["usuario"];
$u = "";
$a = "";

if($user == "administrador")
	{$u = "hidden";
	$a = "dropdown-toggle";}

if($user == "usuario")
	{$u = "";
	$ua = "";
	$a = "hidden";}	
?>



	<div class="mobileView"></div>
	<header class="container-fluid hidden-print" id="cabecera">
    	<div align="center"><img class="img-responsive" src="img/header.jpg" alt="Proyecto" /></a></div>
	</header>

    <nav class="navbar navbar-inverse" id="navegador">
    	<div class="container-fluid">
        	<div class="navbar-header">
          		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            		<span class="icon-bar"></span>
            		<span class="icon-bar"></span>
            		<span class="icon-bar"></span>                        
          		</button>
        	</div>

        	<div class="collapse navbar-collapse" id="myNavbar">

        		   <ul class="nav navbar-nav" style="">
            		<li><a class ="<?php echo $u;?>" href="#">Catálogo</a></li>
            		<li><a class ="<?php echo $u;?>" href="#">Ofertas</a></li>
            		<li><a class ="<?php echo $u;?>" href="#">Solicitar Crédito</a></li>

            		<li class="dropdown">
                		<a class="<?php echo $a;?>" data-toggle="dropdown" href="#">Administración<span class="caret"></span></a>
                		<ul class="dropdown-menu drop-left">
                  			<li><a href="#">Clientes</a></li>
                  			<li><a href="#">Créditos</a></li>
                  			<li><a href="#">Catálogo</a></li>
                  			<li><a href="#">Indicadores</a></li>
                  			<li><a href="#">Configuraciones del Sistema</a></li>
                		</ul>
            		</li>

         		</ul>

         		<ul class="nav navbar-nav navbar-right">			
					<li class="dropdown">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#"><?php echo $user;?><span class="caret"></span></a>
						<ul class="dropdown-menu drop-right">
						  	<li><a href="#"> <span class="glyphicon glyphicon-user"></span> Mi cuenta</a></li>
						  	<li><a href="/Proyecto"> <span class="glyphicon glyphicon-log-out"></span> Salir</a></li> 
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
	