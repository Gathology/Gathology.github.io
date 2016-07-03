
jQuery(document).ready(function($){ 


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

datat = location.search;
datat=datat.replace("?","");
datat=datat.replace("%20"," ");

$("h2").append(datat);

$("body").css("cursor","wait");
addinthead='<tr><th>ID</th>'; //<th style="width:5%;">Edit Record</th></tr>';
$.post("http://gathologyg.pythonanywhere.com/API/requestFormDescription/",
        {
          form_name: datat
        }, function( data) {
data=data.replaceAll("'",'"');
data=data.replaceAll("False","false");       //to be deleted
data=data.replaceAll("True","true");  
FormDesc = eval ("(" + data + ")"); 
for(var j=1;j<FormDesc.length;j++)
	if(FormDesc[j].Type!='Label')
	addinthead+='<th >'+FormDesc[j].ID+'</th>';
addinthead+='<th>Edit Options</th></tr>';
$("thead").append(addinthead);
}).done(function(){rows(); $("body").css("cursor","default");});


rows=function(){

$.post("http://gathologyg.pythonanywhere.com/API/displayResult/",
        {
          form_name: datat
        }, function( data) {
         
        	data= JSON.stringify(data);
data=data.replaceAll("'",'"');
data=data.replaceAll("False","false");       //to be deleted
data=data.replaceAll("True","true");  
results = eval ("(" + data + ")");

	}, "json").fail(function() {
    alert("Error, Failed to load results please try again !");
  }).success(function(){ display();  });
}

display=function(){
for(var i =0;i<results.length;i++){
addintbody=' <tr><td>'+results[i].id+'</td>';
for(var j=1;j<FormDesc.length;j++)
if(FormDesc[j].Type!="Label")
	if(results[i][FormDesc[j].ID]==undefined)
addintbody+='<td>null</td>';
else addintbody+='<td>'+results[i][FormDesc[j].ID]+'</td>';
addintbody+='<td><div class="del"></div><input type="button" class="editbtn" value="Edit"></td></tr>';
$("tbody").append(addintbody);
}

}


$("#addbtn").click(function(){
  
  window.location.assign("fillform.html?"+datat+"");
});

    $("tbody").delegate(".editbtn", "click",function(){
     datat+="%"+$(this).parents("tr").children("td:nth-child(1)").text();
window.location.assign("editrecord.html?"+datat);
 
    });
  
    $("tbody").delegate(".del", "click",function(){
       var answer=confirm("Are you sure that you want to permenantly delete this record ?");
if(answer){
  $("body").css("cursor","wait");
$.post("http://gathologyg.pythonanywhere.com/FormsData/Delete_record/",
        {
          form_name: form_name,
          id:$(this).parents("tr").children("td:nth-child(1)").text()
        }, "json").fail(function() {$("body").css("cursor","default");
    alert("Error, Failed to delete record please try again !");
  }).success(function(){ a$("body").css("cursor","default"); alert("This record is deleted successfully "); 
window.location.reload();});

}
 
    });

});