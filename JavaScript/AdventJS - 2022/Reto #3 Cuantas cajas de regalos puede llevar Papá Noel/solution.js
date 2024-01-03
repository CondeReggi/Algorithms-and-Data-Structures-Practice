function distributeGifts(packOfGifts, reindeers) {
    const regalos = packOfGifts.reduce((acc, res) => acc + res.length, 0)
    const puedenLlevar = reindeers
        .map(x => x.length)
        .reduce((acc, res) => acc + (2 * res), 0)

    return Math.floor(puedenLlevar / regalos)
}