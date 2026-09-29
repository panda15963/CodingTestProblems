class Solution {
    private originalArray: number[];

    constructor(nums: number[]) {
        this.originalArray = [...nums];
    }

    reset(): number[] {
        return [...this.originalArray];
    }

    shuffle(): number[] {
        const shuffledArray: number[] = [...this.originalArray];

        for (
            let currentIndex = 0;
            currentIndex < shuffledArray.length;
            currentIndex++
        ) {
            const randomIndex: number = Math.floor(
                Math.random() * shuffledArray.length
            );

            [
                shuffledArray[currentIndex],
                shuffledArray[randomIndex]
            ] = [
                shuffledArray[randomIndex],
                shuffledArray[currentIndex]
            ];
        }

        return shuffledArray;
    }
}