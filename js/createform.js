jQuery(document).ready(function($){  

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

do{	
Form_Name= prompt("Enter Unique Form Name : "); 
if(Form_Name==null) window.location.assign("index.html");
}while(Form_Name=="");

$.post("http://gathologyg.pythonanywhere.com/API/Check_form_name/",
        {
          form_name: Form_Name
        },"json").fail(function() {location.reload();}).success(function() {$("body").css("cursor","wait"); openNav();  create_form();});

function openNav() {
	$("body").css("cursor","default");
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
$(".closebtn").click(function(){ window.location.assign("index.html");});

$("#myNav li").click(function(){
	cat=$(this).index();
closeNav();
});

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
		default: return"OT"; break;
	}
}


create_form= function(){

 txtareahtml="<div class='dd divoption txtarea' > <div class='shuffleup'></div><div class='shuffledown'></div> <div class='closediv'></div><div class='leadop'></div><div class='vtext'><div class='ques'>Label</div></div> <div class='op'><form><div class='form'> <p><label>Label <input type='text' value='' class='inputext'/></label></p><p><label>ID <input type='text' value='' /></label></p><p><label>Maximum Length <input type='number' value='' /></label></p> <p><label>Required <input type='checkbox' value='true'/></label></p><p><label>Multiline <input type='checkbox' value='true'/></label></p><p><label>Input Type:</label></p><p><label>Characters Only<input type='radio' name='x' value='Letters'/></label></p>  <p><label>Numbers Only<input type='radio' name='x' value='Numeric'/></label></p> <p><label>Characters&Numbers<input type='radio' name='x' value='Both'/></label></p> </div></form></div></div>";

drophtml="<div class='dd divoption droplist' ><div class='shuffleup'></div><div class='shuffledown'></div> <div class='closediv'></div><div class='leadop'></div><div class='ques'>Label</div> <select style='margin:10px 0px 10px 0px'></select><div class='op'><form><div class='form'><p><label>Label <input type='text' value='' class='inputext'/></label></p><p><label>Id <input type='text' value='' /></label></p><p class='align-right'><input type='button' value='Add Option' class='input-submit'/></p></div></form></div></div></div>";

radiohtml="<div class='dd divoption radio' ><div class='shuffleup'></div><div class='shuffledown'></div> <div class='closediv'></div><div class='leadop'></div><div class='ques'>Label:</div><div class='rd'><input type='radio' value=''> Option<br></div><div class='op'><form><div class='form'><p><label>Label <input type='text' value='' class='inputext'/></label></p> <p><label>Id <input type='text' value=''/></label></p> <p><label>Required <input type='checkbox' value='true'/></label></p><p class='align-right'><input type='button' value='Add Option' class='input-submit'/></p></div></form></div></div>";

checkhtml="<div class='dd divoption check' ><div class='shuffleup'></div><div class='shuffledown'></div> <div class='closediv'></div><div class='leadop'></div><div class='ckb'><input type='checkbox'><font class='ques'> Option<br></font></div><div class='op'><form><div class='form'><p><label>Option <input type='text' value='' class='inputext'/></label></p> <p><label>Id <input type='text' value=''/></label></p> </div></form></div></div>";

imghtml="<div class='dd divoption img' ><div class='shuffleup'></div><div class='shuffledown'></div> <div class='closediv'></div><div class='leadop'></div><div class='ques'>Label:</div><div class='import'>Choose Image</div><div class='op'><form><div class='form'><p><label>Label <input type='text' value='' class='inputext'/></label></p> <p><label>Id <input type='text' value='' /></label></p> <p><label>Required <input type='checkbox' value='true'/></label></p></div></form></div></div>";
 
vidhtml="<div class='dd divoption vid' ><div class='shuffleup'></div><div class='shuffledown'></div> <div class='closediv'></div><div class='leadop'></div><div class='ques'>Label:</div><div class='import'>Choose Video</div><div class='op'><form><div class='form'><p><label>Label <input type='text' value='' class='inputext'/></label></p> <p><label>Id <input type='text' value='' /></label></p> <p><label>Required <input type='checkbox' value='true'/></label></p></div></form></div></div>";
dochtml="<div class='dd divoption docupload' ><div class='shuffleup'></div><div class='shuffledown'></div> <div class='closediv'></div><div class='leadop'></div><div class='ques'>Label:</div><div class='import'>Choose Document</div><div class='op'><form><div class='form'><p><label>Label <input type='text' value='' class='inputext'/></label></p> <p><label>Id <input type='text' value=''/></label></p> <p><label>Required <input type='checkbox' value='true'/></label></p></div></form></div></div>";

notehtml="<div class='dd divoption note' ><div class='shuffleup'></div><div class='shuffledown'></div> <div class='closediv'></div><div class='leadop'></div><div class='ques'>Note</div><div class='op'><form><div class='form'><p><label>Note <input type='text' value='' class='inputext'/></label></p></div></form></div></div>";

$("#forma .divoption").hover(function(){$("this .op").css("dispaly","block");});

$("#textareaoption").dblclick(function(){
$(".op").hide(1000);
$("#forma").append(txtareahtml);});

 $("#dropdownlistoption").dblclick(function(){
$(".op").hide(1000);
$("#forma").append(drophtml);});       



 $("#radiooption").dblclick(function(){
$(".op").hide(1000);
$("#forma").append(radiohtml);});       


 $("#checkoption").dblclick(function(){
$(".op").hide(1000);
$("#forma").append(checkhtml);});       


 $("#imgoption").dblclick(function(){
$(".op").hide(1000);
$("#forma").append(imghtml);});       

 $("#vidoption").dblclick(function(){
$(".op").hide(1000);
$("#forma").append(vidhtml);});       

 $("#docoption").dblclick(function(){
$(".op").hide(1000);
$("#forma").append(dochtml);});       


 $("#note").dblclick(function(){
$(".op").hide(1000);
$("#forma").append(notehtml);});       


  $("#forma").delegate(".leadop", "click",function(){
	var u= $(this).siblings(".op");
	$(".op").not(u).hide(1000);
	u.slideToggle(1000);
    });


  $("#forma").delegate(".closediv", "click",function(){
        var x= $(this).parent();
	x.remove();
    });


  $("#forma").delegate(".inputext", "change",function(){
        var l= $(this).parents(".divoption");
	l=l.find(".ques");
	l.empty();
	l.append(this.value);
    });



  $("#forma").delegate(".input-submit", "click",function(){
        var a= $(this).parent();
	a.append("<input type='text' value='' class='appendoption' style='margin:11px 1px 0px 0px'/>");
$(".appendoption").focus();    
});


  $("#forma").delegate(".appendoption", "change",function(){
        var b= $(this).parents(".divoption");
	var f;
	f=b.find("select"); f.append("<option value='"+this.value+"'>"+this.value+/*<div class='closeop'>*/"</div></option>");
	f=b.find($(".rd"));
	if(f.children("input").val()=="")
		f.empty();
	
	f.prepend("<input type='radio' name='same' value='"+this.value+"'> "+this.value+/*<div class='closeop'>*/"</div><br>");
	
	f=b.find($(".ckb"));f.prepend("<input type='checkbox' value='"+this.value+"'> "+this.value+"<br>");
	
		
	$(this).remove();
    });

 $("#formtitle").click(function(){
$("#formtitle h3").hide();
$("#filltitle").show();
});       


  $("#filltitle").delegate(".ext", "change",function(){
       $("#filltitle").hide();
	$("#formtitle h3").empty();
	$("#formtitle h3").append(this.value);
	$("#formtitle h3").show();
    });



  $("#forma").delegate(".shuffleup", "click",function(){
	if(!$(this).parents(".divoption").prev().hasClass("divoption"))return;
        var up= $(this).parents(".divoption").prev().clone(true);
	(up).insertAfter($(this).parents(".divoption"));
$(this).parents(".divoption").prev().remove();
    });

  $("#forma").delegate(".shuffledown", "click",function(){
if(!$(this).parents(".divoption").next().hasClass("divoption"))return;
        var down= $(this).parents(".divoption").next().clone(true);
	(down).insertBefore($(this).parents(".divoption"));
$(this).parents(".divoption").next().remove();
    });







}
///////////////////////////////send data

$("#createformbtn").click(function(){
	$("body").css("cursor","wait");
var idscheck=[];

data_desc={
	Form_Name:Form_Name,
	Title:$("#formtitle h3").text(),
	LocationRequired:$("#geoo").is(":checked")
};

var tobesent=[];
tobesent.push(data_desc);

divoptions=$("#forma .divoption").toArray();

for(var i=0;i<divoptions.length;i++){

if($(divoptions[i]).hasClass("txtarea")){

	obj={Type:'TextBox', ID:$(divoptions[i]).find('p:nth-child(2) input[type=text]').val(),
	 	Text:$(divoptions[i]).find(".ques").text(),
	 	Multiline:$(divoptions[i]).find('p:nth-child(5) input[type=checkbox]').is( ":checked" ),
	 	Required:$(divoptions[i]).find('p:nth-child(4) input[type=checkbox]:checked').is( ":checked" ), //undefined if not checked
	 	Format:($(divoptions[i]).find('input[type=radio]:checked').val()=="")?"both":$(divoptions[i]).find('input[type=radio]:checked').val(),
	 	Length:($(divoptions[i]).find('p:nth-child(3) input[type=number]').val()).length==0?100:$(divoptions[i]).find('p:nth-child(3) input[type=number]').val() };
if(obj.Format==""){ alert("Input Type should be indecated for TextBox of ID: "+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;} 
	if((idscheck).indexOf(obj.ID)!=-1){ alert("ID should be unique\n Repeated ID:"+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;} 
if(obj.ID==""){ alert("Some ID is missing"); $("body").css("cursor","default"); return;} 
	idscheck.push(obj.ID);	
tobesent.push(obj);

}
else if($(divoptions[i]).hasClass("note")){
	obj={Type:'Label', Text:$(divoptions[i]).find(".ques").text()};
	tobesent.push(obj);
}
else if ($(divoptions[i]).hasClass("droplist")){
 temp=$(divoptions[i]).find("option").toArray();

options=[];
for(var j=0;j<temp.length;j++) options.push($(temp[j]).val());
	
	obj={Type:'DropDownList', ID:$(divoptions[i]).find('p:nth-child(2) input[type=text]').val(), 
	Text:$(divoptions[i]).find(".ques").text(),
	Choices:options };
if(options.length<2){ alert("You  should Add two options or more in Dropdown List ID: "+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;}	
if((idscheck).indexOf(obj.ID)!=-1){ alert("ID should be unique\n Repeated ID:"+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;} 
if(obj.ID==""){ alert("Some ID is missing");  $("body").css("cursor","default"); return;}
	idscheck.push(obj.ID);
	tobesent.push(obj);
}

else if ($(divoptions[i]).hasClass("radio")){
	temp=$(divoptions[i]).find("input[type=radio]").toArray();
	options=[];
    for(var j=0;j<temp.length;j++) options.push($(temp[j]).val());

obj={Type:'RadioGroup',ID:$(divoptions[i]).find('p:nth-child(2) input[type=text]').val(),
Text:$(divoptions[i]).find(".ques").text(),
Texts:options, 
Required:$(divoptions[i]).find('input[type=checkbox]').is( ":checked" )};
if(options.length<2){ alert("You  should Add two options or more in Radio Button ID: "+"\""+obj.ID+"\"");  $("body").css("cursor","default"); return;}
	if((idscheck).indexOf(obj.ID)!=-1){ alert("ID should be unique\n Repeated ID:"+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;} 
if(obj.ID==""){ alert("Some ID is missing"); $("body").css("cursor","default"); return;}
	idscheck.push(obj.ID);
tobesent.push(obj);
}

else if($(divoptions[i]).hasClass("check")){
	obj={Type:'CheckBox', ID:$(divoptions[i]).find('p:nth-child(2) input[type=text]').val(),
	Text:$(divoptions[i]).find(".ques").text()};
	
	if((idscheck).indexOf(obj.ID)!=-1){ alert("ID should be unique\n Repeated ID:"+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;} 
if(obj.ID==""){ alert("Some ID is missing"); $("body").css("cursor","default"); $("body").css("cursor","default"); return;}
	idscheck.push(obj.ID);
	tobesent.push(obj);
}
else if($(divoptions[i]).hasClass("img")){
	obj={Type:'Image',ID:$(divoptions[i]).find('p:nth-child(2) input[type=text]').val(),
	Text:$(divoptions[i]).find(".ques").text(),
	Required:$(divoptions[i]).find('input[type=checkbox]').is( ":checked" )};
	
	if((idscheck).indexOf(obj.ID)!=-1){ alert("ID should be unique\n Repeated ID:"+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;} 
if(obj.ID==""){ alert("Some ID is missing");  $("body").css("cursor","default"); $("body").css("cursor","default"); return;}
	idscheck.push(obj.ID);
	tobesent.push(obj);
}
else if($(divoptions[i]).hasClass("vid")){
	obj={Type:'Video',ID:$(divoptions[i]).find('p:nth-child(2) input[type=text]').val(),
	Text:$(divoptions[i]).find(".ques").text(),
	Required:$(divoptions[i]).find('input[type=checkbox]').is( ":checked" )};
	
	if((idscheck).indexOf(obj.ID)!=-1){ alert("ID should be unique\n Repeated ID:"+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;} 
if(obj.ID==""){ alert("Some ID is missing"); $("body").css("cursor","default"); $("body").css("cursor","default");  return;} 
	idscheck.push(obj.ID);
	tobesent.push(obj);
}
else if($(divoptions[i]).hasClass("docupload")){
	obj={Type:'Document',ID:$(divoptions[i]).find('p:nth-child(2) input[type=text]').val(),
	Text:$(divoptions[i]).find(".ques").text(),
	Required:$(divoptions[i]).find('input[type=checkbox]').is( ":checked" )};
	
	if((idscheck).indexOf(obj.ID)!=-1){ alert("ID should be unique\n Repeated ID:"+"\""+obj.ID+"\""); $("body").css("cursor","default"); return;} 
if(obj.ID==""){ alert("Some ID is missing"); $("body").css("cursor","default"); return;}
	idscheck.push(obj.ID);
	tobesent.push(obj);
}	
}
corrected=JSON.stringify(tobesent);
//corrected;
//corrected;
 $.ajax({
        url: "http://gathologyg.pythonanywhere.com/API/createforms/",
        type: 'Post',
        dataType: "json",
        data:{key:JSON.stringify({  form_name: Form_Name,
        	user_name:window.sessionStorage.getItem("userr_name"),
        category: getvalue(cat),
        enabled: true,
        creation_date:  new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate(),
        data_description:corrected.replaceAll('"',"'").replaceAll("false","False").replaceAll("true","True")
    })},
        success: function( result) {
window.location.assign("profile.html");
        },
        fail: function( result) {
        	 $("body").css("cursor","default");
alert("Failed to create this form");
        }
    });


});




});   