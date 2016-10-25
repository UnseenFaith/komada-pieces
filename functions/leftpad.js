module.exports = (text, number, char = '0') => {
    if (typeof(text) === "string") {
        return String(text).length >= number ? '' + text : (String(char).repeat(number) + text).slice(-number);
    } else {
        return text;
    }
};
