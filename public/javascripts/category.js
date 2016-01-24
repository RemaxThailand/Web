$(function() {
	$('img.lazy').lazyload({
		effect : "fadeIn",
		event: "scrolltop"
	});
	$('.numberFormat').each(function(){
		var number = $(this).attr('data-value');
		$(this).html(numberWithCommas(number)); 
	});
});