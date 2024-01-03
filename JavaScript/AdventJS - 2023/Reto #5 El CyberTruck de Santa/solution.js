function cyberReindeer(road, time) {
    const result = []
    const validatePipe = (a, obj = [], index) => {
        const array = a.split("");
        for (let i = 0; i < array.length; i++) {
            if (index > 4 && obj.includes(i) && array[i] !== 'S') {
                array[i] = "*";
            }
        }
        const result = array.join("");
        return index > 4 ? result.replaceAll("|", "*") : result;
    }
    const esBarra = {}
    let j = 0;
    for (let i = 0; i < time; i++) {
        if (road[j] == "|") {
            esBarra[j] = i;
            if (i <= 4) {
                result.push(road);
            } else {
                road = road.replace("S", ".")
                road = road
                    .split("")
                    .map((x, index) => {
                        if (index == j) return "S"
                        return x;
                    })
                    .join("");

                j++;
                result.push(road);
            }
        } else {
            road = road.replace("S", ".").split("").map((x, index) => {
                if (index == j) return "S"
                return x;
            }).join("");

            result.push(road);
            j++;
        }
    }
    const resultado = result
        .map((x, i) => validatePipe(x, Object.entries(esBarra).map(x => Number(x[0])), i));
    return resultado;
}