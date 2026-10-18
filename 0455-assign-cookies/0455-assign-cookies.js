var findContentChildren = function(g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);

    const childrenCount = g.length;
    const cookieCount = s.length;

    let cookieIndex = 0;

    for (let childIndex = 0; childIndex < childrenCount; childIndex++) {
        while (
            cookieIndex < cookieCount &&
            s[cookieIndex] < g[childIndex]
        ) {
            cookieIndex++;
        }

        if (cookieIndex >= cookieCount) {
            return childIndex;
        }

        cookieIndex++;
    }

    return childrenCount;
};