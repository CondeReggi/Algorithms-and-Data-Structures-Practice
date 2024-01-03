function findBalancedSegment(message) {
    let [maxLength, startIndex, count] = [0, -1, 0]
    let map = { 0: -1 };

    for (let i = 0; i < message.length; i++) {
        count += message[i] === 1 ? 1 : -1;

        if (map.hasOwnProperty(count)) {
            let length = i - map[count];

            if (length > maxLength) {
                maxLength = length;
                startIndex = map[count] + 1;
            }
        } else {
            map[count] = i;
        }
    }

    if (startIndex === -1) return [];
    return [startIndex, startIndex + maxLength - 1];
}