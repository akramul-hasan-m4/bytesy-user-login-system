$(document).ready(function() {
	
	/* save new user */
	$(".btnRegister").click(function(e){
		$('.msg').css({'display': 'none'});
		var form_action = "/";
		var pathArray = window.location.pathname.split('/');
		
		if(pathArray.length > 2){
			form_action = form_action+pathArray[1]+"/"
		}
		
		var firstName = $("#home").find("input[name='firstName']").val() == undefined ? '' : $("#home").find("input[name='firstName']").val().trim();
		var lastName = $("#home").find("input[name='lastName']").val() == undefined ? '' : $("#home").find("input[name='lastName']").val().trim();
		var userName = $("#home").find("input[name='userName']").val() == undefined ? '' : $("#home").find("input[name='userName']").val().trim();
		var email = $("#home").find("input[name='email']").val() == undefined ? '' : $("#home").find("input[name='email']").val().trim();
		var password = $("#home").find("input[name='password']").val() == undefined ? '' : $("#home").find("input[name='password']").val().trim();
		var currentAddress = $("#home").find("input[name='currentAddress']").val() == undefined ? '' : $("#home").find("input[name='currentAddress']").val().trim();
		var permanentAddress = $("#home").find("input[name='permanentAddress']").val() == undefined ? '' : $("#home").find("input[name='permanentAddress']").val().trim();
		var securityQuestion = $("#home").find("#securityQuestion").val() == undefined ? '' : $("#home").find("#securityQuestion").val().trim();
		var securityAns = $("#home").find("input[name='securityAns']").val() == undefined ? '' : $("#home").find("input[name='securityAns']").val().trim();
		
		var dataObj = {
			firstName:firstName,
			lastName:lastName,
			userName:userName,
			email:email,
			password:password,
			currentAddress:currentAddress,
			permanentAddress:permanentAddress,
			securityQuestion:securityQuestion,
			securityAns:securityAns
		};
		
		var stringfyData = JSON.stringify(dataObj);
		if(formValidation()){
			$.ajax({  
				url:form_action,  
				method:"POST", 
				dataSrc: "", 
				headers : {
					'Content-Type' : 'application/json'
				},
				data: stringfyData,
				success:function(data){
					alertify.success('Regestration is successfull');
					resetForm();
				},
				error: function(jqXHR, textStatus, errorThrown)
				{
					console.log(jqXHR);
					alertify.error(jqXHR.responseJSON.error)
				}
			}); 
		}
	});
	
	//validation
	$('#confirm_password').on('blur', function () {
		var msg = $("#message");
		if ($('#password').val() !== $('#confirm_password').val()) {
			msg.html('Not Matching').css({'display': 'block', 'color': 'red', 'opacity' : 100});
			msg.fadeTo(5000, 0).slideUp(500, function() {
				msg.slideUp();
			});
		}
	});
	
	//show password strength
	$('#password').keyup(function() {
		$('#pwd_strength').html(checkStrength($('#password').val())).css({'display' : 'block', 'opacity' : 100});
	});
	
	//hide strength message
	$('#password').on('blur', function () {
		$('#pwd_strength').fadeTo(5000, 0).slideUp(500, function() {
			$('#pwd_strength').hide();
		});
	});
	
	function checkStrength(password) {
		var meter = $('#pwd_strength');
		var strength = 0
		if (password.length < 6) {
			meter.removeClass()
			meter.addClass('short')
			return 'Too short'
		}
		if (password.length > 7) strength += 1
			// If password contains both lower and uppercase characters, increase strength value.
		if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) { strength += 1 }
			// If it has numbers and characters, increase strength value.
		if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) { strength += 1 }
			// If it has one special character, increase strength value.
		if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) { strength += 1 }
			// If it has two special characters, increase strength value.
		if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) { strength += 1 }
			// Calculated strength value, we can return messages
		if (strength < 2) {
			meter.removeClass()
			meter.addClass('weak')
			return 'Weak'
		} else if (strength == 2) {
			meter.removeClass()
			meter.addClass('good')
			return 'Good'
		} else {
			meter.removeClass()
			meter.addClass('strong')
			return 'Strong'
		}
	}
	
	function formValidation(){
		var firstName = $("#home").find("input[name='firstName']").val();
		var userName = $("#home").find("input[name='userName']").val();
		var email = $("#home").find("input[name='email']").val();
		var password = $("#home").find("input[name='password']").val();
		var currentAddress = $("#home").find("input[name='currentAddress']").val();
		var securityQuestion = $("#home").find("#securityQuestion").val();
		var securityAns = $("#home").find("input[name='securityAns']").val();
		
		if(!firstName || firstName.length < 5 || firstName.trim().length == 0){
			$('.firstNamemsg').css({'display': 'block', 'color': 'red'});
			$('#firstName').focus();
			return false;
		}
		else if(!userName || userName.length < 5 || userName.trim().length == 0){
			$('.userNamemsg').css({'display': 'block', 'color': 'red'});
			$('#userName').focus();
			return false;
		}
		else if(!validateEmail(email)){
			$('.emailemsg').css({'display': 'block', 'color': 'red'});
			console.log('yes====')
			$('#email').focus();
			return false;
		}
		else if(!password || password.length < 8 || password.trim().length == 0){
			$('#pwd_strength').html('Password should be minimum 8 charecter').css({'display': 'block', 'color': 'red', 'opacity' : 100});
			$('#password').focus();
			return false;
		}
		else if(password != $('#confirm_password').val()){
			$("#message").html('Password Doesnt match').css({'display': 'block', 'color': 'red', 'opacity' : 100});
			$('#confirm_password').focus();
			return false;
		}
		else if(!currentAddress || currentAddress.trim().length == 0){
			$('.currentAddressmsg').css({'display': 'block', 'color': 'red'});
			$('#currentAddress').focus();
			return false;
		}
		
		else if(!securityQuestion){
			$('.securityQuestionmsg').css({'display': 'block', 'color': 'red'});
			$('#securityQuestion').focus();
			return false;
		}
		else if(!securityAns || securityAns.trim().length == 0){
			$('.securityAnsnmsg').css({'display': 'block', 'color': 'red'});
			$('#securityAns').focus();
			return false;
		}
		else {
			return true;
		}
	}
	
	function resetForm(){
		$('#userForm').closest('form').find("input[type=text], input[type=password], select").val("");
		$('.msg').css({'display': 'none'});
	}
	
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
});