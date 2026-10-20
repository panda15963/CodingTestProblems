var rand10 = function() {
    while (true) {
        const i = rand7() - 1;
        const j = rand7();
        const x = i * 7 + j;

        if (x <= 40) {
            return (x % 10) + 1;
        }
    }
};