var parse = require('./lexerjs');
var lexerResults = parse.lexerResults;

(function (exports) {
  const reglitas = [
    {
      name: "extender",
      tester: function (tested) {
        if (tested == "ext") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "implementar",
      tester: function (tested) {
        if (tested == "imple") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "clase",
      tester: function (tested) {
        if (tested == "cls") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "variable",
      tester: function (tested) {
        if (tested == "v" || tested == "va") {
          return lexerResults.start;
        } else if (tested == "var") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "importar",
      tester: function (tested) {
        if (tested == "util") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "identificador",
      tester: function (tested) {
        var regResult = tested.match(/[a-z1-9]*/);
        if (regResult && regResult[0] == tested) {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "operador",
      tester: function (tested) {
        if (tested == "/" || tested == "*" || tested == "-" || tested == "+" || tested == "||" || tested == "&&") {
          return lexerResults.exact;
        } else if (tested == "!=" || tested == "==" || tested == "=" || tested == "%" || tested == "^") {
          return lexerResults.exact;
        } else if (tested == "<" || tested == "<=" || tested == "=>" || tested == ">") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "tipo de dato",
      tester: function (tested) {
        if (tested == "ent" || tested == "text" || tested == "carac" || tested == "decim") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "ciclo",
      tester: function (tested) {
        if (tested == "for" || tested == "foreach" || tested == "while") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "accion",
      tester: function (tested) {
        if (tested == "regre" || tested == "stop" || tested == "seg") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "imprimir",
      tester: function (tested) {
        if (tested == "impr") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "final",
      tester: function (tested) {
        if (tested == ";") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "espacio",
      tester: function (tested) {
        if (tested == " ") {
          return lexerResults.skip;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "espacio_blanco",
      tester: function (tested) {
        var regResult = tested.match(/\s+/);
        if (regResult && regResult[0] == tested) {
          return lexerResults.skip;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "abrir_array",
      tester: function (tested) {
        if (tested == "[") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "condicion",
      tester: function (tested) {
        if (tested == "if" || tested == "switch") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "cerrar_array",
      tester: function (tested) {
        if (tested == "]") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "llave_abrir",
      tester: function (tested) {
        if (tested == "{") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "abre_parentesis",
      tester: function (tested) {
        if (tested == "(") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "cierra_parentesis",
      tester: function (tested) {
        if (tested == ")") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "llave_cerrar",
      tester: function (tested) {
        if (tested == "}") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "dos_puntos",
      tester: function (tested) {
        if (tested == ":") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "concatenar",
      tester: function (tested) {
        if (tested == ",") {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "numero",
      tester: function (tested) {
        var regResult = tested.match(
          /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/
        );
        if (regResult && regResult[0] == tested) {
          return lexerResults.exact;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "activo_o_no",
      tester: function (tested) {
        if ("false" == tested || "true" == tested) {
          return lexerResults.exact;
        } else if ("false".startsWith(tested) || "true".startsWith(tested)) {
          return lexerResults.start;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "nulo",
      tester: function (tested) {
        if ("null" == tested) {
          return lexerResults.exact;
        } else if ("null".startsWith(tested)) {
          return lexerResults.start;
        } else {
          return lexerResults.none;
        }
      }
    },
    {
      name: "cadena",
      tester: function (tested) {
        var regexp = /"/g;
        var match,
          matches = [];
        while ((match = regexp.exec(tested)) != null) {
          matches.push(match.index);
        }

        if (matches.length == 1 && matches[0] == 0) {
          return lexerResults.start;
        }
        if (
          matches.length == 2 &&
          matches[0] == 0 &&
          matches[1] == tested.length - 1
        ) {
          return lexerResults.exact;
        }

        return lexerResults.none;
      }
    }
  ];

  exports.reglitas = reglitas;
})(typeof exports === "object" ? exports : this);