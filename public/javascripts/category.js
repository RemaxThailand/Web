$(function() {
	$('img.lazy').lazyload({
		effect : "fadeIn"
	});
	$('.numberFormat').each(function(){
		var number = $(this).attr('data-value');
		$(this).html(numberWithCommas(number)); 
	});
});
$( document ).ready(function() {
    console.log( "ready!" );
});