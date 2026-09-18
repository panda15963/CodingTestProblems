var maxNumOfSubstrings = function(s) {
    const n = s.length;
    const left = Array(26).fill(n);
    const right = Array(26).fill(-1);

    for (let i = 0; i < n; ++i) {
        const index = s.charCodeAt(i) - 97;
        left[index] = Math.min(left[index], i);
        right[index] = i;
    }

    const intervals = [];

    for (let i = 0; i < n; ++i) {
        const index = s.charCodeAt(i) - 97;

        if (i !== left[index]) {
            continue;
        }

        let newR = right[index];
        let valid = true;

        for (let j = i; j <= newR; ++j) {
            const currentIndex = s.charCodeAt(j) - 97;

            if (left[currentIndex] < i) {
                valid = false;
                break;
            }

            newR = Math.max(newR, right[currentIndex]);
        }

        if (valid) {
            intervals.push([i, newR]);
        }
    }

    intervals.sort((a, b) => a[1] - b[1]);

    const result = [];
    let end = -1;

    for (const [start, rightEnd] of intervals) {
        if (start > end) {
            result.push(s.substring(start, rightEnd + 1));
            end = rightEnd;
        }
    }

    return result;
};