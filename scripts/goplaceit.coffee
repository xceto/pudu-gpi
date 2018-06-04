module.exports = (robot) ->
	# the expected value of :room is going to vary by adapter, it might be a numeric id, name, token, or some other value
	robot.router.post '/goplaceitmsj/:room', (req, res) ->
		room   = req.params.room
		data   = if req.body.payload? then JSON.parse req.body.payload else req.body
		message = data.message

		robot.messageRoom room, message

		res.send 'OK'

	robot.router.post '/directmessage', (req, res) ->
		room   = req.params.room
		data   = if req.body.payload? then JSON.parse req.body.payload else req.body
		message = data.message

		users = data.users
		console.log(users)

		for user in users
			do ->
				robot.messageRoom user, message

		res.send 'OK'
