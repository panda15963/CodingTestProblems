function rotatedDigits(n) {
  const digitRotationMap = [0, 1, 5, -1, -1, 2, 9, -1, 8, 6];

  const isGoodNumber = (num) => {
    let rotatedNumber = 0;
    let tempNum = num;
    let placeValue = 1;

    while (tempNum > 0) {
      const currentDigit = tempNum % 10;

      if (digitRotationMap[currentDigit] === -1) {
        return false;
      }

      rotatedNumber = digitRotationMap[currentDigit] * placeValue + rotatedNumber;
      placeValue *= 10;
      tempNum = Math.floor(tempNum / 10);
    }

    return num !== rotatedNumber;
  };

  let count = 0;
  for (let i = 1; i <= n; i++) {
    if (isGoodNumber(i)) count++;
  }

  return count;
}