
jQuery(document).ready(function($){

 

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

getvalue=function(x){
  switch(x){
    case 0: return"FS"; break;
    case 1: return"NS"; break;
    case 2: return"ET"; break;
    case 3: return"MH"; break;
    case 4: return"AS"; break;
    case 5: return"SC"; break;
    case 6: return"HM"; break;
    case 7: return"OT"; break;
    default: return"nth"; break;
  }
}

$("#categorydiv li").click(function(){ 
  if($(this).index()==0)return;
   $("body").css("cursor","wait");
$("#formnames ul").empty();
 $("#formnames ul").append('<li>Forms</li>'); 
$("#formnames ul").append("<div id='load' align='center'><img src='images/colorbox/loading.gif'></div>"); 
 $.ajax({
        url: "https://gathologyg.pythonanywhere.com/API/return_category/",
        type: 'Post',
        dataType: "json",
        data:{category:getvalue($(this).index()-1)},
        success: function( result) {
          if(result.length!=0){
$("#load").remove();            
for(var j=0;j<result.length;j++)
$("#formnames ul").append('<li>'+result[j]+'</li>');
}
else { $("#load").remove(); $("#formnames ul").append("<li style='color:red; cursor:text; background-color:#f2f2f2; border:0px;'>No Forms To View !</li>");}
        $("body").css("cursor","default"); },
        fail: function( result) {
alert("Error loading forms, please try again!");
 $("body").css("cursor","default");
        }
    });

});


$("#formnames").delegate("li","click",function(){ 
  if($(this).index()==0)return;
   $("body").css("cursor","wait");
$("#comments").empty();
form_name=$(this).text();
$("thead").empty();
$("tbody").empty();
$("h2").empty();
$("h2").append(form_name);
$("tbody").append("<div id='load' align='center'><img src='images/colorbox/loading.gif'></div>");
addinthead='<tr><th>ID</th>'; //<th style="width:5%;">Edit Record</th></tr>';
$.post("https://gathologyg.pythonanywhere.com/API/requestFormDescription/",
        {
          form_name: form_name
        }, function( data) {
data=data.replaceAll("'",'"');
data=data.replaceAll("False","false");       //to be deleted
data=data.replaceAll("True","true");  
FormDesc = eval ("(" + data + ")"); 
for(var j=1;j<FormDesc.length;j++)
  if(FormDesc[j].Type!='Label')
  addinthead+='<th >'+FormDesc[j].ID+'</th>';
addinthead+='</tr>';
$("thead").append(addinthead);
}).done(function(){rows(); displaycomments();  
initiate_rate();
  $("body").css("cursor","default"); });

});

initiate_rate=function(){
$("#rate").empty(); $("#ratehere").empty();
$.post("https://gathologyg.pythonanywhere.com/API/read_rate/",
        {
          form_name: form_name,
          username:sessionStorage.getItem("userr_name")
        }, function( data) {
      $("#rate").append("<div id='bigrate'>"+JSON.stringify(data.rate).substring(0,3));
     $("#rate").append("<sub><span class='starss'>5</span><span class='stars'>"+data.rate+"</span></sub>");  
    $('span.stars').stars();
    $('span.starss').stars();
    if(data.N_rates==-1)data.N_rates=0;
        $("#rate").append("<br>"+data.N_rates+"<img src='images/customer.png' width='9px'padding='1px'/></div>");
  $("#ratehere").append("<div><ul class='rating ratingtemp'>Rate Here:<br><li>☆</li><li>☆</li><li>☆</li><li>☆</li><li>☆</li></ul></div>");
  checkratedbefore();
  }, "json");
}


  checkratedbefore=function(){
$.post("https://gathologyg.pythonanywhere.com/API/check_rated/",
        {
          form_name: form_name,
          username: sessionStorage.getItem("userr_name")
        }, function( data) {
          if(data=="Not Exist") return;
for(var i=1;i<=data+1;i++){
$(".ratingtemp li:nth-child("+i+")").text("★");  
$(".ratingtemp li:nth-child("+i+")").css("color","gold");}
$("#ratehere ul").removeClass("ratingtemp");
  }, "json");

  }

rows=function(){

$.post("https://gathologyg.pythonanywhere.com/API/displayResult/",
        {
          form_name: form_name
        }, function( data) {
         
          data= JSON.stringify(data);
data=data.replaceAll("'",'"');
data=data.replaceAll("False","false");       //to be deleted
data=data.replaceAll("True","true");  
results = eval ("(" + data + ")");

  }, "json").fail(function() {
    alert("Error, Failed to load results please try again !");
  }).success(function(){ display();  });}



display=function(){
  $("tbody").empty();
for(var i =0;i<results.length;i++){
addintbody=' <tr><td>'+results[i].id+'</td>';
for(var j=1;j<FormDesc.length;j++)
if(FormDesc[j].Type!="Label")
  if(results[i][FormDesc[j].ID]==undefined)
addintbody+='<td>null</td>';
else addintbody+='<td>'+results[i][FormDesc[j].ID]+'</td>';
addintbody+='</tr>';
$("tbody").append(addintbody);
}
}
/////comments
displaycomments=function(){
$.post("https://gathologyg.pythonanywhere.com/API/read_comments/",
        {
          form_name: form_name
        }, "json").fail(function() {
    alert("Error, Failed to load results please try again !");
  }).success(function( data) {
         data= JSON.stringify(data);
data=data.replaceAll("'",'"');
data=data.replaceAll("False","false");       //to be deleted
data=data.replaceAll("True","true");  
results = eval ("(" + data + ")");
$("#comments").append("<h2>Comments</h2>");
for(var i=0;i<results.length;i++)
addcomment(results[i].username,results[i].comment,results[i].date,results[i].time);
createentercomment();
  });
}

addcomment=function(user,comment,date,time){
  //currentuser
  //if(user)
  //$("#comments").append("<div><label>"+user+"<sub>"+date+" "+time+"</sub></label>"+comment+"<div class='deletecomment'></div></div>");
//else 
 if(new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()!=date){ date="";}
 else if(JSON.stringify(new Date().getFullYear())==date.slice(0,4))date=date.substring(5,date.length);
if(time!="now")time=time.substring(0,5);
 $("#comments").append("<div><label>"+user+"<sub>"+date+" "+time+"</sub></label>"+comment.replaceAll("%%",'"').replaceAll("&&","'")+"</div>");
}

createentercomment=function(){
  $("#comments").append("<input type='text' placeholder='Add Comment....'></input>");
}


$("#comments").delegate("input" ,"change",function(){
  $("#comments").css("cursor","wait");
  $("input").css("cursor","wait");
  var cmnt=($(this).val()).replaceAll('"',"%%").replaceAll("'","&&");
$.post("https://gathologyg.pythonanywhere.com/API/comment/",
        {
         form_name:form_name,
         username: sessionStorage.getItem("userr_name"),
          comment:cmnt
        }, "json").fail(function() {
    alert("Error, Failed to submit comment please try again !");
     $("body").css("cursor","default");
  }).success(function( data) {
$("#comments input").remove();
 addcomment(window.sessionStorage.getItem("userr_name"),cmnt,"just","now");
createentercomment();
 $("#comments").css("cursor","default");
 $("input").css("cursor","default");
    });

  });



$("#ratehere").delegate(".ratingtemp li","click",function(){
   $("body").css("cursor","wait");
$.post("https://gathologyg.pythonanywhere.com/API/rate/",
        {
         form_name:form_name,
         username: sessionStorage.getItem("userr_name"),
    rate: $(this).index()
        }, "json").fail(function( data) {alert("sry,Please try rating again!");$(this).parent().addClass("ratingtemp"); $("body").css("cursor","default");});
for(var i=1;i<=$(this).index()+1;i++){
$(".ratingtemp li:nth-child("+i+")").text("★");  
$(".ratingtemp li:nth-child("+i+")").css("color","gold");}
$(this).parent().removeClass("ratingtemp");
$("body").css("cursor","default");
      });


$("#ratehere").delegate("li","mouseover",function(){
for(var i=1;i<=$(this).index()+1;i++){
$(".ratingtemp li:nth-child("+i+")").text("★");  
$(".ratingtemp li:nth-child("+i+")").css("color","gold");}
});

$("#ratehere").delegate("li","mouseleave",function(){
$(".ratingtemp li").text("☆");  
$(".ratingtemp li").css("color","#CFCFCF");
});



$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 10;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}





});