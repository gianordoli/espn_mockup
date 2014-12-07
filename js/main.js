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

    	var myImg = $('<img src="img/' + myId + '_' + img_index + '.svg"/>')
    				.bind('mouseup', function(){

    					// increase step
    					// (image_index, max #steps before callback, and callback)
    					img_index = increaseSteps(img_index, 1, function(i){

    						// Creates image
    						var windowImg = $('<img src="img/' + myId + '_' + i + '.svg"/>');
    						
    						// Creates window (x, y, w, h, id, img)
    						createDraggableWidget(800, 400, myId + '_widget', windowImg);
    					});

    					//Replaces the image with the next one
    					$(this).attr('src', 'img/' + myId + '_' + img_index + '.svg');
    				});

    	// Replaces the content of the sidebar with the new img
        $('#menu_widgets_content').html(myImg);
	});	

	// Chat widgets
	var chat_index = 0;	
	$('#chat').bind('mouseup', function(event){
		console.log('hey');
		var myId = $(this).attr('id');
		chat_index = increaseSteps(chat_index, 8, function(i){});
		var myImg = $('<img src="img/' + myId + '_' + chat_index + '.svg"/>');
        $(this).html(myImg);
	});	

	var draggedObj = '';
	var dragOffset;

	function createDraggableWidget(x, y, id, img){
		// If a window with this id hasn't been created yet...
		if($('#'+id).length == 0){
			var newWidget = $('<div id=' + id + ' class="draggable"></div>')
							.css({
								'position': 'absolute',
								'left': x,
								'top': y
							});
			$(newWidget).append(img);
			$(newWidget).bind('mousedown', function(event){
				event.preventDefault();
				// console.log('x: ' + $(this).offset().left + ', y: ' + $(this).offset().top);
				// console.log('x: ' + event.pageX + ', y: ' + event.pageY);
				dragOffset = {
					x: event.pageX - $(this).offset().left,
					y: event.pageY - $(this).offset().top
				}	

				// Close
				if(210 < dragOffset.x && dragOffset.x < $(this).width() &&
				   0 < dragOffset.y && dragOffset.y < 80){
					// console.log('close');
					$(this).remove();

				// Start dragging
				}else if(0 < dragOffset.y && dragOffset.y < 40){
					draggedObj = this;
				}
			});
			$(newWidget).bind('mouseup', function(event){
				// console.log($(this).attr('id'));
				if($(draggedObj).attr('id') == $(this).attr('id')){
					draggedObj = '';	
				}else{
					var currSrc = $(this).children('img').attr('src');
					var currIndex = currSrc.charAt(currSrc.lastIndexOf('_') + 1);
					console.log(currIndex);
					var newSrc = currSrc;
					if(currIndex == '2'){
						// console.log('hey');
						newSrc = currSrc.replace('2', '3');
					}else if(currIndex == '3'){
						newSrc = currSrc.replace('3', '2');
					}
					console.log(newSrc);
					console.log($(this).children('img').attr('src', newSrc));
				}
			});			

			$('body').append(newWidget);			
		}
	}

	$('body').bind('mousemove', function(event){
		if(draggedObj != ''){
			$(draggedObj).css({
				'left': event.pageX - dragOffset.x,
				'top': event.pageY - dragOffset.y
			});			
		}
	});

	function increaseSteps(index, max, callback){
		index ++;
		if(index > max){
			callback(index);
			index = 0;			
		}
		return index;
	}

 
});