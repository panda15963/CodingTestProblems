/**
 * @param n
 * @param k
 * @returns
 */
function combine(n: number, k: number): number[][] {
    const answer: number[][] = [];
    const output: number[] = new Array(k).fill(-1);

    function combination(index: number, selected: number): void {
        if (selected === k) {
            answer.push([...output]);
            return;
        }

        if (index > n) {
            return;
        }

        output[selected] = index;
        combination(index + 1, selected + 1);
        combination(index + 1, selected);
    }

    combination(1, 0);

    return answer;
}