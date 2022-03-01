var fs = require('fs');
var parser = require('./lexerjs');
var reglas = require('./reglas');


fs.readFile('./text_prueba.txt', (err, data) => {
  if (err) throw err;
  var result = parser.lexer(data.toString(), reglas.reglitas);
  console.log(result);
});