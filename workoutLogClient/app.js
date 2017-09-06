$(document).ready(function() {
	let WorkoutLog = (function($, undefined) {
		let API_BASE = "http://localhost:3000/api/"
		let userDefinitions= []

		let setAuthHeader = function(sessionToken) {
			window.localStorage.setItem("sessionToken", sessionToken)
			//set the auth header
			//this can be done on individual calls
			//here we showcase ajaxsetup as a global tool
			$.ajaxSetup({
				"headers": {
					"Authorization": sessionToken
				}
			})
		}

		// public
		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		}
	})(jQuery)

	$(".nav-tabs a[data-toggle=tab]").on("click", function(e) {
		let token = window.localStorage.getItem('sessionToken')
		if ($(this).hasClass("disabled") && !token) {
			e.preventDefault()
			return false
		}
	})
	//bind ab change events
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		let target = $(e.target).attr("href")
		if (target === log) {
			WorkoutLog.log.setDefinitions()
		}

		if (target === history) {
			WorkoutLog.log.setHistory()
		}
	})
	//bind enter key
	$(document).on('keypress', function(e) {
		if (e.which === 13) {
			if ($(signup-modal).is(':visible')) {
				$(signup).trigger(click)
			}
			if ($(login-modal).is(':visible')) {
				$(login).trigger('click')
			}
		}
	})
	//set header
	let token = window.localStorage.getItem("sessionToken")
	if (token) {
		WorkoutLog.setAuthHeader(token)
	}

	//expose this to the other workoutlog modules 
	window.WorkoutLog = WorkoutLog
})

// this file gets the info from api/test. it works because onready it runs let test and gets