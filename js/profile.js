jQuery(document).ready(function($){ 

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(".slogan h3").append(sessionStorage.getItem("userr_name"));
  


 $.ajax({
        url: "http://gathologyg.pythonanywhere.com/API/request_Scientist_forms/"+sessionStorage.getItem("userr_name"),
        type: 'Get',
        dataType: "json",
        success: function( result) {
for(var i=0;i<result.length;i++){
var appendli= '<li  class="filterable_item span3 printdesign  logodesign "><div class="ch-item ch-item-hover"><span>'+result[i].form_name+'</span><div class="ch-info" ><div class="ch-info-icons" ><div class="displayresults" style="float:left; margin-left:10px;"> <img src="images/icons/set_icons/display.png" title="Display Results" alt="" /></div><div  class="applyQ" style="float:left;margin-left:10px;"><img src="images/icons/set_icons/view.png"title="Apply Query" alt="" /></div><div class="Geopage" style="float:left;margin-left:10px;"><img src="images/icons/set_icons/Geo-loc.png" title="Show Geolocations" alt="" /></div><div style="float:left; margin-left:10px;"><img class="deletepls" title="Delete This Form" src="images/icons/set_icons/error.png"/></div><div style="float:left; margin-left:10px;">';
if(result[i].enabled){appendli+='<input type="checkbox" class="switch enable" checked> </div> </div></div></div> </li>';}
else appendli+='<input type="checkbox" class="switch"> </div> </div></div></div> </li>';
$("#portfolio").append(appendli);
}

        }
    });



$("#createform").click(function(){
  location.assign("creat_form.html");
});


  $("#portfolio").delegate(".deletepls", "click",function(){
     $("body").css("cursor","wait");
  var deletedform= $(this).parents(".ch-item").children("span").text();
  var answer=confirm("Are you sure that you want to permenantly delete "+deletedform+"?");
if(answer==true)
    $.ajax({
        url: "http://gathologyg.pythonanywhere.com/API/deleteForm/"+sessionStorage.getItem("userr_name")+"/"+deletedform,
        type: 'DELETE',
        dataType: "json"
    }).fail(function() {
    alert("Error, please try again !");
  }).success(function() {
    alert("Form Deleted Successfully");
     location.reload(true);
  });

 });

 $("#portfolio").delegate(".displayresults", "click",function(){
  var formname= $(this).parents(".ch-item").text();
 window.location.assign("result_page.html?"+formname+"");
 });

 $("#portfolio").delegate(".applyQ", "click",function(){
  var formname= $(this).parents(".ch-item").text();
 window.location.assign("apply.html?"+formname+"");
 });
 $("#portfolio").delegate(".Geopage", "click",function(){
  var formname= $(this).parents(".ch-item").text();
  sessionStorage.setItem("form_name",formname);
   window.open("Geo-location.html","_self");
 });



// not working
 $("#portfolio").delegate(".switch", "click",function(){
   $("body").css("cursor","wait");
  var formname= $(this).parents(".ch-item").text().trim();
  var stringg;
  if($(this).is(":checked"))
  stringg="0";
  else stringg="1";
$.ajax({
        url: "http://gathologyg.pythonanywhere.com/API/set_Enabled/",
        type: 'Post',
        data:{form_name:formname,
          enabled:stringg},
        dataType: "json",
        success:function(){ $("body").css("cursor","default");},
        fail:function(){alert("Sry, Failed to make your request !"); window.location.reload(true);}
    });

 });


 });  