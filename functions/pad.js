module.exports = function(text, number, char = '0', side = "right") {
    if (typeof(text) === "string") {
        switch (side.toLowerCase()) {
            case "right":
                return String(text).length >= number ? '' + text : String(text) + String(char).repeat(number - String(text).length);
                break;
            case "left":
                return String(text).length >= number ? '' + text : (String(char).repeat(number) + text).slice(-number);
                break;
        }
    } else {
        return text;
    }
};
