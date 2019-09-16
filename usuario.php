<?php
   $user = $_GET['user'];
   $password = $_GET['password'];
   if (($user == "usuario") AND ($password == "12345")) {

   } 

   else if (($user == "administrador") AND ($password == "12345")){

   }

   else {
    die(header ("Location: /Proyecto"));
  }

  $_SESSION["usuario"] = $user;
?>

<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Proyecto</title>
		<?php include 'interfaces/head.php'; ?>
	</head>

	<body>
		<?php include 'interfaces/bodyUser.php'; ?>
		<div class="modal fade" id="modalMulti" role="dialog">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title" id="modal-title"></h4>
					</div>
					<div class="modal-body" id="modal-body">

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal" id="btnModalClose">Cerrar</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container-fluid" id="main">  
			<div class="row content">
				<div class="">
					<div id="Container">
						<div id="myCarousel" class="carousel slide" data-ride="carousel" style="z-index: 1;">
							<!-- Indicators -->
							<ol class="carousel-indicators">
								<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
								<li data-target="#myCarousel" data-slide-to="1"></li>
							</ol>
							
							<!-- Wrapper for slides -->
							<div class="carousel-inner" role="listbox">
								<div class="item active">
									<img src="img/intro.jpg" alt="Unach" style="width:100%; height:600px;">
									<div class="carousel-caption" style="text-align: justify">
										<h1><strong>¡Bienvenido electronics Store&copy; su tienda de electrónicos en linea !</strong></h1>
										<p>Somos la tienda #1 en el mercado de electrónica en la ciudad.</p>
									</div>
								</div>

					<?php
								for($i=1;$i<=1;$i++){
								echo '
								<div class="item">
								  <img src="img/'.$i.'.jpg" style="width:100%; max-height:600px;">
								</div>
								';
								}
					?>

							</div>
							<!-- Left and right controls -->
							<a class="left carousel-control" href="#myCarousel" data-slide="prev">
								<span class="glyphicon glyphicon-chevron-left"></span>
								<span class="sr-only">Previous</span>
							</a>
							<a class="right carousel-control" href="#myCarousel" data-slide="next">
								<span class="glyphicon glyphicon-chevron-right"></span>
								<span class="sr-only">Next</span>
							</a>
						</div>
					</div><!-- End Carousel Container-->
				</div> <!--End Column-->
			</div> <!--End Row-->


		</div> <!-- End Container Cuerpo-->

		<?php include 'interfaces/footer.php'; ?>

	</body>

</html>