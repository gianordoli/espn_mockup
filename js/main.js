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



 
})