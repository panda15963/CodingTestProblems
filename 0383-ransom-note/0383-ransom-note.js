var canConstruct = function(ransomNote, magazine) {
    const count = new Array(26).fill(0);

    for (const char of magazine) {
        count[char.charCodeAt(0) - 97]++;
    }

    for (const char of ransomNote) {
        const index = char.charCodeAt(0) - 97;
        count[index]--;

        if (count[index] < 0) {
            return false;
        }
    }

    return true;
};