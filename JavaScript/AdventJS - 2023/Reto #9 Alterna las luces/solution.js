function adjustLights(lights) {
    const red = '🔴';
    const green = '🟢';

    let changesForRedStart = 0;
    let changesForGreenStart = 0;

    for (let i = 0; i < lights.length; i++) {
        if (i % 2 === 0) {
            if (lights[i] !== red) changesForRedStart++;
            if (lights[i] !== green) changesForGreenStart++;
        } else {
            if (lights[i] !== green) changesForRedStart++;
            if (lights[i] !== red) changesForGreenStart++;
        }
    }

    return Math.min(changesForRedStart, changesForGreenStart);
}
