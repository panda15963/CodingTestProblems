const FACTOR_COUNTS = {
  0: {},
  1: {},
  2: { 2: 1 },
  3: { 3: 1 },
  4: { 2: 2 },
  5: { 5: 1 },
  6: { 2: 1, 3: 1 },
  7: { 7: 1 },
  8: { 2: 3 },
  9: { 3: 2 }
};

function smallestNumber(num, t) {
  const [primeCount, isDivisible] = getPrimeCountT(t);

  if (!isDivisible) {
    return "-1";
  }

  const factorCount = getFactorCount(primeCount);

  if (sumValues(factorCount) > num.length) {
    return construct(factorCount);
  }

  let primeCountPrefix = getPrimeCountString(num);

  let firstZeroIndex = num.indexOf("0");

  if (firstZeroIndex === -1) {
    firstZeroIndex = num.length;

    if (isSubset(primeCount, primeCountPrefix)) {
      return num;
    }
  }

  for (let i = num.length - 1; i >= 0; i--) {
    const digit = Number(num[i]);

    primeCountPrefix = subtract(
      primeCountPrefix,
      FACTOR_COUNTS[digit]
    );

    const spaceAfterDigit = num.length - 1 - i;

    if (i > firstZeroIndex) {
      continue;
    }

    for (let biggerDigit = digit + 1; biggerDigit < 10; biggerDigit++) {
      const factorsAfterReplacement = getFactorCount(
        subtract(
          subtract(
            primeCount,
            primeCountPrefix
          ),
          FACTOR_COUNTS[biggerDigit]
        )
      );

      const requiredDigits = sumValues(factorsAfterReplacement);

      if (requiredDigits <= spaceAfterDigit) {
        const fillOnes = spaceAfterDigit - requiredDigits;

        return (
          num.slice(0, i) +
          String(biggerDigit) +
          "1".repeat(fillOnes) +
          construct(factorsAfterReplacement)
        );
      }
    }
  }

  const factorsAfterExtension = getFactorCount(primeCount);
  const requiredDigits = sumValues(factorsAfterExtension);

  return (
    "1".repeat(num.length + 1 - requiredDigits) +
    construct(factorsAfterExtension)
  );
}

function getPrimeCountT(t) {
  const count = {
    2: 0,
    3: 0,
    5: 0,
    7: 0
  };

  for (const prime of [2, 3, 5, 7]) {
    while (t % prime === 0) {
      t /= prime;
      count[prime]++;
    }
  }

  return [count, t === 1];
}

function getPrimeCountString(num) {
  const count = {
    2: 0,
    3: 0,
    5: 0,
    7: 0
  };

  for (const character of num) {
    const digit = Number(character);
    const factors = FACTOR_COUNTS[digit];

    for (const prime in factors) {
      count[prime] += factors[prime];
    }
  }

  return count;
}

function getFactorCount(count) {
  const count8 = Math.floor(count[2] / 3);
  const remaining2 = count[2] % 3;

  const count9 = Math.floor(count[3] / 2);
  let count3 = count[3] % 2;

  let count4 = Math.floor(remaining2 / 2);
  let count2 = remaining2 % 2;

  let count6 = 0;

  // 2 * 3 -> 6
  if (count2 === 1 && count3 === 1) {
    count2 = 0;
    count3 = 0;
    count6 = 1;
  }

  // 3 * 4 -> 2 * 6
  if (count3 === 1 && count4 === 1) {
    count2 = 1;
    count6 = 1;
    count3 = 0;
    count4 = 0;
  }

  return {
    2: count2,
    3: count3,
    4: count4,
    5: count[5],
    6: count6,
    7: count[7],
    8: count8,
    9: count9
  };
}

function construct(factors) {
  let result = "";

  for (let digit = 2; digit <= 9; digit++) {
    result += String(digit).repeat(factors[digit] || 0);
  }

  return result;
}

function isSubset(a, b) {
  for (const key in a) {
    if (b[key] < a[key]) {
      return false;
    }
  }

  return true;
}

function subtract(a, b) {
  const result = { ...a };

  for (const key in b) {
    result[key] = Math.max(
      0,
      (result[key] || 0) - b[key]
    );
  }

  return result;
}

function sumValues(object) {
  return Object.values(object).reduce(
    (sum, value) => sum + value,
    0
  );
}