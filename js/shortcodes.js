    /* JS for Shortcode */
(function($){

$(document).ready(function(){


 jQuery.globalEval( "var clicked=0" ); 

	
	
	// toggle
	$('.toggle-content:not(.opened), .content-tab:not(.opened)').hide(); 
    $('.tab-index a').click(function(){           
        $(this).parent().next().slideToggle(300, 'easeOutExpo');
        $(this).parent().toggleClass('tab-opened tab-closed');
        $(this).children('span').toggleClass('icon-plus-sign icon-minus-sign');
        $(this).attr('title', ($(this).attr('title') == 'Close') ? 'Open' : 'Close');
        return false;
    });
    
    // tabs
    $( '.features-tab-container' ).yiw_features_tab();
    $('.tabs-container').yiw_tabs({
        tabNav  : 'ul.tabs',
        tabDivs : '.border-box'
    });
    
    //newsletter form
    var input_newsletter = $('.newsletter-section .text-field');
    var prev_input_newsletter_val = null;
    
    input_newsletter.focus(function() {
        if( $( this ).val() == '' ) {
            prev_input_newsletter_val = $( this ).val();
            $( this ).prev( 'label' ).hide();
        }
       
    input_newsletter.blur(function(){ 
        if( $(this).val() == '' ) {   
            $(this).val(prev_input_newsletter_val);
            $( this ).prev( 'label' ).show();
        }
        }); 
    });
    
    //flickr rss
    $( '.widget_flickrRSS img' ).hover(
        function() {
            $( this ).stop( true, true ).animate( { 'opacity' : 0.6 } );
        },
        function() {
            $( this ).stop( true, true ).animate( { 'opacity' : 1 } );
        }
    );
    

});

})(jQuery);

// features tab plugin
(function($) {
    $.fn.yiw_features_tab = function( options ) {
        var config = {
            'tabNav' : 'ul.features-tab-labels',
            'tabDivs': 'div.features-tab-wrapper'
        };
        
        if( options ) $.extend( config, options );
        
        this.each( function () {
           var tabNav  = $( config.tabNav, this );
           var tabDivs = $( config.tabDivs, this );
           var labelNumber = tabNav.children( 'li' ).length;
           
           $(window).load(function(){
               tabDivs.children( 'div' ).hide();
               $("#resultcharts").children( 'div' ).hide();
               var currentDiv = tabDivs.children( 'div' ).eq( tabNav.children( 'li.current-feature' ).index() );
               currentDiv.show();
           });


           $( 'li', tabNav ).click( function() {
               if( !$( this ).hasClass( 'current-feature' ) ) {
                   var currentDiv = tabDivs.children( 'div' ).eq( $( this ).index() );
                   tabNav.children( 'li' ).removeClass( 'current-feature' );
                   x=$( this ).index();
                   jQuery.globalEval( "var clicked=x" ); 
                     $( this ).addClass( 'current-feature' );

                   tabDivs.children( 'div' ).hide().removeClass( 'current-feature' );
                   currentDiv.fadeIn( 'slow' );

               }            
           });       
           
        });
    }
})(jQuery);

// tabs plugin
(function($) {
    $.fn.yiw_tabs = function(options) {
        // valori di default
        var config = {
            'tabNav': 'ul.tabs',
            'tabDivs': '.containers',
            'currentClass': 'current'
        };      
 
        if (options) $.extend(config, options);
    	
    	this.each(function() {   
        	var tabNav = $(config.tabNav, this);
        	var tabDivs = $(config.tabDivs, this);
        	var activeTab;
        	var maxHeight = 0;
        
        	
            tabDivs.children('div').hide();
    	
    	    if ( $('li.'+config.currentClass+' a', tabNav).length > 0 )
               activeTab = '#' + $('li.'+config.currentClass+' a', tabNav).attr('href').split('#')[1]; 
        	else
        	   activeTab = '#' + $('li:first-child a', tabNav).attr('href').split('#')[1];
                        
        	$(activeTab).show().addClass('showing');
            $('li:first-child a', tabNav).parents('li').addClass(config.currentClass);
        	
        	$('a', tabNav).click(function(){
        		var id = '#' + $(this).attr('href').split('#')[1];
        		var thisLink = $(this);
        		
        		$('li.'+config.currentClass, tabNav).removeClass(config.currentClass);
        		$(this).parents('li').addClass(config.currentClass);
        		
        		$('.showing', tabDivs).fadeOut(200, function(){
        			$(this).removeClass('showing');
        			$(id).fadeIn(200).addClass('showing');
        		});
        		
        		return false;
        	});   
        });
    }
})(jQuery);     
