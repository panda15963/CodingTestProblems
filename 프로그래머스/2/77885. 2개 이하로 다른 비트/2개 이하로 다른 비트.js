function solution(numbers) {
    return numbers.map(number => {
        let num = BigInt(number);

        // 짝수인 경우
        if (num % 2n === 0n) {
            return Number(num + 1n);
        }

        const rightmostZero = (num + 1n) & (~num);
        const nextOne = rightmostZero >> 1n;

        return Number(num ^ rightmostZero ^ nextOne);
    });
}