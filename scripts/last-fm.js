// Description:
//   Ask to the last.fm API about and artist similar, top chart and top artist by tag
//   TODO
//   Add method to ask about and artist and request/concat bio and popular songs
//
// Dependencies:
//   hubot-slack
//
// Configuartion:
//   None
//
// Commands:
//   @pudu lastfm similar <artista => Alvaro Veliz>
//   @pudu lastfm como <categoria => pachanga>
//   @pudu lastfm top
//
// Author:
//   @javier

module.exports = function lastFm(robot) {
    var url = require('url');
    // last.fm API methods
    var lastMethods = {
        top: 'chart.getTopTracks',
        como: 'tag.getTopArtists',
        similar: 'artist.getSimilar',
        artistBio: 'artist.getInfo',
        artistTracks: 'artist.getTopTracks'
    } 
    // hubot respond func
    robot.respond(/(lastfm)\s(similar|como|top)\s?(.*)/i, function (msg) {
        var type = msg.match[2];
        var search = msg.match[3];
        // if similar || como they need a valid search
        if (['similar', 'como'].indexOf(type) >= 0 && search.length <= 0)
            return msg.send('Te falto el grupo o el estilo')
        // formating url request
        var lastUrl = url.format({
            protocol: 'http',
            hostname: 'ws.audioscrobbler.com/2.0/',
            query: {
                limit: '5',
                format: 'json',
                api_key: '2e2012c7f4762d0c257820da8eb59300',
                method: lastMethods[type]
            }
        }).concat(type === 'similar' ? '&artist=' : '&tag=').concat(search);
        // request to last.fm
        msg.http(lastUrl).get()(function (err, res, body) {
            var respond;
            var json = JSON.parse(body);
            if (type === 'similar' && json.error !== 6) {
                respond = 'Si te gusta *' + search + '* te podrian interesar: \n';
                json.similarartists.artist.forEach(function (elem) {
                    return respond += elem.name + '\n';
                });
            } else if (type === 'como' && json.topartists.artist.length > 0) {
                respond = 'Si te gusta la musica *' + search + '* te podrian interesar: \n';
                json.topartists.artist.forEach(function (elem) {
                    return respond += elem.name + '\n';
                });
            } else if (type === 'top' && json.tracks.track.length > 0) {
                respond = 'Lo más escuchado esta semana en last.fm es: \n';
                json.tracks.track.forEach(function (elem) {
                    return respond += '*' + elem.name + '* de ' + elem.artist.name + '\n';
                });
            } else {
                respond = 'Seguro que se llama *' + search + '* lo que buscas?';
            }
            return msg.send(respond);
        });
    });
};
