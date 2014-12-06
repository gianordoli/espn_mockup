$(document).ready(function () {


	// CSS navigation
    $('a.button').bind('mouseup', function(event){
    	var widgets = $('a.button');
    	$.each(widgets, function(){
			$(this).removeClass('selected');
    	});
        $(this).addClass('selected');
    });


    // Sidebar
	$('#hamburger').bind('mouseup', function(event){
		var right = ($(window).width() - ($('#menu_widgets').offset().left + $('#menu_widgets').width()));
		// console.log(right);
		console.log($('#chat'));
		if(right == 0){
			$('#menu_widgets').animate({right: -$('#menu_widgets').width() + $('#hamburger').width()}, 500, 'swing');
			$('#chat').animate({right: 10}, 500);
		}else{
			$('#menu_widgets').animate({right: 0}, 500);
			$('#chat').animate({right: $('#menu_widgets').width() + 10}, 500);
		}
	});


	// Sidebar widgets
	$('#channels').bind('mouseup', function(event){
		var myId = $(this).attr('id');
		var img_index = 0;

    	var myImg = $('<img src="img/' + myId + '_' + img_index + '.jpg"/>')
    				.bind('mouseup', function(){

    					// increase step
    					// (image_index, max #steps before callback, and callback)
    					img_index = increaseSteps(img_index, 1, function(i){

    						// Creates image
    						var windowImg = $('<img src="img/' + myId + '_' + i + '.jpg"/>');
    						
    						// Creates window (x, y, w, h, id, img)
    						createDraggableWidget(100, 200, 400, 400, myId + '_widget', windowImg);
    					});

    					//Replaces the image with the next one
    					$(this).attr('src', 'img/' + myId + '_' + img_index + '.jpg');
    				});

    	// Replaces the content of the sidebar with the new img
        $('#menu_widgets_content').html(myImg);
	});	

	function createDraggableWidget(x, y, w, h, id, img){
		// If a window with this id hasn't been created yet...
		if($('#'+id).length == 0){
			var newWidget = $('<div id=' + id + ' class="draggable"></div>')
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