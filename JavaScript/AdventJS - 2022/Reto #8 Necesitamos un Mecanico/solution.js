function checkPart(part) {
    const isPalindorme = (str) => {
        for (let i = 0; i < str.length / 2; i++) {
            if (str[i] != str[str.length - 1 - i]) return false;
        }
        return true;
    }

    if (isPalindorme(part)) return true;

    for (let i = 0; i < part.length; i++) {
        const substring = part.substring(0, i) + part.substring(i + 1, part.length);
        if (isPalindorme(substring)) return true;
    }

    return false
}