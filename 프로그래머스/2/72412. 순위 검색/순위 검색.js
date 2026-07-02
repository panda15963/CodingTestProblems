function solution(info, query) {

    const map = new Map();

    function dfs(depth, key, arr) {

        if (depth === 4) {

            const score = Number(arr[4]);

            if (!map.has(key.trim())) {
                map.set(key.trim(), []);
            }

            map.get(key.trim()).push(score);

            return;
        }

        // 선택
        dfs(
            depth + 1,
            key === "" ? arr[depth] : key + " " + arr[depth],
            arr
        );

        // 선택 안함
        dfs(depth + 1, key, arr);
    }

    // 모든 조합 생성
    for (const str of info) {
        dfs(0, "", str.split(" "));
    }

    // 점수 정렬
    for (const list of map.values()) {
        list.sort((a, b) => a - b);
    }

    function lowerBound(arr, target) {

        let left = 0;
        let right = arr.length;

        while (left < right) {

            const mid = Math.floor((left + right) / 2);

            if (arr[mid] >= target) {
                right = mid;
            } else {
                left = mid + 1;
            }

        }

        return left;
    }

    const answer = [];

    for (let q of query) {

        q = q.replace(/ and /g, " ");

        const arr = q.split(" ");

        const key = [];

        for (let i = 0; i < 4; i++) {
            if (arr[i] !== "-") {
                key.push(arr[i]);
            }
        }

        const str = key.join(" ");
        const score = Number(arr[4]);

        if (!map.has(str)) {
            answer.push(0);
            continue;
        }

        const list = map.get(str);

        const idx = lowerBound(list, score);

        answer.push(list.length - idx);
    }

    return answer;
}