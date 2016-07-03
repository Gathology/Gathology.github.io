jQuery(document).ready(function($){ 

$("body").css("cursor","wait");
sessionStorage.setItem("userr_name",sessionStorage.getItem("userr_name"));

login='<div id="topbar_login" class="not_logged_in"><a class="topbar_login" >LOGIN <span class="sf-sub-indicator"></span>'
+'</a><div id="fast-login" class="access-info-box"><form name="loginform"><div class="form"><p><label>Username<br/><input type="text" id="user" tabindex="10" size="20" value="" name="log" class="input-text" /></label></p><p>'
 +'<label>Password<br/><input type="password" id="pass" tabindex="20" size="20" value="" name="pwd" class="input-text" /></label></p><p class="align-right"><input type="button" tabindex="100" value="Login" name="wp-submit" class="input-submit" /></p></div>'
+'</form></div></div><div id="topbar_createaccount" class="cc"><a class="topbar_createaccount" href="create account.html">Create Account</a></div>'
+'<div id="topbar_fillform" class="ff"><a class="topbar_fillform" >FILL Form <span class="sf-sub-indicator"></span></a><div id="fast-fillform" class="access-info-box"><form id="form"  name="fillform"><div class="form"><p>'
+'<label><input type="text" tabindex="10"  id="formname" size="20" value="" name="log" class="input-text" /></label></p><p class="align-right">'
 +'<input  type="button" tabindex="100" value="Get form" name="wp-submit" class="input-submit" id="sub" /><input type="hidden" value="index.html" name="redirect_to" /><input type="hidden" value="1" name="testcookie" /></p></div></form></div></div>';
                       
logout='<div id="topbar_logout" class="not_logged_in"><a class="topbar_logout">LOGOUT</a></div><div id="toprofilepage" class="not_logged_in"><a class="toprofilepage" href="profile.html">MY PROF</a>'+
'</div><div id="topbar_comment" class="cc"><a class="topbar_comment" href="comment.html"><img src="images/comment.png" title="Comment&Rate"/> Categories</a></div>';


if("userr_name" in sessionStorage && sessionStorage.getItem("userr_name") !=  'null' && sessionStorage.getItem("userr_name")!="" && sessionStorage.getItem("userr_name") !=  null){
          $("#nav").append(logout);
          $("body").css("cursor","default");
          
        }
       else {
            $("#nav").append(login);
          $("body").css("cursor","default");
        }
    




$("#nav").delegate("#topbar_login .align-right","click",function(){
  $("body").css("cursor","wait");

$.post("http://gathologyg.pythonanywhere.com/API/login/",
        { 
          username: $("#user").val(),
          password:$("#pass").val()
        }, function( data,status) {
          if(status=="success"){
            sessionStorage.setItem("userr_name",$("#user").val());
	window.open("profile.html","_self");}
else if(status=="timeout"){
  $("body").css("cursor","default");
    alert("Check your internet connection!");
}
else { $("body").css("cursor","default");
    alert("Username or password doesn't match!");}
	}, "json");


});

///logout

$("#nav").delegate("#topbar_logout","click",function(){
 $("body").css("cursor","wait");
sessionStorage.setItem("userr_name","");
 window.location.assign("index.html");

});

/////fillform

$("#nav").delegate("#form .align-right","click",function(){
	Form_name=$("#formname").val();

  window.location.assign("fillform.html?"+Form_name+"");

});




});