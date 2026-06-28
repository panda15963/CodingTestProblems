function solution(park, routes) {
    const answer = [0, 0];

    let x = -1; // 시작 및 현재 위치 (열)
    let y = -1; // 시작 및 현재 위치 (행)

    const height = park.length;
    const width = park[0].length;

    // 시작 위치 찾기
    for (let i = 0; i < park.length; i++) {
        const idx = park[i].indexOf("S");
        if (idx !== -1) {
            x = idx;
            y = i;
            break;
        }
    }

    // 명령 수행
    for (let i = 0; i < routes.length; i++) {
        const [vector, dist] = routes[i].split(" ");
        const distance = Number(dist);

        let currX = x;
        let currY = y;
        let flag = true;

        if (vector === "E") { // 동
            for (let j = 1; j <= distance; j++) {
                currX++;
                if (currX >= width || park[currY][currX] === "X") {
                    flag = false;
                    break;
                }
            }
            if (flag) x = currX;
        } else if (vector === "W") { // 서
            for (let j = 1; j <= distance; j++) {
                currX--;
                if (currX < 0 || park[currY][currX] === "X") {
                    flag = false;
                    break;
                }
            }
            if (flag) x = currX;
        } else if (vector === "S") { // 남
            for (let j = 1; j <= distance; j++) {
                currY++;
                if (currY >= height || park[currY][currX] === "X") {
                    flag = false;
                    break;
                }
            }
            if (flag) y = currY;
        } else if (vector === "N") { // 북
            for (let j = 1; j <= distance; j++) {
                currY--;
                if (currY < 0 || park[currY][currX] === "X") {
                    flag = false;
                    break;
                }
            }
            if (flag) y = currY;
        }
    }

    answer[0] = y;
    answer[1] = x;

    return answer;
}