jQuery(document).ready(function($){ 

sessionStorage.setItem("userr_name",sessionStorage.getItem("userr_name"));

$("#topbar_logout").click(function(){
 $("body").css("cursor","wait");
sessionStorage.setItem("userr_name","");
 window.location.assign("index.html");


});


});