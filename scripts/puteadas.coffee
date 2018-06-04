# Description
#   Aleatoriamente putea alguien para ti
#
# Commands:
#   hubot putea (a|al) <alguien> - Putea al usaurio señalado
#
# Author:
#   lgaticaq

puteadas = [
  "eres tonto o le tiras piedras a los aviones",
  "eres más infantil que una pelea entre Pokemones y Power Rangers",
  "tienes menos futuro que un enfermo de parkinson tocando pandero",
  "eres tan feo que cuando naciste pintaron los cristales de la incubadora",
  "si los tontos tuvieran hélice tu serías un helicóptero",
  "que mala suerte que de 5 millones de espermatozoides salieras tú...",
  "cómprate un desierto y bárrelo",
  # "dime cómo te llamas para poder poner nombre a mis pesadillas",
  "parece que tus viejos no le pusieron mucho empeño pa' hacerte",
  "tu rostro es como el invierno, lleno de escarcha, tormentas y nubosidad",
  # "eres un lame pies",
  "eres más feo que la azafata del Caleuche",
  "eres más falso que billete de 1500",
  "eres más ordinario que linchaco de longaniza",
  "eres más inútil que bolsillo de pijama",
  "y a vo mono quien te metio ficha",
  "vira del canal o te voy a dar una plr",
  "te gusta la pistola de quaker",
  "teni el #bombolleno",
  "hijoelapeeeeeeeeeeerrra",
  "vo soy más pajero que el lucho",
  "http://i.giphy.com/8mLnkS2xcqtdm.gif",
  "http://i.giphy.com/Ebu8aRL2qxMzK.gif",
  "http://i.giphy.com/bOifD9wkVMRxu.gif",
  "http://i.giphy.com/136aVZjeOLn9IY.gif",
  "http://i.giphy.com/6hPJqqNNl7OoM.gif",
  "http://i.giphy.com/tcVdmzYJFoegU.gif",
  "http://45.media.tumblr.com/f12272f6310c3deb77b71f998f9cd163/tumblr_o20wx97uhe1r868elo1_400.gif "
]

puteadas_romina = [
  "Tomai más que el negro piñera"
]

module.exports = (robot) ->
  robot.respond /putea (a|al) (.*)/i, (msg) ->
    puteada = msg.random puteadas
    puteada_r = msg.random puteadas_romina
    console.log(msg.message.user.name)
    if msg.message.user.name == 'romina monsalve'
      msg.send "oe romina #{puteada_r}"
    else if msg.message.user.name == 'lucho'
      msg.send "oe lucho #{puteada}"
    else
      msg.send "oe #{msg.match[2]} #{puteada}"