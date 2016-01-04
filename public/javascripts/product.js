$(function() {

	$(document).on('click', '.img_small_list', function(){
		$('.img_small_list.active').removeClass('active');
		$(this).addClass('active');
		$('#img_main').attr('src', $(this).attr('src').replace('100x100', '500x500') );
	});

});