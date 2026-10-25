var magicalString = function(n) {
    if (n === 0) return 0;

    const magicalSequence = [1, 2, 2];

    for (let index = 2; magicalSequence.length < n; ++index) {
        const previousElement = magicalSequence[magicalSequence.length - 1];
        const currentElement = 3 - previousElement;

        for (let count = 0; count < magicalSequence[index]; ++count) {
            magicalSequence.push(currentElement);
        }
    }

    return magicalSequence
        .slice(0, n)
        .filter(element => element === 1)
        .length;
};