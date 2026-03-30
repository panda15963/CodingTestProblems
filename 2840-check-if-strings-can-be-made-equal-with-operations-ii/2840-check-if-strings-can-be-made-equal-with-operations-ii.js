function checkStrings(s1, s2) {
    const even1 = new Array(26).fill(0);
    const odd1 = new Array(26).fill(0);
    const even2 = new Array(26).fill(0);
    const odd2 = new Array(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
        const idx1 = s1.charCodeAt(i) - 97;
        const idx2 = s2.charCodeAt(i) - 97;

        if (i % 2 === 0) {
            even1[idx1]++;
            even2[idx2]++;
        } else {
            odd1[idx1]++;
            odd2[idx2]++;
        }
    }

    return isEqual(even1, even2) && isEqual(odd1, odd2);
}

function isEqual(a, b) {
    for (let i = 0; i < 26; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}