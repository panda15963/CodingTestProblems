var findRotateSteps = function(ring, key) {
    const keyLength = key.length;
    const ringLength = ring.length;

    // 각 문자가 ring에 등장하는 위치 저장
    const positions = Array.from({ length: 26 }, () => []);

    for (let i = 0; i < ringLength; i++) {
        const charIndex = ring.charCodeAt(i) - 'a'.charCodeAt(0);
        positions[charIndex].push(i);
    }

    // dp[i][j]: key의 i번째 문자까지 입력했을 때,
    // ring의 현재 위치가 j인 경우의 최소 비용
    const dp = Array.from(
        { length: keyLength },
        () => Array(ringLength).fill(Infinity)
    );

    // 첫 번째 문자 처리
    const firstCharPositions =
        positions[key.charCodeAt(0) - 'a'.charCodeAt(0)];

    for (const targetPosition of firstCharPositions) {
        const clockwiseDistance = targetPosition;
        const anticlockwiseDistance = ringLength - targetPosition;

        dp[0][targetPosition] =
            Math.min(clockwiseDistance, anticlockwiseDistance) + 1;
    }

    // 나머지 문자 처리
    for (let i = 1; i < keyLength; i++) {
        const currentCharPositions =
            positions[key.charCodeAt(i) - 'a'.charCodeAt(0)];

        const previousCharPositions =
            positions[key.charCodeAt(i - 1) - 'a'.charCodeAt(0)];

        for (const currentPosition of currentCharPositions) {
            for (const previousPosition of previousCharPositions) {
                const directDistance =
                    Math.abs(currentPosition - previousPosition);

                const aroundDistance = ringLength - directDistance;

                const minRotation =
                    Math.min(directDistance, aroundDistance);

                dp[i][currentPosition] = Math.min(
                    dp[i][currentPosition],
                    dp[i - 1][previousPosition] + minRotation + 1
                );
            }
        }
    }

    // 마지막 문자를 입력하는 최소 비용
    let minSteps = Infinity;

    const lastCharPositions =
        positions[key.charCodeAt(keyLength - 1) - 'a'.charCodeAt(0)];

    for (const finalPosition of lastCharPositions) {
        minSteps = Math.min(minSteps, dp[keyLength - 1][finalPosition]);
    }

    return minSteps;
};