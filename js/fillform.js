jQuery(document).ready(function($){


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var datat = location.search;
datat=datat.replace("?",'');
datat=datat.replace("%20"," ");
$("body").css("cursor","wait");

$.post("http://gathologyg.pythonanywhere.com/API/requestFormDescription/",
        {
          form_name: datat
        }, function( data) {

data=data.replaceAll("'",'"');
data=data.replaceAll("False","false");       //to be deleted
data=data.replaceAll("True","true");  

 FormDesc = eval ("(" + data + ")");


$("#formtitle h2").empty();
$("#formtitle h2").append(FormDesc[0].Title);

var tobappended="";

for(var i=1;i<FormDesc.length;i++){
tobappended="<div class='divop'>";

if(FormDesc[i].Type=="Label"){
	tobappended+="<p>"+FormDesc[i].Text+"</p>";}


else if (FormDesc[i].Type=="TextBox"){
	tobappended+="<div class='divoption'><input type='text' id='"+FormDesc[i].ID+"' placeholder='"+FormDesc[i].Text+"' ";
if(FormDesc[i].Required==true)
 tobappended+="required></div>"; else tobappended+=" ></div>";

}

else if(FormDesc[i].Type=="CheckBox"){
	tobappended+="<div class='divoption'><input type='checkbox' value='"+FormDesc[i].Text+"' id='"+FormDesc[i].ID+"'>" + FormDesc[i].Text+"</br></div>";
}
else if(FormDesc[i].Type=="RadioGroup"){ 
	tobappended+="<div class='divoption'>"+FormDesc[i].Text+"</br>";
for(var j=0;j <FormDesc[i].Texts.length;j++)
 tobappended+="<input type='radio' name='"+FormDesc[i].ID+"' value='"+FormDesc[i].Texts[j]+"' > "+FormDesc[i].Texts[j]+"</br>";
tobappended+="</div>";}

else if(FormDesc[i].Type=="DropDownList"){
tobappended+="<div class='divoption'><select id='"+FormDesc[i].ID+"'> <option value=''>"+FormDesc[i].Text+"</option>";
for(var j=0; j<FormDesc[i].Choices.length;j++)
	tobappended+="<option value='"+FormDesc[i].Choices[j]+"'>"+FormDesc[i].Choices[j]+"</option>";
tobappended+="</select></div>";
}

else if(FormDesc[i].Type=="Image"){tobappended+="<div class='divoption uploadsubmit'>"+FormDesc[i].Text+"  <input type='file'  accept='image/*' id='"+FormDesc[i].ID+"'";
if(FormDesc[i].required==true) tobappended+=" required></div>"; else tobappended+="></div>";
}
else if(FormDesc[i].Type=="Video"){tobappended+="<div class='divoption uploadsubmit'>"+FormDesc[i].Text+"  <input type='file' accept='video/*' id='"+FormDesc[i].ID+"'";
if(FormDesc[i].required==true) tobappended+=" required></div>"; else tobappended+="></div>";
}
else if(FormDesc[i].Type=="Document"){tobappended+="<div class='divoption uploadsubmit'>"+FormDesc[i].Text+"  <input type='file'  accept='.pdf,.txt.doc' id='"+FormDesc[i].ID+"'";
if(FormDesc[i].required==true) tobappended+=" required></div>"; else tobappended+="></div>";}

tobappended+="</div>";	
$("#forma").append(tobappended);
tobappended="";

}


$("body").css("cursor","default");

	}, "json").fail(function() {
    alert("This form does not exist!");
window.location.assign("index.html");
  });

$("#submitrecord").click(function(){
    $("body").css("cursor","wait");
var okay=true;
var record={};

for(var i=1;i<FormDesc.length;i++){

if(FormDesc[i].Type=="Label"){}
else if (FormDesc[i].Type=="TextBox"){
if(FormDesc[i].Required==true && $("#"+FormDesc[i].ID).val()=="") okay=false;
if( ($("#"+FormDesc[i].ID).val()).length>FormDesc[i].Length) okay=false;
//leters
if(FormDesc[i].Format=="Letters") { var regex = /^[a-zA-Z ]*$/; 
	if(!regex.test($("#"+FormDesc[i].ID).val())) okay=false;
record[FormDesc[i].ID]=$("#"+FormDesc[i].ID).val();}
//numbers
else if(FormDesc[i].Format=="Numeric") {var regex = /^[0-9.]*$/;
if(!regex.test($("#"+FormDesc[i].ID).val())) okay=false;
record[FormDesc[i].ID]= parseFloat($("#"+FormDesc[i].ID).val());}
else{record[FormDesc[i].ID]=$("#"+FormDesc[i].ID).val();}

}


else if(FormDesc[i].Type=="CheckBox"){
	
	record[FormDesc[i].ID]=$("#"+FormDesc[i].ID).is( ":checked" );

}
else if(FormDesc[i].Type=="RadioGroup"){ 
	//attribute name
if(FormDesc[i].Required==true && $("input[name ='"+FormDesc[i].ID+"']:checked").val()=="") okay=false;
record[FormDesc[i].ID]=$("input[name ='"+FormDesc[i].ID+"']:checked").val();
}

else if(FormDesc[i].Type=="DropDownList"){
	if($("#"+FormDesc[i].ID).val()=="") okay=false;
record[FormDesc[i].ID]=$("#"+FormDesc[i].ID).val();
}

else if(FormDesc[i].Type=="Image"){
if(FormDesc[i].Required==true && $("#"+FormDesc[i].ID).val()=="") okay=false;
record[FormDesc[i].ID]=$("#"+FormDesc[i].ID).val();
}
else if(FormDesc[i].Type=="Video"){
	if(FormDesc[i].Required==true && $("#"+FormDesc[i].ID).val()=="") okay=false;
	record[FormDesc[i].ID]=$("#"+FormDesc[i].ID).val();
}
else if(FormDesc[i].Type=="Document"){if(FormDesc[i].Required==true && $("#"+FormDesc[i].ID).val()=="") okay=false;
record[FormDesc[i].ID]=$("#"+FormDesc[i].ID).val();
}
}	
if(!okay){ alert("Some entries don't satisfy requirements !"); $("body").css("cursor","deefault"); return;}


 $.ajax({
        url: "http://gathologyg.pythonanywhere.com/FormsData/Add_record/",
        type: 'Post',
        dataType: "json",
        data:{
         form_name:datat,
        data:JSON.stringify(record)},
        success: function( result) {
alert("Submitted successfully");
window.location.assign("index.html");
        },
        fail: function( result) {
            $("body").css("cursor","default");
alert("Failed to submit record,try again !");
        }
    });


});



	});