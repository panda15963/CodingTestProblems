function reverse(x: number): number {
  let result: number = 0;

  while (x !== 0) {
    const digit: number = x % 10;
    x = Math.trunc(x / 10);

    if (result > 214748364 || (result === 214748364 && digit > 7)) return 0;
    if (result < -214748364 || (result === -214748364 && digit < -8)) return 0;

    result = result * 10 + digit;
  }

  return result;
}