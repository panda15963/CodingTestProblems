var isSubsequence = function(s, t) {
    const sLength = s.length;
    const tLength = t.length;

    let sPointer = 0;

    for (
        let tPointer = 0;
        sPointer < sLength && tPointer < tLength;
        tPointer++
    ) {
        if (s[sPointer] === t[tPointer]) {
            sPointer++;
        }
    }

    return sPointer === sLength;
};