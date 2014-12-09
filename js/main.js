$(document).ready(function () {

	
	/*------------------ WIDGETS --------------------*/
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

		if($('#menu_widgets').offset().left == 747){
			$('#menu_widgets').animate({left: 747 + $('#menu_widgets_content').width()}, 500);	
			$('#chat').animate({left: 549 + $('#menu_widgets_content').width()}, 500);
			$('.draggable').animate({left: $('.draggable').offset().left + $('#menu_widgets_content').width()}, 500);
		}else{
			$('#menu_widgets').animate({left: 747}, 500);
			$('#chat').animate({left: 549}, 500);	
			$('.draggable').animate({left: $('.draggable').offset().left - $('#menu_widgets_content').width()}, 500);
		}
	});


	// Sidebar widgets: channels
	$('#channels').bind('mouseup', function(event){
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
    						createDraggableWidget(549, 400, myId + '_widget', windowImg);
    					});

    					//Replaces the image with the next one
    					$(this).attr('src', 'img/' + myId + '_' + img_index + '.png');
    				});

    	// Replaces the content of the sidebar with the new img
        $('#menu_widgets_content').html(myImg);
	});	

	// Sidebar widgets: stats
	$('#stats').bind('mouseup', function(event){
		var myId = $(this).attr('id');
		var img_index = 0;

    	var myImg = $('<img src="img/' + myId + '_' + img_index + '.png"/>')
    				.bind('mouseup', function(){

    					// increase step
    					// (image_index, max #steps before callback, and callback)
    					img_index = increaseSteps(img_index, 4, function(i){});

    					//Replaces the image with the next one
    					$(this).attr('src', 'img/' + myId + '_' + img_index + '.png');
    				});

    	// Replaces the content of the sidebar with the new img
        $('#menu_widgets_content').html(myImg);
	});	

	// Sidebar widgets: fantasy
	$('#fantasy').bind('mouseup', function(event){
		var myId = $(this).attr('id');
		var img_index = 0;

    	var myImg = $('<img src="img/' + myId + '_' + img_index + '.png"/>')
    				.bind('mouseup', function(){

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
	$('#views').bind('mouseup', function(event){
		var myId = $(this).attr('id');
		var img_index = 0;

    	var myImg = $('<img src="img/' + myId + '_' + img_index + '.png"/>')
    				.bind('mouseup', function(){

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
	$('#chat').bind('mouseup', function(event){
		// console.log('hey');
		var myId = $(this).attr('id');
		chat_index = increaseSteps(chat_index, 8, function(i){});
		var myImg = $('<img src="img/' + myId + '_' + chat_index + '.png"/>');
        $(this).html(myImg);
	});	


	function createDraggableWidget(x, y, id, img){
		// If a window with this id hasn't been created yet...
		if($('#'+id).length == 0){
			var newWidget = $('<div id=' + id + ' class="draggable"></div>')
							.css({
								'position': 'absolute',
								'left': x,
								'top': y,
								'z-index': 100
							});


			$(img).bind('mouseup', function(event){
				// console.log('mouseup');

				var clickOffset = {
					x: event.pageX - $(this).offset().left,
					y: event.pageY - $(this).offset().top
				}

				if(0 < clickOffset.y && clickOffset.y < 80){

					//Close
					if(210 < clickOffset.x && clickOffset.x < $(this).width()){
						// console.log('close');
						$(this).parent().remove();

					// No camera
					}else if(150 < clickOffset.x && clickOffset.x < 210){	
					console.log('camera');				
						var currSrc = $(this).attr('src');
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
						console.log($(this).attr('src', newSrc));
					}

				}

			});			
			$(newWidget).append(img);
			$(newWidget).draggable();
			$('#container').append(newWidget);			
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
	/*-----------------------------------------------*/

	
	/*------------------ TIMELINE -------------------*/
	$('#timeline_open').bind('mouseup', function(event){
		var width = ($('#menu_timeline').width());
		// console.log(width);
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
	/*-----------------------------------------------*/


	/*-------------------- VIDEO --------------------*/
	// Toggle video controls
	// Need to disable them when video is playing,
	// otherwise all clickable elements are disabled on te iPad

	function toggleVideoControls(){
		console.log('hey');
	  if ($("video:visible")) {
	    if ($("video").prop("controls")) {
	      $("video").prop("controls", false);  
	    } else {
	      $("video").prop("controls", true)
	    }  
	  }		
	}
	$('video').bind('play', toggleVideoControls);

	//THIS DOESN'T PLAY ON THE IPAD
	$('#replay').bind('mouseup', function(event){
		var newVideo = $('<video width="1332" height="749" preload="auto" controls="controls" autoplay="true" loop="loop" src="videos/video2_1.mp4"></video>');
		$(newVideo).bind('play', toggleVideoControls);

		$('#webkit_movie_wrapper').empty();
		$('#webkit_movie_wrapper').append(newVideo);
	});	
	/*-----------------------------------------------*/
});