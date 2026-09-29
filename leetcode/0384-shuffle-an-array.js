var Solution = function(nums) {
    this.originalArray = [...nums];
};

Solution.prototype.reset = function() {
    return [...this.originalArray];
};

Solution.prototype.shuffle = function() {
    const shuffledArray = [...this.originalArray];

    for (
        let currentIndex = 0;
        currentIndex < shuffledArray.length;
        currentIndex++
    ) {
        const randomIndex = Math.floor(
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
};