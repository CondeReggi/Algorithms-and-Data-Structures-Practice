function maxGifts(houses) {
    if (houses.length === 0) return 0;
    if (houses.length === 1) return houses[0];

    let prevMax = houses[0];
    let currMax = Math.max(houses[0], houses[1]);

    for (let i = 2; i < houses.length; i++) {
        let newMax = Math.max(currMax, prevMax + houses[i]);
        prevMax = currMax;
        currMax = newMax;
    }

    return currMax;
}