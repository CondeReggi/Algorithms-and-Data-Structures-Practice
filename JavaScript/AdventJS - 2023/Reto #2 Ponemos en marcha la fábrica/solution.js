function manufacture(gifts, materials) {
    return gifts
        .filter(x =>
            x.split("")
                .every(y => materials.includes(y)))
}