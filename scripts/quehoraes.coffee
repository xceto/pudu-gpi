# Description:
#   Returns local time in given city.
#
# Dependencies:
#   worldweatheronline.com API
#
# Configuration:
#   HUBOT_WWO_API_KEY
#   HUBOT_WWO_API_URL
#
# Commands:
#   @pudu hora en <ciudad>
#
# Notes
#   Request an WWO API KEY in http://www.worldweatheronline.com/
#   The url is likely to be something like http://api.worldweatheronline.com/free/v2/tz.ashx
#
#   City parameter can be:
#     city
#     city, country
#     ip address
#     latitude and longitude (in decimal)
#
# Author:
#   gtoroap
#

paises = ["chile","mexico","argentina","peru","colombia","venezuela","uruguay"]
moment = require('moment')
process.env.HUBOT_WWO_API_KEY = '9ca1f6cb851ce2d8c004a425e5456'
process.env.HUBOT_WWO_API_URL = 'http://api.worldweatheronline.com/free/v2/tz.ashx'

module.exports = (robot) ->
	robot.respond /hora en (.*)/i, (msg) ->
		unless process.env.HUBOT_WWO_API_KEY
			msg.send 'Please, set HUBOT_WWO_API_KEY environment variable'
			return
		unless process.env.HUBOT_WWO_API_URL
			msg.send 'Please, set HUBOT_WWO_API_URL environment variable'
			return
		msg.http(process.env.HUBOT_WWO_API_URL)
			.query({
				q: msg.match[1]
				key: process.env.HUBOT_WWO_API_KEY
				format: 'json'
			})
			.get() (err, res, body) ->
				try
					result = JSON.parse(body)['data']
					city = result['request'][0]['query']
					currentTime = result['time_zone'][0]['localtime'].slice 11
					msg.send "Son las #{currentTime} en #{city} :clock1030:"
				catch error
					msg.send "No entendi esa ciudad, intenta con otra si quieres. Si no, no me importa."
	
	# Hora paises GPI
	robot.respond /hora gpi/i, (msg) ->
		unless process.env.HUBOT_WWO_API_KEY
			msg.send 'Please, set HUBOT_WWO_API_KEY environment variable'
			return
		unless process.env.HUBOT_WWO_API_URL
			msg.send 'Please, set HUBOT_WWO_API_URL environment variable'
			return

		# Hora servidores
		msg.send "Son las " + moment().utc().format('HH:mm') + " en los servidores :gpi:" 

		# Recorremos el array de paises y consultamos
		for pais in paises
			msg.http(process.env.HUBOT_WWO_API_URL)
				.query({
					q: pais
					key: process.env.HUBOT_WWO_API_KEY
					format: 'json'
				})
				.get() (err, res, body) ->

					try
						result = JSON.parse(body)['data']
						city = result['request'][0]['query']
						# Bandera paises
						if city.match /chile/i
							bandera = ":flag-cl:"
						if city.match /mexico/i
							bandera = ":flag-mx:"
						if city.match /argentina/i
							bandera = ":flag-ar:"
						if city.match /peru/i
							bandera = ":flag-pe:"
						if city.match /colombia/i
							bandera = ":flag-co:"
						if city.match /venezuela/i
							bandera = ":flag-ve:"
						if city.match /uruguay/i
							bandera = ":flag-uy:"
						currentTime = result['time_zone'][0]['localtime'].slice 11
						msg.send "Son las #{currentTime} en #{city} #{bandera}"
					catch error
						msg.send "No entendi esa ciudad, intenta con otra si quieres. Si no, no me importa."
