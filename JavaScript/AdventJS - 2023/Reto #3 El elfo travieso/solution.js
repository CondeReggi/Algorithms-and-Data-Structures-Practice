function findNaughtyStep(original, modified) {
    if (original.length == modified.length) return ""
    let chico = original.length < modified.length ? original : modified;
    let largo = original.length < modified.length ? modified : original;

    for (let i = 0; i < largo.length; i++) {
        if (largo[i] != chico[i]) return largo[i];
    }
    return ""
}