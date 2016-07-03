jQuery(document).ready(function($){  


$(".one , .many").hide();


$("input[name='areachoice']").click(function(){
    if("many"==$(this).val())
    {$(".one").slideUp(1000);$(".many").slideDown(1000);}
else {$(".many").slideUp(1000); $(".one").slideDown(1000);}
});

$(".features-tab-labels li").click(function(){ $(".many, .one").hide();  });

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

coverttono=function(arrr){
retarr=[];
for(var r=0;r<arrr.length;r++)
retarr.push(parseFloat(arrr[r]));
return retarr;
}


datat = location.search;
datat=datat.replace("?","");
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
for(var j=1;j<FormDesc.length;j++)
    if(FormDesc[j].Type!='Label'&&FormDesc[j].Type!='Image'&&FormDesc[j].Type!='Video'&&FormDesc[j].Type!='Document'){
    	var temparrlist=$(".list").toArray();
for(var m=0; m<temparrlist.length;m++){
   if((FormDesc[j].Type!='TextBox'||FormDesc[j].Format!='Numeric')&& $(temparrlist[m]).is(".numbersonly")) continue;
if(FormDesc[j].Type=='TextBox'&&FormDesc[j].Format=='Numeric')
$(temparrlist[m]).append("<option class='N' value='"+FormDesc[j].ID+"'> "+FormDesc[j].ID+"</option>");
else $(temparrlist[m]).append("<option class='S' value='"+FormDesc[j].ID+"'> "+FormDesc[j].ID+"</option>");   }

var temparrchecck=$(".check").toArray();
for(var n=0; n<temparrchecck.length;n++){
    if((FormDesc[j].Type!='TextBox'||FormDesc[j].Format!='Numeric')&& $(temparrchecck[n]).is(".numbersonly")) continue;
$(temparrchecck[n]).append('<div class="father"><input type="checkbox" value="'+FormDesc[j].ID+'"> '+FormDesc[j].ID+'<div class="nullop"></div><div class="op"><form><div class="form"><p><label>Fill Null With Value<input type="text" value="" class="inputext"/></label></p> <p><label>Drop Values<input type="text" value="" placeholder="Separated by Comma"/></label></p> <p><label>Replace Values<input type="text" value=""placeholder="Separated by Comma"/></label></p><p><label>With<input type="text" value=""placeholder="Separated by Comma"/></label></p></div></form></div><br></div>');
 }


    }
$(".op").hide();
$("body").css("cursor","default");
});



 $(".features-tab-content").delegate(".nullop", "click",function(){
	var u= $(this).parents(".father").children(".op");
	$(".op").not(u).hide(1000);
	u.slideToggle(1000);
    });

getyaxis=function(part){

var yaxis=$(".features-tab-"+clicked+"  "+part+" .y-axis input:checked").toArray();

for(var y=0;y<yaxis.length;y++){
    cols.push($(yaxis[y]).val());
//fillvalues
if($(yaxis[y]).parents(".father").find(".op p:nth-child(1) input").val()!=""){
    fill_valss.push(parseFloat($(yaxis[y]).parents(".father").find(".op p:nth-child(1) input").val()));
fill_colss.push($(yaxis[y]).val());
}
//dropval
if($(yaxis[y]).parents(".father").find(".op p:nth-child(2) input").val()!=""){
    var narr=coverttono(($(yaxis[y]).parents(".father").find(".op p:nth-child(2) input").val()).split(","));
    drop_valss.push(narr);
 drop_colss.push($(yaxis[y]).val());
}
//replace
if($(yaxis[y]).parents(".father").find(".op p:nth-child(3) input").val()!=""){
    var narr1=coverttono(($(yaxis[y]).parents(".father").find(".op p:nth-child(3) input").val()).split(","));
var narr2=coverttono(($(yaxis[y]).parents(".father").find(".op p:nth-child(4) input").val()).split(","));
if(narr2.length!=narr1.length){ alert("No of replacement values should be equal no of the replaed with!"); return;}
var temp={};
    for(var m=0;m<narr1.length;m++) temp[narr1[m]]=narr2[m];
        if(!jQuery.isEmptyObject(temp)){
        repl_dicts[$(yaxis[y]).val()]=temp;}
}
}
}

