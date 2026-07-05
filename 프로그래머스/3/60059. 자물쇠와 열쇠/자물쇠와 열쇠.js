function rotate(matrix) {
    const n = matrix.length;
    const m = matrix[0].length;

    const result = Array.from({ length: m }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            result[j][n - i - 1] = matrix[i][j];
        }
    }

    return result;
}

// 자물쇠 중앙 부분이 모두 1인지 확인
function check(newLock) {
    const lockLength = Math.floor(newLock.length / 3);

    for (let i = lockLength; i < lockLength * 2; i++) {
        for (let j = lockLength; j < lockLength * 2; j++) {
            if (newLock[i][j] !== 1) {
                return false;
            }
        }
    }

    return true;
}

function solution(key, lock) {
    const n = lock.length;
    const m = key.length;

    // 자물쇠를 3배 크기로 확장
    const newLock = Array.from(
        { length: n * 3 },
        () => Array(n * 3).fill(0)
    );

    // 가운데에 기존 자물쇠 배치
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            newLock[i + n][j + n] = lock[i][j];
        }
    }

    // 4방향 회전
    for (let rotation = 0; rotation < 4; rotation++) {

        key = rotate(key);

        for (let x = 0; x < n * 2; x++) {
            for (let y = 0; y < n * 2; y++) {

                // 열쇠 삽입
                for (let i = 0; i < m; i++) {
                    for (let j = 0; j < m; j++) {
                        newLock[x + i][y + j] += key[i][j];
                    }
                }

                // 확인
                if (check(newLock)) {
                    return true;
                }

                // 원상복구
                for (let i = 0; i < m; i++) {
                    for (let j = 0; j < m; j++) {
                        newLock[x + i][y + j] -= key[i][j];
                    }
                }
            }
        }
    }

    return false;
}