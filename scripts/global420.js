// Description:
//  Global 420
//
// Dependencies:
//  None
//
// Configuration:
//   None
//
// Commands:
//   @pudu 420
//
// Author:
//   Camilo Castro - clsource © 2016
//
// Based on https://github.com/thedod/global420

var global420 = require('./helpers/global420');
global420 = global420.global420;

var random = require('./helpers/random');

var jokes = [
  "¡Sacate Uno Po!",
  "Sólo de uso medicinal",
  "Las semillas las debes coleccionar nomas pueh",
  "I'm gonna smoke'a de ganja until I go blind",
  "¡Saca, Prende y Sorprende!",
  "Dicen que en la Florida hay mano herman@",
  "¿Quién tiene quequitos mágicos?"
];

module.exports = function(pudu) {

  pudu.respond(/420/i, function(res) {

    var info = global420.next420();
    var message = "";
    var places = "";
    var place = null;

    if (info.minutes === 0) {

      message ="¡Wena! Son las 4:20 PM en:";

    } else if (info.minutes === 1) {

      message = "¡Preparate!, sólo 1 minuto más para las 4:20 PM en:";

    } else {

      message = "Tranquilein solamente faltan " + info.minutes + " Minutos para las 4:20 PM en:";

    }

    for(var i = 0; i < info.places.length; i++) {
      place = info.places[i];
      places = places + place + "\n";
    }

    var joke = random.item(jokes);

    message = message + "\n\n" + places + "\n\n" + joke;

    res.send(message);

  });
};
