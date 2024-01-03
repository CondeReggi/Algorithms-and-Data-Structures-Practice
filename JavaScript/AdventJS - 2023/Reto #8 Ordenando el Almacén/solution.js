function organizeGifts(gifts) {
    const obtenerObjeto = (str) => {
        const expresion = /(\d+)([a-zA-Z])/g;
        const match = str.match(expresion);
        if (!match) {
            return null;
        }
        let resultFinal = []
        for (let elem of match) {
            const expresion2 = /(\d+)([a-zA-Z])/
            const [_, numero, letra] = elem.match(expresion2);

            if (!numero || !letra) continue;

            const objeto = { numero: Number(numero), letra };
            const patronLetras = patron(objeto)

            resultFinal.push(patronLetras)
        }
        return resultFinal.join("");
    }

    const patron = (obj) => {
        if (!obj) return;
        const { numero, letra } = obj;
        if (numero < 10) {
            return "(" + letra.repeat(numero) + ")"
        }
        const result = []
        let division = Math.floor(numero / 10);
        let resto = Math.floor(numero % 10);

        if (division >= 5) {
            let cantidadPaquetesDe5 = Math.floor(division / 5);
            let moduloPaquetesDe5 = Math.floor(division % 5);

            for (let i = 0; i < cantidadPaquetesDe5; i++) {
                result.push("[" + letra + "]")
            }

            for (let i = 0; i < moduloPaquetesDe5; i++) {
                result.push("{" + letra + "}")
            }
        } else {
            for (let i = 0; i < division; i++) {
                result.push("{" + letra + "}")
            }
        }
        if (resto > 0) result.push("(" + letra.repeat(resto) + ")")
        return result.join("")
    }

    const data = obtenerObjeto(gifts);
    return data;
}