var isCheck = false;
$(function() {
	$('.hidden').removeClass('hidden').hide();
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
		effect : "fadeIn",
		event: "scrollstop"
	});
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

	},'json').fail( function(xhr, textStatus, errorThrown) { console.log(xhr.statusText); });
};