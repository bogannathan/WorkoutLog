$(function(){
	$.extend(WorkoutLog, { //.extend pulls the contents of app.js's WorkoutLog variable
		//signup method
		signup: function(){
			//username and password variables
			let username = $(su_username).val()
			let password = $(su_password).val()
		//user object
			let user = {user: 
				{
					username: username,
					password: password
				}
			}
			//signup post
			let signup = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType:"application/json"
			})
			//signup done/fail
			//.done() Promise
            //Runs asynchronously
			signup
			.done(function(data) {
				if (data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken)
					console.log("you made it")
					console.log(data.sessionToken)
				}

				$(signupModal).modal("hide")
				$('.disabled').removeClass("disabled")
				$(loginout).text("Logout")
			})
			.fail(function() {
				$(su_error).text("There was an issue with sign up").show()
			})
			.always(function(){
				alert("hey play this cool game while you sign up")
			})
		}

		//login method

		//loginout method
	})
	//bind events
	$(signup).on('click', WorkoutLog.signup)
})