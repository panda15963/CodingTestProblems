function solution(numbers) {
    const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    words.forEach((word, index) => {
        numbers = numbers.replaceAll(word, index);
    });
    return Number(numbers);
}
