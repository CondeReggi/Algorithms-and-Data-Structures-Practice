function distributeGifts(weights) {
    const result = [];
    for (let i = 0; i < weights.length; i++) {
        const array = [];

        for (let j = 0; j < weights[i].length; j++) {
            let suma = weights[i][j] || 0;
            let cantidadAyacentes = weights[i][j] ? 1 : 0;

            if (j + 1 < weights[i].length && weights[i][j + 1]) {
                cantidadAyacentes++;
                suma += weights[i][j + 1];
            }
            if (j - 1 >= 0 && weights[i][j - 1]) {
                cantidadAyacentes++;
                suma += weights[i][j - 1];
            }

            if (i + 1 < weights.length && weights[i + 1][j]) {
                cantidadAyacentes++;
                suma += weights[i + 1][j];
            }
            if (i - 1 >= 0 && weights[i - 1][j]) {
                cantidadAyacentes++;
                suma += weights[i - 1][j];
            }

            array.push(Math.round(suma / cantidadAyacentes));
        }
        result.push(array);
    }

    return result
}