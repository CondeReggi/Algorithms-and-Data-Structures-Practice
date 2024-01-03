function optimizeIntervals(intervals) {
    if (intervals.length == 0) return null;
    if (intervals.length == 1) return intervals.pop();

    const array = intervals.sort((a, b) => a[0] - b[0]);
    const result = []

    let min = array[0][0];
    let max = array[0][1];

    for (let i = 1; i < array.length; i++) {
        const [first, second] = intervals[i];
        if (first > max) {
            result.push([min, max]);
            min = first;
            max = second;
        } else if (second > max) {
            max = second;
        }
    }
    result.push([min, max]);

    return result
}