twocols=function(){
var objq=$(".features-tab-"+clicked).find(".y-axis");
            cols.push(objq.val());
    var numeric_col=($(".features-tab-"+clicked).find(".y-axis :selected").is(".N"));
if(objq.parents(".father").find(".op p:nth-child(1) input").val()==""){}
    else if(numeric_col)fill_valss.push(parseFloat(objq.parents(".father").find(".op p:nth-child(1) input").val()));
        else fill_valss.push(objq.parents(".father").find(".op p:nth-child(1) input").val());

if(objq.parents(".father").find(".op p:nth-child(2) input").val()==""){} 
else if(numeric_col){drop_colss.push(objq.val()); drop_valss.push(coverttono((objq.parents(".father").find(".op p:nth-child(2) input").val()).split(",")));
  }  else {drop_valss.push((objq.parents(".father").find(".op p:nth-child(2) input").val()).split(","));
drop_colss.push(objq.val());}

if(objq.parents(".father").find(".op p:nth-child(3) input").val()=="")
    arr1=null;
else if(numeric_col)
    arr1=coverttono((objq.parents(".father").find(".op p:nth-child(3) input").val()).split(","));
else arr1=(objq.parents(".father").find(".op p:nth-child(3) input").val()).split(",");
if(objq.parents(".father").find(".op p:nth-child(4) input").val()=="")
    arr2=null;
else if(numeric_col)
    arr2=coverttono((objq.parents(".father").find(".op p:nth-child(4) input").val()).split(","));
else arr2=(objq.parents(".father").find(".op p:nth-child(4) input").val()).split(",");



if(arr1!=null&&arr1.length!=arr2.length){ alert("No of replacement values should be equal no of the replaed with!"); return;}
var temp={};
if(arr1!=null&&arr1.length!=0){
    for(var m=0;m<arr1.length;m++) temp[arr1[m]]=arr2[m];}
        if(!jQuery.isEmptyObject(temp)){
        repl_dicts[objq.val()]=temp;}
 if(objq.parents(".father").find(".op p:nth-child(1) input").val()==""){} else fill_colss.push(objq.val());
 
}


