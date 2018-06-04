// Description:
//  entrega al azar el nombre de un super-heroe ficticio
//
// Dependencies:
//  superheroes
//
// Configuration:
//   None
//
// Commands:
//   superheroe
//
// Author:
//   jorgeepunan

var superheroes = require("superheroes"); 

module.exports = function(robot) {

  robot.respond(/superheroe/i, function(res) {
    res.send( "Súper-Héroe: " + superheroes.random() );
  });

};