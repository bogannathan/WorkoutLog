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
					lis += "<li class='list-group-item'>" + 
					history[i].def + "-" + 
					history[i].result + " " +
					"<div class='pull-right'>" +
						"<button id='" + history[i].id + "' class='updated'><strong>U</strong></button>" +
						"<button id='" + history[i].id + "' class='remove'><string>X</strong></button>" +
					"</div></li>"
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
			delete: function(){
				let thisLog = {
					//"this" is the button on the li
					//.attr("id") targets teh value of the id attribute of the button
					id: $(this).attr("id")
				}
				let deleteData = {log: thisLog}
				let deleteLog = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				})
				//removes list iem. references button then grabvs cloesest li
				$(this).closest('li').remove()

				for (let i = 0; i <WorkoutLog.log.workouts.length; i++) {
					if(WorkoutLog.log.workouts[i].id = thisLog.id) {
						WorkoutLog.log.workouts.splice(i, 1)
					}
				}
				deleteLog.fail(function() {
					console.log('nope, you didn\'t delete it, an error occurred')
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
	$(historyList).delegate('.remove', 'click', WorkoutLog.log.delete)

	if(window.localStorage.getItem('sessionToken')) {
		WorkoutLog.log.fetchAll()
	}
})