function solution(orders, course) {

    const map = new Map();

    function combination(arr, target, idx, str) {

        if (str.length === target) {

            map.set(str, (map.get(str) || 0) + 1);

            return;
        }

        for (let i = idx; i < arr.length; i++) {
            combination(arr, target, i + 1, str + arr[i]);
        }
    }

    // 모든 조합 생성
    for (const order of orders) {

        const sorted = [...order].sort();

        for (const size of course) {

            if (sorted.length >= size) {
                combination(sorted, size, 0, "");
            }
        }
    }

    const answer = [];

    for (const size of course) {

        let max = 1;
        let result = [];

        for (const [key, value] of map) {

            if (key.length !== size) continue;

            if (value === max && max > 1) {
                result.push(key);
            } else if (value > max) {
                max = value;
                result = [key];
            }
        }

        answer.push(...result);
    }

    return answer.sort();
}