$(document).ready(function () {

    $('a.button').bind('mouseup', function(event){
    	var widgets = $('a.button');
    	$.each(widgets, function(){
			$(this).removeClass('selected');
    	});
        $(this).addClass('selected');
    });

	$('#hamburger').bind('mouseup', function(event){
		var right = ($(window).width() - ($('#menu_widgets').offset().left + $('#menu_widgets').width()));
		console.log(right);
		if(right == 0){
			$('#menu_widgets').animate({right: -$('#menu_widgets').width() + $('#hamburger').width()}, 500, 'swing');		
		}else{
			$('#menu_widgets').animate({right: 0}, 500);		
		}
	});


	$('#channels').bind('mouseup', function(event){

		var channelsIndex = 0;

    	var myImg = $('<img src="img/channels_' + channelsIndex + '.jpg"/>')
    				.bind('mouseup', function(){

    					// increase step	
    					channelsIndex = increaseSteps(channelsIndex, 1, function(i){

    						// Creates image
    						var windowImg = $('<img src="img/channels_' + i + '.jpg"/>');
    						
    						// Creates window
    						createDraggableWidget(100, 200, 400, 400, 'channels_widget', windowImg);
    					});    					
    					$(this).attr('src', 'img/channels_' + channelsIndex + '.jpg');
    				});

        $('#menu_widgets_content').html(myImg);
	});	

	function createDraggableWidget(x, y, w, h, id, img){
		// If the window hasn't been created yet...
		if($(id).length == 0){
			var newWidget = $('<div class="draggable"></div>')
							.css({
								'position': 'absolute',
								'top': x,
								'left': y,
								'width': w,
								'height': h
							});
			$(newWidget).append(img);
			$('body').append(newWidget);			
		}
	}

	function increaseSteps(index, max, callback){
		index ++;
		if(index > max){
			callback(index);
			index = 0;			
		}
		return index;
	}

 
});