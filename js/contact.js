jQuery(document).ready(function($){     
    
    // contact                           
    var error = true;      
    
    function addLoading( e )
    {
		$(e).val( '{wait}'.replace('{wait}', contactForm.wait) ).attr('disabled', true);
	}    
    
    function removeLoading( e )
    {
		$(e).val(value_submit).attr('disabled', false);
	}
	
	function addError(msg, e, effect)
	{
		error = true;           
		$(e).removeClass('icon success');
		$(e).addClass('icon error');
		$(e).parents('li').find('.msg-error').text(msg);	
		if( effect !== undefined && effect == true )
		{
			$(e).css({position:'relative'}).animate({left:-10}, 100).animate({left:10}, 100).animate({left:-5}, 100).animate({left:5}, 100).animate({left:0}, 100);
		}
	}                 
	
	function addSuccess(e)
	{                                     
		$(e).addClass('icon success');	
	}
	
	function removeError(e)
	{
		error = false;
		$(e).parents('li').find('.msg-error').text('');     
		$(e).removeClass('icon error');
        $(e).removeClass( 'formRed')
		addSuccess(e);
	}           
    	
	$('.contact-form .required').blur(function(){             
		var name = $(this).attr('name').match( /(.*)\[(.*)\]/ );
		var id_form = $(this).parents('.contact-form').find('input[name="id_form"]').val(); 
		
		jQuery.globalEval( 'var msg = messages_form_'+id_form+'.'+ name[2] );  
		
		if( $(this).val() == '' )
			addError( msg, this );       
		else               
			removeError(this);
	});    
//simsima
 


var lastpassword;
	$('.contact-form  .password-validate').blur(function(){             
		var expr = /^[a-z0-9A-Z]+$/;
		var name = $(this).attr('name').match( /(.*)\[(.*)\]/ );       
		var id_form = $(this).parents('.contact-form').find('input[name="id_form"]').val();
		
		jQuery.globalEval( 'var msg = messages_form_'+id_form+'.'+name[2] );
		
		if( ( $(this).val() != '' && !expr.test( $(this).val() ) ) || ( $(this).is('.required') && $(this).val() == '' ) || ( $(this).val() != '' && ( $(this).val() ).length<8 )||( $(this).val() != '' && (/^[a-zA-Z]+$/).test( $(this).val() ) )||( $(this).val() != '' && (/^[0-9]+$/).test( $(this).val() ) ))  
			addError( msg, this );            
		else 
			removeError(this);
lastpassword=$(this).val();

	});  
 
	$('.contact-form  .Confirm-validate').blur(function(){             
		
		var name = $(this).attr('name').match( /(.*)\[(.*)\]/ );       
		var id_form = $(this).parents('.contact-form').find('input[name="id_form"]').val();
		
		jQuery.globalEval( 'var msg = messages_form_'+id_form+'.'+name[2] );
		
		if( ( $(this).val() != '' && $(this).val() !== lastpassword ) || ( $(this).is('.required') && $(this).val() == '' ) )  
			addError( msg, this );            
		else 
			removeError(this);


	}); 
          
	
	$('.contact-form .email-validate').blur(function(){             
		var expr = /^[_a-z0-9+-]+(\.[_a-z0-9+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/;
		var name = $(this).attr('name').match( /(.*)\[(.*)\]/ );       
		var id_form = $(this).parents('.contact-form').find('input[name="id_form"]').val();
		
		jQuery.globalEval( 'var msg = messages_form_'+id_form+'.'+name[2] );
		
		if( ( $(this).val() != '' && !expr.test( $(this).val() ) ) || ( $(this).is('.required') && $(this).val() == '' ) )  
			addError( msg, this );            
		else 
			removeError(this);
	}); 
    
	$('.contact-form .zip-validate').blur(function(){             
		var expr = /^[0-9]+$/;
		var name = $(this).attr('name').match( /(.*)\[(.*)\]/ );       
		var id_form = $(this).parents('.contact-form').find('input[name="id_form"]').val();
		
		jQuery.globalEval( 'var msg = messages_form_'+id_form+'.'+name[2] );
		
		if( ( $(this).val() != '' && !expr.test( $(this).val() ) ) || ( $(this).is('.required') && $(this).val() == '' )||( $(this).val() != '' && ( $(this).val() ).length!=5 ) )  
			addError( msg, this );            
		else 
			removeError(this);
	}); 

	$('.contact-form .name-validate').blur(function(){             
		var expr = /^[-a-zA-Z]* [-a-zA-Z]* [-a-zA-Z]+$/;
		var name = $(this).attr('name').match( /(.*)\[(.*)\]/ );       
		var id_form = $(this).parents('.contact-form').find('input[name="id_form"]').val();
		
		jQuery.globalEval( 'var msg = messages_form_'+id_form+'.'+name[2] );
		
		if( ( $(this).val() != '' && !expr.test( $(this).val() ) ) || ( $(this).is('.required') && $(this).val() == '' ) )  
			addError( msg, this );            
		else 
			removeError(this);
	}); 

		$('.contact-form .username-validate').blur(function(){             
		var expr = /^[-a-zA-Z0-9.]+$/;
		var name = $(this).attr('name').match( /(.*)\[(.*)\]/ );       
		var id_form = $(this).parents('.contact-form').find('input[name="id_form"]').val();
		
		jQuery.globalEval( 'var msg = messages_form_'+id_form+'.'+name[2] );
		
		if( ( $(this).val() != '' && !expr.test( $(this).val() ) ) || ( $(this).is('.required') && $(this).val() == '' ) )  
			addError( msg, this );            
		else 
			removeError(this);
	});

 /*
	$('.contact-form').submit(function(){
		addLoading( '.contact-form input:submit' );  
	});*/
	
	$('input[placeholder], textarea[placeholder]').placeholder(); 

$("#sub").click(function(){	  
	$("body").css("cursor","wait");
	if(error) {alert("Some field doesn't meet its requirements"); return;}
var pass=$("#password-contact-form").val();
var fullname=$("#name-contact-form").val();
var username=$("#username-contact-form").val();
var emaill=$("#email-contact-form").val();
var birth=$("#birthbirth").val();
var citty=$("#city-contact-form").val();
var coun=$("#country-contact-form").val();
var zip=$("#zip-contact-form").val();
var org=$("#org-contact-form").val();
var study=$(".study").val();
var phone=$("#phone-contact-form").val();
var bbio=$("#bio-contact-form").val();
var con=$("#confirm-contact-form").val();



 $.ajax({
        url: "https://gathologyg.pythonanywhere.com/API/signup/",
        type: 'Post',
        dataType: "json",
        data:{key:JSON.stringify({
          user:{
            email: emaill,
            password: pass,
            username: username,
           	first_name:fullname.split(" ")[0],
            last_name: fullname.split(" ")[2]

        },
        confirm_password: con,
        birthdate:  new Date(birth).getFullYear()+"-"+new Date(birth).getMonth()+"-"+new Date(birth).getDate(),
        city: citty,
        country: coun,
        zipc_code: zip,
        organization: org,
        specialty: study,
        phone_number: phone,
        bio: bbio
        })},
        success: function( result) {
        	window.sessionStorage.setItem("userr_name",username);
		window.location.assign("profile.html");
        },
        error: function() {
    alert("Username or email or phone number already exists!");
  }
    });



  $("body").css("cursor","default"); 
});


});   
