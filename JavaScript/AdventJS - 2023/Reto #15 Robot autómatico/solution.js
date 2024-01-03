function autonomousDrive(store, movements) {
    if (store.length === 0) return [];

    let [fila, columna] = [0, 0];
    for (let i = 0; i < store.length; i++) {
        let j = store[i].indexOf('!');
        if (j !== -1) {
            fila = i;
            columna = j;
            break;
        }
    }

    store[fila] = store[fila].replace('!', '.');

    for (let move of movements) {
        let nuevaFila = fila, nuevaColumna = columna;
        switch (move) {
            case 'R':
                nuevaColumna++;
                break;
            case 'D':
                nuevaFila++;
                break;
            case 'L':
                nuevaColumna--;
                break;
            case 'U':
                nuevaFila--;
                break;
        }

        if (nuevaFila >= 0
            && nuevaFila < store.length
            && nuevaColumna >= 0
            && nuevaColumna < store[nuevaFila].length
            && store[nuevaFila][nuevaColumna] !== '*') {
            fila = nuevaFila;
            columna = nuevaColumna;
        }
    }

    store[fila] =
        store[fila].substring(0, columna)
        + '!'
        + store[fila].substring(columna + 1);

    return store;
}
