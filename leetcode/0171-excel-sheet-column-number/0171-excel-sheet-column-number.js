var titleToNumber = function(columnTitle) {
    let result = 0;

    for (const character of columnTitle) {
        result =
            result * 26 +
            (character.charCodeAt(0) - "A".charCodeAt(0) + 1);
    }

    return result;
};