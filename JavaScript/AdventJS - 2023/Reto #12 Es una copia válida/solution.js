function checkIsValidCopy(original, copy) {
    if (original.length != copy.length) return false;

    let [primero, segundo] = [original, copy]

    original = original.toLowerCase();
    copy = copy.toLowerCase();

    if (copy == original) return primero == segundo;
    let bool = true;

    for (let i = 0; i < original.length; i++) {
        if (original[i] != copy[i]) {
            if (original[i] == " " && copy[i] != " ") return false;
            let regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

            bool = bool && regex.test(copy[i])
        }
        if (!bool) return bool;
    }
    return bool
}