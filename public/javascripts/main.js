var isCheck = false;
var device = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? 'mobile' : 'desktop';
$(function() {
	//$('#newsModal').modal();
	$('.hidden').removeClass('hidden').hide();
	//$('.pinItem#premium').hide()
	$('#mainPin').addClass('margin-right-1');
	/*if ($( window ).width() > 1000) {
		$('#mainPin').addClass('margin-right-1');
		$('#mainPin').scrollToFixed({ marginTop: 20 });

		if(window.location.pathname.length < 2){
			$(window).scroll(function(){
				if ($(this).scrollTop() > 25) {
					$('.navbar').fadeOut(100);
				} else {
					$('.navbar').slideDown(500);
				}
			});
		}

	}*/
		//--------------Check Remax Product----------------//
	$(document).on('keydown', '#txt-remax_barcode', function(e){
		var key = e.charCode || e.keyCode || 0;
		if (key == 13) {
			$('#btn-remax_barcode').click();
		}
	});
	$('#check_remax_product').submit(function(e){
		return false;
	});
	$('#btn-remax_barcode').click(function(){
		if($('#txt-remax_barcode').val() == ''){
			$('#txt-remax_barcode').focus();
		}else{
			checkRemaxProduct();
			$('#product-load').show();
			$('#txt-remax_barcode').hide();
			$('.alert-remax_barcode').hide();
			$(".button-check_remax_product").hide();
		}
	});
	$(".back-remax_barcode").click(function(){
		$(".alert-remax_barcode").fadeOut();
		$("#txt-remax_barcode").fadeIn();
		$(".button-check_remax_product").fadeIn();
		$(".back-remax_barcode").hide();
	});
	//--------------End Check Remax Product----------------//

	$('img.lazy').lazyload({
		effect : "fadeIn"
	});

	/* $('img.lazy').lazyload({
		effect : "fadeIn",
		event: "scrollstop"
	});  */
	(function(i, s, o, g, r, a, m) {
	    i['GoogleAnalyticsObject'] = r;
	    i[r] = i[r] || function() {
	        (i[r].q = i[r].q || []).push(arguments)
	    }, i[r].l = 1 * new Date();
	    a = s.createElement(o),
	        m = s.getElementsByTagName(o)[0];
	    a.async = 1;
	    a.src = g;
	    m.parentNode.insertBefore(a, m)
	})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

	ga('create', 'UA-82671626-1', 'auto');
	ga('send', 'pageview');
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

jQuery.fn.ForceNumericOnly = function() {
	return this.each(function() {
		$(this).keydown(function(e) {
			if (/^[0-9]+$/.test($(this).val()) == false) {
				var text = $(this).val();
				$(this).val( text.substr(0, text.length-1) );
			}
			var key = e.charCode || e.keyCode || 0;
			return (
				(
					key == 13 || // Enter
					key == 8 || // Back Space
					key == 9 || // Tab
					(key >= 48 && key <= 57 && e.shiftKey== false) || // 0-9
					(key >= 96 && key <= 105) // 0-9 (Numpad)
				) && ( $(this).val().length == 0 || (/^[0-9]+$/.test($(this).val())) )
			);
		}),
		$(this).keyup(function(e) {
			if (/^[0-9]+$/.test($(this).val()) == false) {
				var text = $(this).val();
				$(this).val( text.substr(0, text.length-1) );
			}
		});
	});
};

function checkRemaxProduct(){
	$.post( $('#apiUrlSite').val()+'/warranty/remax', {
		apiKey: $('#apiKey').val(),
		barcode: $.trim($('#txt-remax_barcode').val())
	}, function(data){
		if (data.success) {
			if(data.result.length != 0 ){
				if(!data.result.noSN && typeof data.result.sellDate != 'undefined'){
						var sellDateYearTH = parseInt(moment(data.result.sellDate).lang('th').format('YYYY'))+543;
						var sellDateMM = moment(data.result.sellDate).locale('th').format('MMMM');
						$('#ProductName').html(data.result.productName);
						$('#SellDate').html('จำหน่ายเมื่อ : '+sellDateMM+' '+sellDateYearTH);
						$('#product-info').fadeIn();
						$("#product-load").hide();
						$(".back-remax_barcode").show();

					}else{
						if(data.result.noSN){
							$('#remax_nosn').show();
							$("#product-load").hide();
							$(".back-remax_barcode").show();

						}else{
							$('#remax_not_exist').show();
							$("#product-load").hide();
							$(".back-remax_barcode").show();

						}
					}
			}else{
				if(data.result.noSN){
					$('#remax_nosn').show();
					$("#product-load").hide();
					$(".back-remax_barcode").show();

				}else{
					$('#remax_not_exist').show();
					$("#product-load").hide();
					$(".back-remax_barcode").show();

				}
			}
		}else{
			$('#remax_not_exist').show();
			$("#product-load").hide();
			$(".back-remax_barcode").show();
		}
		$('#shopBox').removeClass('margin-bottom-15');
	},'json').fail( function(xhr, textStatus, errorThrown) { console.log(xhr.statusText); });
};
