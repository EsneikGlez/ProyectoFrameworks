
<link rel="icon" type="image/vnd.microsoft.icon" href="favicon.ico" sizes="16x16">
<link rel="stylesheet" href="/Proyecto/css/bootstrap.min.css">
<link rel="stylesheet" href="/Proyecto/css/docs.css">
<script src="/Proyecto/js/jquery-3.1.1.min.js"></script>
<script src="/Proyecto/js/jquery.min.js"></script>
<script src="/Proyecto/js/jQuery.print.js"></script>
<script src="/Proyecto/js/jquery.validate.js"></script>
<script src="/Proyecto/js/bootstrap.min.js"></script>
<script src="/Proyecto/js/js.cookie.js"></script>
<script src="/Proyecto/js/sha1.js"></script>
<script src="/Proyecto/js/validation.js"></script>
  <style>
    header{
		background-color: #342c2c;
    }
	
	/* Remove the navbars default margin-bottom and rounded borders */ 
	.navbar {
		background-color:  #808080;
		z-index: 5;
		border-radius: 0;
		margin: 0;
		padding: 0;
		top: 0;
		width: 100%;
		/*overflow: hidden;*/
	}

	.navbar-inverse .navbar-nav > .open > a,
	.navbar-inverse .navbar-nav > .open > a:hover,
	.navbar-inverse .navbar-nav > .open > a:focus {
	  background-color: #1A619C;
	}

	.dropdown-menu {
		min-width: 100%;
		padding: 5px 10px;
		border: 1px solid #1A619C;
		border-top: 0 none transparent;
	}

	.drop-right:before{
		border-left: 15px solid transparent; 
		right: 0;
	}

	.drop-left:before{
		border-right: 15px solid transparent; 
		left: 0;
	}

	.drop-right:before, .drop-left:before{ 
		border-bottom: 15px solid white; 
 		content: ""; 
 		height: 0; 
 		bottom: 0;
 		position: absolute; 
 		top: -15px; 
 		width: 0;
	}
    
    /* Set gray background color and 100% height */
    .sidenav {
		margin-top: 10px;
		background-color: #104773;/*#DCA00C;*/ /*f1f1f1*/
		opacity: 0.9;
		height: 100%;
		padding-left:4px;
		padding-right:4px;
    }
    
    /* Set black background color, white text and some padding */
    footer {
		height: 100%;
		display: block;
		background-color: #555555;
		color: white;
		padding: 15px;
    }

	html, body {
		height: 100%;
	}

	#main {
		min-height: 100%;
		height: auto !important;
		height: 100%;
		margin: 0 auto -60px;
	}
	#footer{
		height: auto !important;
		margin-top: 100px;
		background-color: #555555;
		color: white;
		font-size: 17px;
		/*font-weight: bold;*/
		width: 100%;
	}
	
	.mobileView{
		display: none;
		position: relative;
	}
	
    /* On small screens, set height to "auto" for sidenav and grid */
    @media screen and (max-width: 767px) {
		.sidenav {
			height: auto;
			padding: 15px;
		}
		.row.content {
			height:auto;
		} 
		.navbar {
			position: relative;
		}
		.drop-right:before, .drop-left:before{ 
			display: none;
		}
		.mobileView{
			display: none;
			position: absolute;
		}
    }

	.alerts{
		width: 500px;
		height: auto;
		position: fixed;
		top: 30%;
		right: 0;
		z-index: 3;
	}
	
	#myContainer {
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 0px;
	}
	
	img[class=media-object]{
		width:200px; 
		height:200px;
	}

	.no-display{
		display: none;
	}

	.notifications{
		text-align: justify;
		font-size: 8pt;
		margin-bottom: 10px;

	}

	.alert-default {
	  color: black;
	  background-color: transparent;
	  border-color: #d6e9c6;
	}
	.alert-default hr {
	  border-top-color: #c9e2b3;
	}
	.alert-default .alert-link {
	  color: #2b542c;
	}

	.btnHelp{
		position: fixed;
		cursor: pointer;
		width:43px;
		height:43px;
		border-radius:100%;
		bottom: 20px;
		right: 0px;
		border:none;
		outline:none;
		color:#FFF;
		background: #337AB7;
		z-index: 1000;
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
		transition:.3s;
	}
	span{
		transition:.5s;  
	}
	.btnHelp:hover span{
		transform:rotate(360deg);
	}
	.btnHelp:active{
		transform:scale(1.1);
	}

	.btnCircular{
		width:43px;
		height:43px;
		border-radius:100%;
		border:none;
		outline:none;
		color:#FFF;
		background: #F44336;
		z-index: 1000;
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	}
	.btnCircular:hover span{
		transform:rotate(360deg);
	}
	.btnCircular:active{
		transform:scale(1.1);
	}

  </style>