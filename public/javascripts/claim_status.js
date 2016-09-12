var apiUrl = 'https://api.remaxthailand.co.th';
var claimInfo;
var chkClaim = false;

$(function() {
	$(document).submit(function(e){ // Disable Enter Key //
		return false;
	});

	$("#txt-claimno").keyup(function(event){
		if(event.keyCode == 13){
			$("#btn-claimno").click();
		}
	});

	$("#btn-claimno").click(function(){
		if($('#txt-claimno').val() == ''){
			$('#txt-claimno').focus();
		}else{
			chkClaim = true;
			checkClaim();
			$("#alert-not_exist").hide();
			$('#dv-claim_info').hide();
			$("#alert-load").show();
		}
	});
});

function checkClaim(){
	$.post(apiUrl+'/claim/info', {
		apiKey: $('#apiKey').val(),
		shop: '',
		id: $('#txt-claimno').val(),
		barcode: '',
		claimdate_from: '',
		claimdate_to: '',
		status: '',
		firstname: '',
		lineid: '',
		tel: ''
	}, function(data){
			if (data.success) {
				if(data.result[0].length > 0){
					claimInfo = data.result[0][0];
					productInfo(data.result[0][0].barcode);
				}else{
					$('#alert-not_exist').show();
					$("#alert-load").hide();
				}
			}else{
				$('#alert-not_exist').show();
				$("#alert-load").hide();
			}
	}, 'json').fail( function(xhr, textStatus, errorThrown) { console.log(xhr.statusText); });
};

function productInfo(barcode_info){
	$.post(apiUrl+'/warranty/info', {
		apiKey: $('#apiKey').val(),
		barcode: barcode_info
	}, function(data){
		if (data.success) {
			if (data.result.length != 0){
				if (chkClaim){
					claimInformation(data)
				}
			}
		}
	},'json').fail( function(xhr, textStatus, errorThrown) { console.log(xhr.statusText); });
};

