$(document).ready(function() {
	let password = null;
	let ans = null;
	let username = null;
	let afterPositive = false;
	
	$("#basic-addon2").click(function(e){
		var base_url = "/forgetpw/";
		var pathArray = window.location.pathname.split('/');
		
		if(pathArray.length > 2){
			base_url = "/"+pathArray[1]+base_url
		}
		var email = $("input#email").val().trim();
		$.ajax({  
			url:base_url + email,  
			method:"GET", 
			dataType: 'json', 
			headers : {
				'Content-Type' : 'application/json'
			},
			success:function(data){
				$('#emailsearch').css({'display': 'none'});
				$('#afterFindEmail').css({'display': 'block'});
				$('#smsg').html(data.securityQuestion);
				password = data.password;
				ans = data.securityAns.toLowerCase();
				username = data.userName;
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#emailsearch').css({'display': 'none'});
				$('#afterFindFail').css({'display': 'block'});
				$('#fail').html("Dosn't find this email");
				console.log(jqXHR);
			}
		});
	});
	
	$(".chkans").click(function(e){
		var answer = $("input#ans").val().trim().toLowerCase();
		
		if(answer === ans){
			$('#smsg').html("your user name is = "+username+" and password is = "+password);
			$('#afterFindFail').css({'display': 'none'});
			afterPositive = true;
		}else{
			if(afterPositive){$('#afterFindEmail').css({'display': 'none'});}
			$('#afterFindFail').css({'display': 'block'});
			$('#fail').html("Wrong answer");
		}
		
	});
	
	$(".again").click(function(e){
		$('#emailsearch').css({'display': 'block'});
		$('#afterFindEmail').css({'display': 'none'});
		$('#afterFindFail').css({'display': 'none'});
	});
});