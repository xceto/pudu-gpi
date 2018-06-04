memeGenerator = require "hubot-meme/src/lib/memecaptain.coffee"

module.exports = (robot) ->

  robot.hear /(no se si .+) (o .+)/i, id: 'meme.not-sure-fry', (msg) ->
    memeGenerator msg, 'CsNF8w', msg.match[1], msg.match[2]

  robot.hear /(no estoy seguro si .+) (o .+)/i, id: 'meme.not-sure-fry', (msg) ->
    memeGenerator msg, 'CsNF8w', msg.match[1], msg.match[2]

  robot.hear /bien ctm (.+)/i, id: 'meme.success-kid', (msg) ->
    memeGenerator msg, 'AbNPRQ', 'bien ctm', msg.match[1]  

  robot.hear /pudu \?{3}/i, id: 'meme.negro-confused', (msg) ->
    memeGenerator msg, 'YYUfJg', '', ''

  robot.hear /pudu (.+)\?{3}/i, id: 'meme.negro-confused', (msg) ->
    memeGenerator msg, 'YYUfJg', '', msg.match[1] + '?'