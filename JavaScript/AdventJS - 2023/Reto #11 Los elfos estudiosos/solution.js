function getIndexsForPalindrome(word) {
    const isPalindome = (word) => word.split("")
        .every((x, i) => x === word[word.length - i - 1]);

    if (isPalindome(word)) return [];

    const splited = word.split("");
    const splited2 = word.split("");

    for (let i = 0; i < word.length / 2; i++) {
        const { primero, segundo } = {
            primero: word[i],
            segundo: word[word.length - 1 - i]
        }
        if (primero != segundo) {
            const index = splited.indexOf(segundo, i + 1);
            const index2 = splited.indexOf(primero, i + 1);
            let bool = true;

            if (index != -1) {
                [splited[index], splited[i]] = [splited[i], splited[index]]
                let esPalindrome = isPalindome(splited.join(""));
                if (esPalindrome) return [i, index];
                else bool = bool && !esPalindrome;
            }
            if (index2 != -1) {
                [splited2[index2], splited2[word.length - 1 - i]]
                    = [splited2[word.length - 1 - i], splited2[index2]]
                let esPalindrome = isPalindome(splited2.join(""))
                if (esPalindrome) return [index2, word.length - 1 - i];
                else bool = bool && !esPalindrome;
            }
            if (bool) return null;
        }
    }
    return null
}