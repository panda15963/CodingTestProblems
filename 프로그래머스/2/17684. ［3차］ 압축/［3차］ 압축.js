function solution(msg) {

    const answer = [];
    const map = new Map();

    let index = 1;

    // A ~ Z 초기화
    for (; index < 27; index++) {
        map.set(String.fromCharCode(64 + index), index);
    }

    for (let i = 0; i < msg.length; i++) {

        let temp = msg[i];

        let j = i;
        let count = 0;

        while (map.has(temp)) {

            count++;
            j++;

            if (j >= msg.length) {
                break;
            }

            temp += msg[j];
        }

        i += count - 1;

        if (!map.has(temp)) {
            map.set(temp, index++);
            temp = temp.slice(0, -1);
        }

        answer.push(map.get(temp));
    }

    return answer;
}