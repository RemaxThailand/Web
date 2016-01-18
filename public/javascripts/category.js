$(function() {
	$('img.lazy').lazyload({
		effect : "fadeIn",
		event: "scrollstop"
	});
	
	$('.numberFormat').each(function(){
		var number = $(this).attr('data-value');
		$(this).html(numberWithCommas(number)); 
	});
});
