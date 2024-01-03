function travelDistance(map) {
    map = map.split("\n");
    const posiciones = {}

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] !== '.') posiciones[map[i][j]] = { x: j, y: i }
        }
    }

    let { x: x1, y: y1 } = posiciones['S'];
    delete posiciones['S'];

    return Object
        .entries(posiciones).map(x => x[1])
        .reduce((acc, res) => {
            const { x, y } = res;
            acc += Math.abs(x - x1) + Math.abs(y - y1);
            [x1, y1] = [x, y];
            return acc;
        }, 0);
}