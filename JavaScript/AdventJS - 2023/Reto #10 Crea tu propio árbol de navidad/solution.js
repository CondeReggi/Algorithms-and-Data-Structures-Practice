function createChristmasTree(ornaments, height) {
    const result = [];
    const characters = ornaments.split('');

    for (let i = 0; i < height; i++) {
        let str = "";
        for (let j = 0; j <= i; j++) {
            const value = characters.shift();
            characters.push(value);
            str += value + " ";
        }
        result.push(str.trim().padStart(height + i, " "));
    }
    result.push('|'.padStart(height, " "))

    return result.join("\n") + "\n";
}