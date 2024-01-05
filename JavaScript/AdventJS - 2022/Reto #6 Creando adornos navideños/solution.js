function createCube(size) {
    let [superior, inferior] = ["", ""]

    for (let j = size - 1; j >= 0; j--) {
        let str = "";
        for (let i = 2 * j; i < 2 * size; i++) {
            if (i % 2) {
                str += "\\";
            } else {
                str += "/";
            }
        }
        let spaces = (2 * size - str.length) / 2;
        let formSuperior = " ".repeat(spaces) + str;
        let formInferior = " ".repeat(spaces) + str.split("")
            .reverse().join("");
        superior += formSuperior + "\n";
        inferior = formInferior + "\n" + inferior
    }

    let total = (superior + inferior).trimEnd().split("\n");

    return total.map((x, i) => {
        if (i < size) {
            return x + "_\\".repeat(size);
        } else {
            return x + "_/".repeat(size);
        }
    }).join("\n")
}