onefun=function(part){

         cols.push($(".features-tab-"+clicked+"  "+part+" .x-axis").val());
    var numeric_col=($(".features-tab-"+clicked+"  "+part+" .x-axis :selected").is(".N"));
if($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(1) input").val()=="")fill_valss.length=0;
    else if(numeric_col)fill_valss.push(parseFloat($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(1) input").val()));
        else fill_valss.push($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(1) input").val());

if($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(2) input").val()=="") drop_valss.length=0; 
else if(numeric_col){drop_colss.push($(".features-tab-"+clicked+"  "+part+" .x-axis").val()); drop_valss.push(coverttono(($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(2) input").val()).split(",")));
  }  else {drop_valss.push(($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(2) input").val()).split(","));
drop_colss.push($(".features-tab-"+clicked+"  "+part+" .x-axis").val());}

if($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(3) input").val()=="")
    arr1=null;
else if(numeric_col)
    arr1=coverttono(($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(3) input").val()).split(","));
else arr1=($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(3) input").val()).split(",");
if($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(4) input").val()=="")
    arr2=null;
else if(numeric_col)
    arr2=coverttono(($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(4) input").val()).split(","));
else arr2=($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(4) input").val()).split(",");



if(arr1!=null&&arr1.length!=arr2.length){ alert("No of replacement values should be equal no of the replaed with!"); return;}
var temp={};
if(arr1!=null&&arr1.length!=0){
    for(var m=0;m<arr1.length;m++) temp[arr1[m]]=arr2[m];}
        if(!jQuery.isEmptyObject(temp)){
        repl_dicts[$(".features-tab-"+clicked+"  "+part+" .x-axis").val()]=temp;}
 if($(".features-tab-"+clicked+"  "+part+" .x-axis").parents(".father").find(".op p:nth-child(1) input").val()=="")fill_colss.length = 0; else fill_colss.push($(".features-tab-"+clicked+"  "+part+" .x-axis").val());
 
}

onefunwzrequest=function(part){
    onefun(".one");
 $.ajax({
        url: "http://gathologyg.pythonanywhere.com/FormsData/FormsDataApp/",
        type: 'Post',
        dataType: "json",
        data:{ key:JSON.stringify({
form_name:datat,
chart_name:getchartname(),
cols_name:cols,
fill_cols:fill_colss,
fill_vals:fill_valss,
drop_cols:drop_colss,
drop_vals:drop_valss,
repl_dict:repl_dicts,
aggr_func:null,
one_col:true
})},
        success: function( result) {
draw(result);

$(".resultchart").eq(clicked).fadeIn( 'slow' );
document.getElementById('resultcharts').scrollIntoView();
        },
        fail: function( result) {
alert("Failed to create this chart");
        }
    });
}


displaymanyoneoptions=function(){

    var option=$(".features-tab-"+clicked+"  input[name='areachoice']:checked").val();
/////////////////////////////////////////
if(option=="one"){
   onefunwzrequest(".one");

 }
    else{
//////////////////////////////////////
onefun(".many");
getyaxis(".many");

      $.ajax({
        url: "http://gathologyg.pythonanywhere.com/FormsData/FormsDataApp/",
        type: 'Post',
        dataType: "json",
        data:{ key:JSON.stringify({
form_name:datat,
chart_name:getchartname(),
cols_name:cols,
fill_cols:fill_colss,
fill_vals:fill_valss,
drop_cols:drop_colss,
drop_vals:drop_valss,
repl_dict:repl_dicts,
aggr_func:$(".features-tab-"+clicked+"  .many .agg").val(),
one_col:false
})},
        success: function( result) {
draw(result);

$(".resultchart").eq(clicked).fadeIn( 'slow' );
document.getElementById('resultcharts').scrollIntoView();
        },
        fail: function( result) {
alert("Failed to create this chart");
        }
    });


    }
}


getchartname=function(){
switch(clicked){
case 0: return"Scatter"; break;
case 1: return"Column"; break;
case 2: return"Stacked_Column"; break;
case 3: return"Area"; break;
case 4: return"Stepped_Area"; break;
case 5: return"Line"; break;
case 6: return"Pie"; break;
case 7: return"Candlestick"; break;
}}

fill_valss=[]; fill_colss=[]; drop_colss=[];drop_valss=[]; repl_dicts={}; cols=[];

$("#submitq").click(function(){
    $("body").css("cursor","wait");
      $("#resultcharts").children( 'div' ).hide();
      $("#resultcharts").children( 'div' ).empty();
    fill_valss=[]; fill_colss=[]; drop_colss=[];drop_valss=[]; repl_dicts={}; cols=[];
switch(clicked){
case 0:
displaymanyoneoptions();
 break;
case 1: 
    var option=$(".features-tab-"+clicked+"  input[name='areachoice']:checked").val();
if(option=="one"){ onefunwzrequest(".one");}
else{ onefun(".many");
//two cols
 twocols(".many");

      $.ajax({
        url: "http://gathologyg.pythonanywhere.com/FormsData/FormsDataApp/",
        type: 'Post',
        dataType: "json",
        data:{ key:JSON.stringify({
form_name:datat,
chart_name:getchartname(),
cols_name:cols,
fill_cols:fill_colss,
fill_vals:fill_valss,
drop_cols:drop_colss,
drop_vals:drop_valss,
repl_dict:repl_dicts,
aggr_func:$(".features-tab-"+clicked+"  .many .agg").val(),
one_col:false
})},
        success: function( result) {
draw(result);

$(".resultchart").eq(clicked).fadeIn( 'slow' );
document.getElementById('resultcharts').scrollIntoView();
        },
        fail: function( result) {
alert("Failed to create this chart");
        }
    });

}
break;
case 2:
onefun("");
twocols();
      $.ajax({
        url: "http://gathologyg.pythonanywhere.com/FormsData/FormsDataApp/",
        type: 'Post',
        dataType: "json",
        data:{ key:JSON.stringify({
form_name:datat,
chart_name:getchartname(),
cols_name:cols,
fill_cols:fill_colss,
fill_vals:fill_valss,
drop_cols:drop_colss,
drop_vals:drop_valss,
repl_dict:repl_dicts,
aggr_func:null,
one_col:false
})},
        success: function( result) {
draw(result);

$(".resultchart").eq(clicked).fadeIn( 'slow' );
document.getElementById('resultcharts').scrollIntoView();
        },
        fail: function( result) {
alert("Failed to create this chart");
        }
    });

 break;
case 3: displaymanyoneoptions(); break;
case 4: displaymanyoneoptions(); break;
case 5:displaymanyoneoptions();break;
case 6:
 var option=$(".features-tab-"+clicked+"  input[name='areachoice']:checked").val();
if(option=="one"){ onefunwzrequest(".one");}
else{ onefun(".many");
//two cols
twocols();
      $.ajax({
        url: "http://gathologyg.pythonanywhere.com/FormsData/FormsDataApp/",
        type: 'Post',
        dataType: "json",
        data:{ key:JSON.stringify({
form_name:datat,
chart_name:getchartname(),
cols_name:cols,
fill_cols:fill_colss,
fill_vals:fill_valss,
drop_cols:drop_colss,
drop_vals:drop_valss,
repl_dict:repl_dicts,
aggr_func:$(".features-tab-"+clicked+"  .many .agg").val(),
one_col:false
})},
        success: function( result) {
draw(result);

$(".resultchart").eq(clicked).fadeIn( 'slow' );
document.getElementById('resultcharts').scrollIntoView();
        },
        fail: function( result) {
alert("Failed to create this chart");
        }
    });


}
 break;
case 7:onefun("");
getyaxis("");
if(cols.length<5){alert("Candlestick should have more than 4 in y-axis !");return;}
      $.ajax({
        url: "http://gathologyg.pythonanywhere.com/FormsData/FormsDataApp/",
        type: 'Post',
        dataType: "json",
        data:{ key:JSON.stringify({
form_name:datat,
chart_name:getchartname(),
cols_name:cols,
fill_cols:fill_colss,
fill_vals:fill_valss,
drop_cols:drop_colss,
drop_vals:drop_valss,
repl_dict:repl_dicts,
aggr_func:null,
one_col:false
})},
        success: function( result) {
draw(result);

$(".resultchart").eq(clicked).fadeIn( 'slow' );
document.getElementById('resultcharts').scrollIntoView();
        },
        fail: function( result) {
alert("Failed to create this chart");
        }
    });
 break;

}


$("body").css("cursor","default");

 });




});