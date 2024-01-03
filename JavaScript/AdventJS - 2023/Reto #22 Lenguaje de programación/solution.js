function compile(code) {
    let counter = 0;
    let returnPoints = [];
    let i = 0;
    let skipBlock = false;

    while (i < code.length) {
        let char = code[i];

        if (char === '¿') {
            if (counter <= 0) {
                skipBlock = true;
            }
        } else if (char === '?' && skipBlock) {
            skipBlock = false;
        } else if (!skipBlock || char === '¿' || char === '?') {
            switch (char) {
                case '+':
                    counter++;
                    break;
                case '*':
                    counter *= 2;
                    break;
                case '-':
                    counter--;
                    break;
                case '%':
                    returnPoints.push(i);
                    break;
                case '<':
                    if (returnPoints.length > 0) {
                        i = returnPoints.pop() + 1;
                        returnPoints = [];
                        continue;
                    }
                    break;
            }
        }
        i++;
    }

    return counter;
}