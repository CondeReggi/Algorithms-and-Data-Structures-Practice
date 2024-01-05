function getGiftsToRefill(a1, a2, a3) {
    const seta1 = [...new Set(a1)];
    const seta2 = [...new Set(a2)];
    const seta3 = [...new Set(a3)];

    const obj = {}
    for (let elem of [...seta1, ...seta2, ...seta3]) {
        if (obj[elem]) {
            obj[elem] = obj[elem] + 1;
        } else {
            obj[elem] = 1
        }
    }

    return Object.keys(obj).filter((x) => obj[x] == 1)
}