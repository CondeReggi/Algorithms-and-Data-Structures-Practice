function maxDistance(movements) {
    let int = 0;
    return Math.abs(movements.split("").reduce((acc, res) => {
        switch (res) {
            case '*':
                int++;
                break;
            case '>':
                acc += 1;
                break;
            case '<':
                acc -= 1;
                break;
        }
        return acc;
    }, 0)) + int;
}