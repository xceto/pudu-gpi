# Description:
#   Search stack overflow and provide links to the first 5 questions
#
# Dependencies:
#   none
#
# Configuration:
#   None
#
# Commands:
#   hubot sosearch [me] <query> - Search for the query
#   hubot sosearch [me] <query> -tags <tag list separated by ,> - Search for the query limit to given tags
#
# Author:
#   carsonmcdonald
#   drdamour


zlib = require('zlib')

# API keys are public for Stackapps
hubot_stackapps_apikey = 'zprHb6)163sIQewYlxUQgw(('

module.exports = (robot) ->
  robot.respond /sosearch( me)? (.*)/i, (msg) ->
    re = RegExp("(.*) -tags (.*)", "i")
    opts = msg.match[2].match(re)

    if opts?
      soSearch msg, opts[1], opts[2].split(',')
    else
      soSearch msg, msg.match[2], []

soSearch = (msg, search, tags) ->

  data = ""
  msg.http("https://api.stackexchange.com/2.2/search")
    .query
      site: "stackoverflow"
      intitle: search
      key: hubot_stackapps_apikey
      tagged: tags.join(';')
      filter: "!9YdnSQVoS" # add total to response,
      sort: "relevance"
    .get( (err, req)->
      req.addListener "response", (res)->
        output = res

        #pattern stolen from http://stackoverflow.com/questions/10207762/how-to-use-request-or-http-module-to-read-gzip-page-into-a-string
        if res.headers['content-encoding'] is 'gzip'
          output = zlib.createGunzip()
          res.pipe(output)

        output.on 'data', (d)->
          data += d.toString('utf-8')

        output.on 'end', ()->
          parsedData = JSON.parse(data)
          if parsedData.error
            msg.send "Error searching stack overflow: #{parsedData.error.message}"
            return

          if parsedData.total > 0
            qs = for question in parsedData.items[0..5]
              "http://www.stackoverflow.com/questions/#{question.question_id} - #{question.title}"
            if parsedData.total-5 > 0
              qs.push "#{parsedData.total-5} more..."
            for ans in qs
              msg.send ans
          else
            msg.reply "No questions found matching that search."
    )()


