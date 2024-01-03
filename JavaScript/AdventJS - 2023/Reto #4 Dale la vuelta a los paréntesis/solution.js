function decode(message) {
    while (message.indexOf(")") != -1) {
        let firstIndex = message.lastIndexOf("(");
        let lastIndex = message.indexOf(")", firstIndex);

        if (firstIndex !== -1 && lastIndex !== -1) {
            let substring = message.substring(firstIndex + 1, lastIndex);

            message = message.slice(0, firstIndex)
                + substring.split("").reverse().join("")
                + message.slice(lastIndex + 1);
        }
    }
    return message;
}