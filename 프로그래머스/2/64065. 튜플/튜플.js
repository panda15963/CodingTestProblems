function solution(s) {
    let answer = [];

    // split을 위해 불필요한 문자열 제거
    s = s.slice(1, -2);

    // 문자열 {숫자} 형태로 남기기 위해 split
    let arr = s.split("},");

    // 문자열을 숫자 배열로 변환
    let final = [];

    for (let str of arr) {
        str = str.slice(1);
        final.push(str.split(",").map(Number));
    }

    // 길이순 정렬
    final.sort((a, b) => a.length - b.length);

    let set = new Set();

    for (const cur of final) {
        for (const num of cur) {
            if (!set.has(num)) {
                answer.push(num);
                break;
            }
        }

        for (const num of cur) {
            set.add(num);
        }
    }

    return answer;
}