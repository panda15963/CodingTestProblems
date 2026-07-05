function solution(record) {

    const map = new Map();

    const splitRecord = record.map(r => r.split(" "));

    // 닉네임 최신화
    for (const r of splitRecord) {
        if (r[0] === "Enter" || r[0] === "Change") {
            map.set(r[1], r[2]);
        }
    }

    const result = [];

    // 결과 생성
    for (const r of splitRecord) {

        switch (r[0]) {

            case "Enter":
                result.push(`${map.get(r[1])}님이 들어왔습니다.`);
                break;

            case "Leave":
                result.push(`${map.get(r[1])}님이 나갔습니다.`);
                break;
        }
    }

    return result;
}