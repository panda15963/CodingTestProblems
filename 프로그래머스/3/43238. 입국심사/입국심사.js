function solution(n, times) {
    let left = 1;
    let right = Math.max(...times) * n;

    let answer = right;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        let people = 0;

        for (const time of times) {
            people += Math.floor(mid / time);
            if (people >= n) break;
        }

        if (people >= n) {
            answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return answer;
}