function claimInformation(data){
	var claimStatus = '';
	if (claimInfo.status == 'CI') claimStatus = 'ตรวจสอบข้อมูล', $('#claim-ClaimStatus').removeClass(), $('#claim-ClaimStatus').addClass('text-danger');
	else if (claimInfo.status == 'AP') claimStatus = 'อยู่ในเงื่อนไขการเคลม', $('#claim-ClaimStatus').removeClass(), $('#claim-ClaimStatus').addClass('text-primary');
	else if (claimInfo.status == 'RJ') claimStatus = 'ไม่รับเคลมสินค้า', $('#claim-ClaimStatus').removeClass(), $('#claim-ClaimStatus').addClass('text-danger');
	else if (claimInfo.status == 'RP') claimStatus = 'ระบบได้รับสินค้าเคลมแล้ว', $('#claim-ClaimStatus').removeClass(), $('#claim-ClaimStatus').addClass('text-success');
	else if (claimInfo.status == 'WS') claimStatus = 'รอส่ง', $('#claim-ClaimStatus').removeClass(), $('#claim-ClaimStatus').addClass('text-success');
	else if (claimInfo.status == 'SH') claimStatus = 'จัดส่งสินค้าเคลมให้ลูกค้า', $('#claim-ClaimStatus').removeClass(), $('#claim-ClaimStatus').addClass('text-success');
	else claimStatus = 'กรุณาติดต่อ ฝ่ายเคลม Line : @remaxservice';

	var YearTH = parseInt(moment(claimInfo.claimDate).lang('th').format('YYYY'))+543;
	var DateMM = moment(claimInfo.claimDate).locale('th').format('DD MMMM');

	var YearReceiveDate;
	var DateReceiveDate;
	if( typeof claimInfo.receiveDate != 'undefined' && claimInfo.receiveDate != ''){
		if (moment(claimInfo.receiveDate).lang('th').format('YYYY') != '1900'){
			YearReceiveDate = parseInt(moment(claimInfo.receiveDate).lang('th').format('YYYY'))+543;
			DateReceiveDate = moment(claimInfo.receiveDate).locale('th').format('DD MMMM');
		}else{
			YearReceiveDate = '';
			DateReceiveDate = '';
		}
	}

	var YearSentDate;
	var DateSentDate;
	if( typeof claimInfo.sentDate != 'undefined' && claimInfo.sentDate != ''){
		if (moment(claimInfo.sentDate).lang('th').format('YYYY') != '1900'){
			YearSentDate = parseInt(moment(claimInfo.sentDate).lang('th').format('YYYY'))+543;
			DateSentDate = moment(claimInfo.sentDate).locale('th').format('DD MMMM');
		}else{
			YearSentDate = '';
			DateSentDate = '';
		}
	}

	$('#claim-ClaimDate').html('<font size="1"><b>วันที่ส่งข้อมูล : </b>'+ DateMM+' '+YearTH+'</font>');
	$('#claim-ClaimNo').html('<b>เลขที่การเคลม : </b>'+ claimInfo.claimNo);
	$('#claim-ClaimStatus').html('<b>สถานะ : </b>'+'<u>'+ claimStatus +'</u>');

	if(claimInfo.receiveDate != null && typeof claimInfo.receiveDate != undefined){
		$('#claim-RecieveDate').html('<font size="1"><b>รับของเคลมเข้าระบบเมื่อ : </b>'+ DateReceiveDate+' '+YearReceiveDate+'</font>');
	}
	if(claimInfo.sentDate != null && typeof claimInfo.sentDate != undefined){
		$('#claim-SentDate').html('<font size="1"><b>ส่งออกของเคลมเมื่อ : </b>'+ DateSentDate+' '+YearSentDate+'</font>');
	}

	$('#claim-ProductName').html('<b>ชื่อสินค้า : </b>'+data.result.productName);
	$('#claim-Barcode').html('<b>หมายเลข Barcode : </b>'+data.result.barcode);
	$('#claim-Description').html('<b>รายละเอียด : </b>'+claimInfo.description);

	$('#sum-name').html('คุณ '+claimInfo.firstname+' '+claimInfo.lastname+(typeof claimInfo.nickname != 'undefined' && claimInfo.nickname != '' ? ' ('+claimInfo.nickname+')' : ''));
	$('#sum-address').html(claimInfo.address)
	$('#sum-address2').html(claimInfo.address2)
	$('#sum-location').html('แขวง/ตำบล'+claimInfo.subDistrict+' '+'เขต/อำเภอ'+claimInfo.district+' '+'จังหวัด'+claimInfo.province+' '+claimInfo.zipcode)
	if ( claimInfo.tel.length == 10 ) {
		var mobile = claimInfo.tel;
		$('#sum-tel').html('เบอร์โทร '+ mobile.substr(0, 3)+'-'+mobile.substr(3, 4)+'-'+mobile.substr(7, 3) );
	}else{$('#sum-tel').html('เบอร์โทร '+claimInfo.tel)}
	$('#sum-email').html(typeof claimInfo.email != 'undefined' && claimInfo.email != ''? 'อีเมล '+claimInfo.email : '')
	$('#sum-line').html(typeof claimInfo.customerLineId != 'undefined' && claimInfo.customerLineId != ''? 'Line ID: '+claimInfo.customerLineId : '')

	var modal = $('#dv-claim_info');
	var file = convertDataToArray('|', claimInfo.images);
	if (typeof file != 'undefined') {
		for(i=0; i<=3; i++) {
			modal.find('.img'+i+' img').attr('src', 'https://res.cloudinary.com/powerdd/image/upload/v1438076463/0875665456-1.jpg');
			modal.find('.img'+i+' a').attr('href', '#');
			if (typeof file[i] != 'undefined' && file[i] != '') {
				modal.find('.img'+i).show().find('img').attr('src', file[i]);
				modal.find('.img'+i).show().find('a').attr('href', file[i]);
			}
			else {
				modal.find('.img'+i).hide();
			}
		}
	}

	else {
		for(i=0; i<=3; i++) modal.find('.img'+i).hide();
	}

	$('#alert-load').hide();
	$('#dv-claim_info').show();
	chkClaim = false;
};

function convertDataToArray(sign, data) {
	if (data == null) {
		var arr = [];
		return arr;
	}
	else if ( data.indexOf(sign) != -1) {
		var sp = data.split(sign);
		for(i=0; i<sp.length; i++) sp[i] = sp[i].trim();
		return sp;
	}
	else {
		var arr = [data];
		return arr;
	}
};
