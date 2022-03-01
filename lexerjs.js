(function (exports) {
  const lexerResults = {
    none: 0,
    start: 1,
    exact: 2,
    possible: 3,
    skip: 4
  };

  function lexer(str, rules) {
    validarEstructura(str);
    valdiarReglas(rules);
    return validarConTokens(str, rules);
  }

  function validarConTokens(str, rules) {
    let reglasIndexAnt = null, reglaIndex, type;
    const tokens = [];
    let char = 0;
    let line = 0;
    let col = char + 1;
    let testerStartIndex = 0;
    let tested = str[char];
    if (tested === "\n") {
      line = 1;
      col = 0;
    }

    while (char < str.length) {
      reglaIndex = null;
      let result;
      for (let j = testerStartIndex; j < rules.length; j++) {
        result = rules[j].tester(tested);
        if (result === lexerResults.none) {
          if (reglaIndex == null) {
            testerStartIndex++;
          }

        } else if (result === lexerResults.start) {
          reglaIndex = j;
          type = result;
        } else if (
          result === lexerResults.exact ||
          result === lexerResults.possible ||
          result === lexerResults.skip
        ) {
          reglaIndex = j;
          type = result;
          break;
        } else {
          throw error(
            `Resultado inesperado al testear: "${result}", from tester: ${rules[j].name} while testing "${tested}"`
          );
        }
      }

      if (reglaIndex !== null) {
        if (type !== lexerResults.skip && char === str.length - 1) {
          if (result !== lexerResults.start) {
            tokens.push({ token: rules[reglaIndex].name, lexema: tested });
          } else {
            throw error(errorMessage());
          }
        }
        reglasIndexAnt = reglaIndex;
        char++;
        tested += str[char];
        if (str[char] === "\n") {
          line++;
          col = 0;
        }
      } else {
        if (reglasIndexAnt === null || type === lexerResults.start) {
          throw error(errorMessage());
        }
        if (type !== lexerResults.skip) {
          tokens.push({
            token: rules[reglasIndexAnt].name,
            lexema: tested.slice(0, -1)
          });
        }
        testerStartIndex = 0;
        reglasIndexAnt = null;
        tested = str[char];
      }
    }
    return tokens;

    function errorMessage() {
      return (
        `No se reconoce token: ${tested}, char ${char + 1}, linea ${line}, col: ${col}`
      );
    }
  }

  function validarEstructura(str) {
    if (typeof str != "string") {
      throw error("Primer parametro debe ser un string");
    }
  }

  function valdiarReglas(rules) {
    if (!Array.isArray(rules)) {
      throw error("Las reglas debe ser un array");
    }
    for (const value of rules) {
      if (typeof value.name != "string" || typeof value.tester != "function") {
        throw error(
          "Nombre debe ser una string y tester una función"
        );
      }
    }
  }

  function error(message) {
    return {
      message: "Lexerjs: " + message,
      toString: function () {
        return this.message;
      }
    };
  }

  exports.lexer = lexer;
  exports.lexerResults = lexerResults;
})(typeof exports === "object" ? exports : this);
