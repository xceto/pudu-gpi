# Description:
#   Tells the weather
#
# Configuration:
#   HUBOT_WEATHER_API_URL - Optional openweathermap.org API endpoint to use
#   HUBOT_WEATHER_UNITS - Temperature units to use. 'metric' or 'imperial'
#
# Commands:
#   weather in <location> - Tells about the weather in given location
#
# Author:
#   spajus

process.env.HUBOT_WEATHER_API_URL ||= 
  'http://api.openweathermap.org/data/2.5/weather'
process.env.HUBOT_WEATHER_UNITS ||= 'metric'

module.exports = (robot) ->
  robot.hear /temperatura en (\w+)/i, (msg) ->
    city = msg.match[1]
    query = { units: process.env.HUBOT_WEATHER_UNITS, q: city, lang: 'es', appid: '44db6a862fba0b067b1930da0d769e98' }
    url = process.env.HUBOT_WEATHER_API_URL
    # console.log(msg.robot.http(url).query(query).get())
    msg.robot.http(url).query(query).get() (err, res, body) ->
      data = JSON.parse(body)
      # console.log(data)
      weather = [ "#{Math.round(data.main.temp)} grados" ]
      for w in data.weather
        weather.push w.description
      msg.reply "#{weather.join(', ')} en #{data.name}, #{data.sys.country}"