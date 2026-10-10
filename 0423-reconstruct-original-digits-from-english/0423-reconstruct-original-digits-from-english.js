var originalDigits = function(s) {
    const charFrequency = new Array(26).fill(0);

    for (const c of s) {
        charFrequency[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    const digitCount = new Array(10).fill(0);

    // 첫 번째 단계: 고유한 문자로 숫자 계산
    digitCount[0] = charFrequency['z'.charCodeAt(0) - 'a'.charCodeAt(0)];
    digitCount[2] = charFrequency['w'.charCodeAt(0) - 'a'.charCodeAt(0)];
    digitCount[4] = charFrequency['u'.charCodeAt(0) - 'a'.charCodeAt(0)];
    digitCount[6] = charFrequency['x'.charCodeAt(0) - 'a'.charCodeAt(0)];
    digitCount[8] = charFrequency['g'.charCodeAt(0) - 'a'.charCodeAt(0)];

    // 두 번째 단계: 앞에서 계산한 숫자를 이용
    digitCount[3] =
        charFrequency['h'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[8];

    digitCount[5] =
        charFrequency['f'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[4];

    digitCount[7] =
        charFrequency['s'.charCodeAt(0) - 'a'.charCodeAt(0)] - digitCount[6];

    // 세 번째 단계: 나머지 숫자 계산
    digitCount[1] =
        charFrequency['o'.charCodeAt(0) - 'a'.charCodeAt(0)] -
        digitCount[0] -
        digitCount[2] -
        digitCount[4];

    digitCount[9] =
        charFrequency['i'.charCodeAt(0) - 'a'.charCodeAt(0)] -
        digitCount[5] -
        digitCount[6] -
        digitCount[8];

    // 숫자를 오름차순으로 결과 문자열에 추가
    let result = '';

    for (let digit = 0; digit < 10; digit++) {
        for (let count = 0; count < digitCount[digit]; count++) {
            result += String(digit);
        }
    }

    return result;
};