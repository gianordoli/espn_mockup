$(document).ready(function () {

	$('body').bind('mouseup', function(event){
		var right = ($(window).width() - ($('#menu_widgets').offset().left + $('#menu_widgets').width()));
		console.log(right);
		if(right == 0){
			$('#menu_widgets').animate({right: -$('#menu_widgets').width()}, 500, 'swing');		
		}else{
			$('#menu_widgets').animate({right: 0}, 500);		
		}

	});
 
});