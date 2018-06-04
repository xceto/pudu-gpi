// Description:
//   Get a torrent link from torrentproject.se
//
//  Dependencies:
//    cheerio
//
// Commands:
//   hubot torrent <query>
//
// Author:
//  jorgeepunan

var cheerio = require('cheerio');

module.exports = function(robot) {
  robot.respond(/torrent (.*)/i, function(msg) {

    msg.send('Esperando respuesta de Torrent Project... :clock930:');

    var busqueda = msg.match[1];
    var url = 'https://torrentproject.se/?t=' + busqueda;

    msg.robot.http(url).get()(function(err, res, body) {

      var $ = cheerio.load(body);
      var resultados = [];

      $('#similarfiles > div:not(.gac_bb)').each(function() {
        var title = $(this).find('a').text();
        var link = $(this).find('a').attr('href');

        resultados.push( title + ' | ' + link );
      });

      if(resultados.length > 0) {
        var limiteResultados = (resultados.length > 4) ? 3 : resultados.length;
        var plural = resultados.length > 1 ? ['n','s'] : ['',''];
        msg.send('Se ha'+plural[0]+' encontrado '+ resultados.length + ' resultado'+plural[1]);
        for (var i=0; i < limiteResultados; i++) {
          var conteo = i + 1;
          msg.send(conteo + ': ' + resultados[i]);
        }
        if(resultados.length > limiteResultados) {
          msg.send('Otros resultados en: '+ url);
        }
      } else {
        msg.send('No se han encontrado resultados sobre '+ busqueda);
      }

    });

  });
};
