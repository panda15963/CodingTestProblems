function solution(arrayA, arrayB) {
    // 최대공약수(GCD) 구하는 함수
    const getGcd = (a, b) => {
        while (b > 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    // 배열의 최대공약수 계산
    const getArrayGcd = (arr) => {
        let result = arr[0];
        for (let i = 1; i < arr.length; i++) {
            result = getGcd(result, arr[i]);
        }
        return result;
    };

    // 1. 각 배열의 최대공약수 구하기
    const gcdA = getArrayGcd(arrayA);
    const gcdB = getArrayGcd(arrayB);

    let answerA = 0;
    let answerB = 0;

    // 2. gcdA가 arrayB를 나눌 수 없는지 확인
    let isValidA = true;
    for (let i = 0; i < arrayB.length; i++) {
        if (arrayB[i] % gcdA === 0) {
            isValidA = false;
            break;
        }
    }
    if (isValidA) answerA = gcdA;

    // 3. gcdB가 arrayA를 나눌 수 없는지 확인
    let isValidB = true;
    for (let i = 0; i < arrayA.length; i++) {
        if (arrayA[i] % gcdB === 0) {
            isValidB = false;
            break;
        }
    }
    if (isValidB) answerB = gcdB;

    // 4. 두 조건 중 만족하는 수 중 큰 값 반환
    return Math.max(answerA, answerB);
}
