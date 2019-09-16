$(function(){

  $('.validar').keypress(function(e) {
	if(isNaN(this.value + String.fromCharCode(e.charCode))) 
     return false;
  })
  .on("cut copy paste",function(e){
	e.preventDefault();
  });
});
function validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57 && event.charCode == 46){
      return true;
     }
     return false;        
}

// $('.validar').on('keypress', function (e) {
//         // Backspace = 8, Enter = 13, ’0′ = 48, ’9′ = 57, ‘.’ = 46
//         var field = $(this);
//         key = e.keyCode ? e.keyCode : e.which;
 
//         if (key == 8) return true;
//         if (key > 47 && key < 58) {
//           if (field.val() === "") return true;
//           var existePto = (/[.]/).test(field.val());
//           if (existePto === false){
//               regexp = /.[0-9]{10}$/;
//           }
//           else {
//             regexp = /.[0-9]{2}$/;
//           }
 
//           return !(regexp.test(field.val()));
//         }
//         if (key == 46) {
//           if (field.val() === "") return false;
//           regexp = /^[0-9]+$/;
//           return regexp.test(field.val());
//         }
//         return false;
//     });