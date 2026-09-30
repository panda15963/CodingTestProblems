var lexicalOrder = function(n) {
    const result = [];
    let currentNumber = 1;

    for (let i = 0; i < n; i++) {
        result.push(currentNumber);

        if (currentNumber * 10 <= n) {
            currentNumber *= 10;
        } else {
            while (
                currentNumber % 10 === 9 ||
                currentNumber === n
            ) {
                currentNumber = Math.floor(currentNumber / 10);
            }

            currentNumber++;
        }
    }

    return result;
};