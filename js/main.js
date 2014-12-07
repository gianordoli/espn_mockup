$(document).ready(function () {
	

	$('#hamburger').bind('mouseup', function(event){
		var right = ($(window).width() - ($('#menu_widgets').offset().left + $('#menu_widgets').width()));
		console.log(right);
		if(right == 0){
			$('#menu_widgets').animate({right: -$('#menu_widgets').width() + $('#hamburger').width()}, 500, 'swing');		
		}else{
			$('#menu_widgets').animate({right: 0}, 500);		
		}

	});

	$('#timeline_open').bind('mouseup', function(event){
		var width = ($('#menu_timeline').width());
		console.log(width);
		if(width == 0){
			$('#menu_timeline').animate({width: 645}, 1000, 'swing');		
			$('#comment_espn_open').css({'width':'160'});
			$('#comment_public_open').css({'width':'160'});
			$('#comments_open').css({'width':'160'});
			$('#timeline_open').css({'background':'url("img/timeline5.png") top right no-repeat'});		
		}else{
			$('#menu_timeline').animate({width: 0}, 1000);		
			$('#comment_espn').css({'left':'-400'});
			$('#comment_espn_open').css({'width':'0'});
			$('#comment_public_open').css({'width':'0'});
			$('#comments_open').css({'width':'0'});
			$('#timeline_open').css({'background':'url("img/timeline6.png") top right no-repeat'});		
		}

	});

	$('#comments_open').bind('mouseup', function(event){
		var open = ($('#comments_open').width());
		var xPos = event.pageX-54;
		$('#comment_bubble').css({'left':'-400px'});
		if(open != 0){
			$('#comment_bubble').css({'left':xPos}).fadeIn(100).delay(1200).fadeOut(400);
			//if we are clicking in the higher row => ESPN comments background
			if(event.pageY < 685){
				$('#comment_bubble').css({'background':'URL("img/timeline4.png") top left no-repeat'});
			}else{
				$('#comment_bubble').css({'background':'URL("img/timeline3.png") top left no-repeat'});
				//$('#comment_bubble').css({'background':'URL("img/timeline3.png") top left no-repeat'}).fadeIn(100).delay(3000).fadeOut(400);
			}
		}
	});

	//THIS DOESN'T PLAY ON THE IPAD
	$('#replay').bind('mouseup', function(event){
		$('#webkit_movie_wrapper').replaceWith('<div id="webkit_movie_wrapper"><video height="749" preload="auto" controls="controls" autoplay="true" loop="loop" src="videos/video2_1.mp4"></video>');
	});



	// CSS navigation
    $('a.button').bind('mouseup touchend', function(event){
    	var widgets = $('a.button');
    	$.each(widgets, function(){
			$(this).removeClass('selected');
    	});
        $(this).addClass('selected');
    });


    // Sidebar
	$('#hamburger').bind('mouseup touchend', function(event){
		// console.log($('#container').width());
		// console.log($(window).width());
		console.log($('#menu_widgets').css('right'));
		var right = $('#menu_widgets').css('right');
		right = (right.substring(0, right.length - 2))*1;
		console.log(right);
		if($('#container').offset().left < 0){
			$('#container').animate({left: 0}, 500);	
		}else{
			$('#container').animate({left: - $('#menu_widgets_content').width()}, 500);	
		}
	});


	// Sidebar widgets: channels
	$('#channels').bind('mouseup touchend', function(event){
		var myId = $(this).attr('id');
		var img_index = 0;

    	var myImg = $('<img src="img/' + myId + '_' + img_index + '.png"/>')
    				.bind('mouseup', function(){

    					// increase step
    					// (image_index, max #steps before callback, and callback)
    					img_index = increaseSteps(img_index, 1, function(i){

    						// Creates image
    						var windowImg = $('<img src="img/' + myId + '_' + i + '.png"/>');
    						
    						// Creates window (x, y, w, h, id, img)
    						createDraggableWidget(800, 400, myId + '_widget', windowImg);
    					});

    					//Replaces the image with the next one
    					$(this).attr('src', 'img/' + myId + '_' + img_index + '.png');
    				});

    	// Replaces the content of the sidebar with the new img
        $('#menu_widgets_content').html(myImg);
	});	

	// Sidebar widgets: fantasy
	$('#fantasy').bind('mouseup touchend', function(event){
		var myId = $(this).attr('id');
		var img_index = 0;

    	var myImg = $('<img src="img/' + myId + '_' + img_index + '.png"/>')
    				.bind('mouseup touchend', function(){

    					// increase step
    					// (image_index, max #steps before callback, and callback)
    					img_index = increaseSteps(img_index, 3, function(i){});

    					//Replaces the image with the next one
    					$(this).attr('src', 'img/' + myId + '_' + img_index + '.png');
    				});

    	// Replaces the content of the sidebar with the new img
        $('#menu_widgets_content').html(myImg);
	});

	// Sidebar widgets: views
	$('#views').bind('mouseup touchend', function(event){
		var myId = $(this).attr('id');
		var img_index = 0;

    	var myImg = $('<img src="img/' + myId + '_' + img_index + '.png"/>')
    				.bind('mouseup touchend', function(){

    					// increase step
    					// (image_index, max #steps before callback, and callback)
    					img_index = increaseSteps(img_index, 1, function(i){});

    					//Replaces the image with the next one
    					$(this).attr('src', 'img/' + myId + '_' + img_index + '.png');
    				});

    	// Replaces the content of the sidebar with the new img
        $('#menu_widgets_content').html(myImg);
	});

	// Chat
	var chat_index = 0;	
	$('#chat').bind('mouseup touchend', function(event){
		// console.log('hey');
		var myId = $(this).attr('id');
		chat_index = increaseSteps(chat_index, 8, function(i){});
		var myImg = $('<img src="img/' + myId + '_' + chat_index + '.png"/>');
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
			$(newWidget).bind('mousedown touchstart', function(event){
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
			$(newWidget).bind('mouseup touchend', function(event){
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

	$('body').bind('mousemove touchmove', function(event){
		event.preventDefault();
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

 
})