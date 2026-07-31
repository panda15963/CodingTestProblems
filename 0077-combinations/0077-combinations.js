/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
function combine(n, k) {
    const answer = [];
    const output = new Array(k).fill(-1);

    function combination(index, selected) {
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