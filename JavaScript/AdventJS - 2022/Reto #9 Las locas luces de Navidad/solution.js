function countTime(leds) {
    const corroborarLeds = (leds) => {
        return leds.every(x => x == 1);
    }

    let result = 0;
    const aux = [...leds];

    while (!corroborarLeds(leds)) {
        for (let i = 0; i < leds.length; i++) {
            let prev;
            let current = leds[i];
            if (i == 0) prev = leds[leds.length - i - 1];
            else prev = leds[i - 1];
            if (current == 0 && prev == 1) {
                aux[i] = 1;
            }
        }

        result++;
        leds = [...aux];
    }

    return result * 7;
}