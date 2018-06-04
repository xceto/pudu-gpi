// Description:
//   [description]
//
// Dependencies:
//   hubot-slack
//
// Configuartion:
//   None
//
// Commands:
//   @pudu avisar <message> en <room1>, <roomN>
//   @pudu avisar help - Imprime una ayuda la ayuda del comando `avisar`
//   @pudu avisar -h - alias de `@pudu avisar help`
//   @pudu avisar ? - alias de `@pudu avisar help`
//
// Author:
//   @eseceve


module.exports = function avisar(robot) {
  var ROBOTNAME = robot.name;
  var VALIDHELPINPUTS = ['avisar help', 'avisar -h', 'avisar ?'];

  robot.respond(/avisar (help|\-h|\?)/i, help);
  robot.respond(/avisar ([\w\d\s\:]+) en (([#|@][\w-]+(,?)(\s*))+)/i, notify);


  /**
   *
   * @jsdoc function
   * @name avisar#notify
   * @description
   *
   * Write a message in each room
   *
   * @param  {Object} res Robot's response
   *
   */
  function notify(res) {
    var message = res.message.user.name + ' dice: ' + res.match[1];
    var rooms = getRooms(res.match[2], res.message.room);
    console.log(rooms);
    rooms.forEach(function onEachRoom(room) {
      robot.send({room: room}, message);
    });
  }


  /**
   *
   * @jsdoc function
   * @name avisar#getRooms
   * @description
   *
   * Get the rooms from the robot's message
   *
   * @param  {String} message User's input
   * @param  {String=} exclude room name to exclude
   * @return {Array} An array of room names
   *
   */
  function getRooms(message, exclude) {
    if (exclude) { exclude = exclude.toLowerCase(); }

    return message.match(/(#|@)?[\w-]+/ig)
      .map(function cleanRoomName(room) {
        return room.replace('@', '');
      })
      .filter(function filterExcludedRooms(room) {
        return exclude && room.toLowerCase() === exclude ? false : room;
      });
  }


  /**
   *
   * @jsdoc function
   * @name avisar#help
   * @description
   *
   * Write a help for `avisar` command
   *
   * @param  {Object} res Robot's response
   *
   */
  function help(res) {
    var reg = new RegExp('@?('+ROBOTNAME+')(:?)(\\s*)');
    var text = res.message.text.replace(reg, '');

    if (VALIDHELPINPUTS.indexOf(text) == -1) { return; }

    res.send('Esto es bien simple. Solo debes escribirme algo como ' +
      ' `avisar :mensaje en :rooms`\n' +
      '`:mensaje` Lo que quieres avisar\n' +
      '`:rooms` La lista de canales/usuarios donde quieres avisar. ' +
      'Debe ser algo como `#canal1, @user1, #canalN, @userN`');
  }
};
