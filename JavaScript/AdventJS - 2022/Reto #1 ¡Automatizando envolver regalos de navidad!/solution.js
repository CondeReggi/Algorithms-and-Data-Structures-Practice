function wrapping(gifts) {
    return gifts.map(x => {
        let extremos = '*'.repeat(x.length + 2);
        return [extremos, `*${x}*`, extremos].join("\n")
    });
}
