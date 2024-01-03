function countHours(year, holidays) {
    const fechas = holidays
        .map(x => `${x}/${year}`)
        .reduce((acc, res) => {
            const date = new Date(res);
            let day = date.getDay();
            let sum = (day > 0 && day <= 5) ? 1 : 0;
            acc += sum;

            return acc;
        }, 0)

    return 2 * fechas;
}
