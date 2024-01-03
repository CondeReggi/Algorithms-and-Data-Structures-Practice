function revealSabotage(store) {
    const mapa = store
        .map(x => x.map(y => y == ' ' ? 0 : y));

    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[i].length; j++) {
            if (mapa[i][j] == '*') {
                if (j + 1 < mapa[i].length &&
                    !isNaN(mapa[i][j + 1]))
                    mapa[i][j + 1]++;
                if (j - 1 >= 0 && !isNaN(mapa[i][j - 1]))
                    mapa[i][j - 1]++;
                if (i - 1 >= 0) {
                    if (!isNaN(mapa[i - 1][j])) mapa[i - 1][j]++;
                    if (j + 1 < mapa[i].length
                        && !isNaN(mapa[i - 1][j + 1]))
                        mapa[i - 1][j + 1]++;
                    if (j - 1 >= 0 && !isNaN(mapa[i - 1][j - 1]))
                        mapa[i - 1][j - 1]++;
                }
                if (i + 1 < mapa.length) {
                    if (!isNaN(mapa[i + 1][j])) mapa[i + 1][j]++;
                    if (j + 1 < mapa[i].length
                        && !isNaN(mapa[i + 1][j + 1]))
                        mapa[i + 1][j + 1]++;
                    if (j - 1 >= 0 && !isNaN(mapa[i + 1][j - 1]))
                        mapa[i + 1][j - 1]++;
                }
            }
        }
    }

    return mapa.map(x => x.map(y => {
        if (y == '*') return y;
        if (y == 0) return ' ';
        return y.toString()
    }))
}