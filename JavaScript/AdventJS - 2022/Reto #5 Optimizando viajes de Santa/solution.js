function getMaxGifts(giftsCities, maxGifts, maxCities) {
    let maxSum = 0;

    function findMaxGifts(index, currentSum, citiesCount) {
        if (citiesCount > maxCities || currentSum > maxGifts) {
            return;
        }

        if (citiesCount <= maxCities && currentSum <= maxGifts) {
            maxSum = Math.max(maxSum, currentSum);
        }
        for (let i = index; i < giftsCities.length; i++) {
            findMaxGifts(i + 1, currentSum + giftsCities[i], citiesCount + 1);
        }
    }

    findMaxGifts(0, 0, 0);

    return maxSum;
}