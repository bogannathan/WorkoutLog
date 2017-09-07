$(function() {
	$.extend(WorkoutLog, {
		definition: {
			userDefinitions: [],

			create: function() {
				let def = {
					desc: $(defDescription).val(),
					type: $(defLogtype)
				}
				let postData = { definition: def}
				let define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				})

				define.done(function(data) {
					WorkoutLog.definition.userDefinitions.push(data.definition)
				})
			},
			fetchAll: function() {
				let fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				})
				fetchDefs
				.done (function(data) {
					WorkoutLog.definition.userDefinitions = data
				})
				.fail(function(err) {
					console.log(err)
				})

			}
		}
	})

	// bindings
	$(defSave).on('click', WorkoutLog.definition.create)
	//fetch definition if we already are authenticated and refreshed
	if (window.localStorage.getItem('sessionToken')) {
		WorkoutLog.definition.fetchAll()
	}
})