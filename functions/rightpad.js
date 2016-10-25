module.exports = (text, number, char = '0') => {
    if (typeof(text) === "string") {
        return String(text).length >= number ? '' + text : String(text) + String(char).repeat(number - String(text).length);
    } else {
        return text;
    }
};
