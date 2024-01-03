function drawGift(size, symbol) {
    const n = 2 * size - 1;
    let array = []
    for (let i = 0; i <= size - 1; i++) {
        let str = "";
        if (i == 0) array.push("".padStart(size, "#"))
        else {
            for (let j = 0; j < n; j++) {
                if (j == 0 || i == j || j == size + i - 1) str += "#"
                else if (i == size - 1) {
                    if (j > size - 1) str += "#"
                    else str += symbol
                }
                else if (j < size + i) str += symbol
            }
            array.push(str);
        }
    }
    array = array.map(x => x.padEnd(n, " "));
    const copiaSuperior = array.slice(0, size - 1)
        .map(x => x.split("").reverse().join("").trimEnd())
        .reverse()
        .map((x, index) => {
            const array = x.split("");
            array[size - 1] = "#";

            if (index < size - 2) {
                for (let i = size; i < n - 1; i++) {
                    if (array[i]) array[i] = symbol;
                }
            }
            return array.join("")
        })

    const result = array
        .concat(copiaSuperior)
        .map(x => x.split("").reverse().join("").trimEnd())
    return result.join("\n").trimEnd() + "\n";
}