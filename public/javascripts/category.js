$(function() {

	$('.numberFormat').each(function(){
		var number = $(this).attr('data-value');
		$(this).html(numberWithCommas(number)); 
	});
	
	$(window).scroll(function(){
		var a = $('#scroll-top').find('a');
		if ($(this).scrollTop() > 250) {		
			a.fadeIn(200);
		} else {
			a.fadeOut(200);
		}
    });
	$('#scroll-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
});