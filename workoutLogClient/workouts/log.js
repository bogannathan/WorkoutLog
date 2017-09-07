$(function() {
		console.log(WorkoutLog.definition)
	$.extend(WorkoutLog, {
		log: {
			workouts: [],
			setDefinitions: function() {
				let defs = WorkoutLog.definition.userDefinitions
				let len = defs.length
				let opts
				for (let i = 0; i < len; i++) {
					opts += "<option value='" + defs[i].id +"'>" + defs[i].description + "</option>"
				}
				$(logDefinition).children().remove()
				$(logDefinition).append(opts)
			},
			setHistory: function() {
				let history = WorkoutLog.log.workouts
				let len = history.length
				let lis = ""
				for (let i = 0; i < len; i++) {
					lis += "<li class='list-group-item'>" + history[i].def + "-" + history[i].result + "</li>"
				}
				$(historyList).children().remove()
				$(historyList).append(lis)
			},
			create: function () {
				let itsLog = {
					desc: $(logDescription).val(),
					result: $(logResult).val(),
					def: $('#logDefinition option:selected').text()
				}
				let postData = {log: itsLog}
				console.log(postData)
				let logger = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(postData),
					contentType: "application/json"
				})
				logger.done(function(data) {
					WorkoutLog.log.workouts.push(data)
					$(logDescription).val("")
					$(logResult).val("")
					$('a[href="#history"]').tab("show")
				})
			},
			fetchAll: function() {
				let fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log",
					headers: {
						"authorization": 
						window.localStorage.getItem("sessionToken")
					}
				})
				fetchDefs
					.done(function(data) {
						WorkoutLog.log.workouts = data 
					})
					.fail(function(err) {
						console.log(err)
					})
			}
		}
	})
	$(logSave).on('click', WorkoutLog.log.create)

	if(window.localStorage.getItem('sessionToken')) {
		WorkoutLog.log.fetchAll()
	}
})