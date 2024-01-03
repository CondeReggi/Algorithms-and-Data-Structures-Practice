function findFirstRepeated(gifts) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < gifts.length; i++) {
        const first = gifts.indexOf(gifts[i]);
        const last = gifts.lastIndexOf(gifts[i]);
        if (first != last) {
            min = last < min ? last : min;
        }
    }
    return min == Number.MAX_SAFE_INTEGER ? -1 : gifts[min];
}