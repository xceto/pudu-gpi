// Description:
//   convierte un string en FriendlyText
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   @pudu amigable <texto> (max. 140 caracteres porq @gmq es un hacker)
//
// Author:
//   @jorgeepunan

var characters = [
  "а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о",
  "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ь", "ю", "я",
  "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О",
  "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ь", "Ю", "Я",
  "Ї", "ї", "Є", "є", "Ы", "ы", "Ё", "ё",
  "ı", "İ", "ğ", "Ğ", "ü", "Ü", "ş", "Ş", "ö", "Ö", "ç", "Ç",
  "Á", "á", "Â", "â", "Ã", "ã", "À", "à", "Ç", "ç", "É", "é", "È", "è", "Ê", "ê", "Í",
  "í", "Ó", "ó", "Ô", "ô", "Õ", "õ", "Ú", "ú", "Ñ", "ñ", "ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż", "Ą", "Ć", "Ę", "Ł", "Ń", "Ó", "Ś", "Ź", "Ż"
];
var latin = [
  "a", "b", "v", "g", "d", "e", "zh", "z", "i", "y", "k", "l", "m", "n", "o",
  "p", "r", "s", "t", "u", "f", "h", "ts", "ch", "sh", "sht", "a", "y", "yu", "ya",
  "A", "B", "B", "G", "D", "E", "Zh", "Z", "I", "Y", "K", "L", "M", "N", "O",
  "P", "R", "S", "T", "U", "F", "H", "Ts", "Ch", "Sh", "Sht", "A", "Y", "Yu", "Ya",
  "I", "i", "Ye", "ye", "I", "i", "Yo", "yo",
  "i", "I", "g", "G", "u", "U", "s", "S", "o", "O", "c", "C",
  "A", "a", "A", "a", "A", "a", "A", "a", "C", "c", "E", "e", "E", "e", "E", "e", "I",
  "i", "O", "o", "O", "o", "O", "o", "U", "u", "N", "N", "a", "c", "e", "l", "n", "o", "s", "z", "z", "A", "C", "E", "L", "N", "O", "S", "Z", "Z"
];

var string = '';

function convert (text) {
  string = str_replace(characters, latin, text);
  return string;
}

function str_replace(search, replace, subject, count) {
  var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
      f = [].concat(search),
      r = [].concat(replace),
      s = subject,
      ra = r instanceof Array, sa = s instanceof Array;
  s = [].concat(s);
  if (count) {
    this.window[count] = 0;
  }
  for (i=0, sl=s.length; i < sl; i++) {
    if (s[i] === '') {
      continue;
    }
    for (j=0, fl=f.length; j < fl; j++) {
      temp = s[i]+'';
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
      s[i] = (temp).split(f[j]).join(repl);
      if (count && s[i] !== temp) {
        this.window[count] += (temp.length-s[i].length)/f[j].length;}
    }
  }
  return sa ? s : s[0];
}

function FriendlyText(url) {
  texto =  convert(url);
  return  texto.toLowerCase().replace(/^\s+|\s+$/g, "").replace(/[_|\s]+/g, "-").replace(/[^a-z\u0400-\u04FF0-9-]+/g, "").replace(/[-]+/g, "-").replace(/^-+|-+$/g, "").replace(/[-]+/g, '-');
};

module.exports = function(robot) {

  robot.respond(/amigable (.*)/i, function(res) {
    var texto = res.match[1],
        largo = 140,
        cortado = texto.substring(0, largo);
        resultado = FriendlyText(cortado);
    msg = resultado;

    res.send(msg);
  });
};
