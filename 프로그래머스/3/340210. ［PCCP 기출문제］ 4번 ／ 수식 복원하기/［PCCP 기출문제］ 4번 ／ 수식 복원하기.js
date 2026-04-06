function solution(expressions) {
  const o = [];
  const x = [];

  expressions.forEach((exp) => {
    const splited = exp.split(" ");
    const [num1, op, num2, _, num3] = splited;

    if (num3 === 'X') {
      x.push(splited);
      return;
    }

    if (op === '-') {
      splited[0] = num3;
      splited[1] = '+';
      splited[4] = num1;
    }

    o.push(splited);
  });

  let base = 0;
  let candidate = 2;

  o.forEach((exp) => {
    const [num1, op, num2, _, num3] = exp;

    let i = num1.length - 1;
    let j = num2.length - 1;
    let k = num3.length - 1;
    for (; i >= 0 && j >= 0; i--, j--, k--) {
      const a = Number(num1[i]);
      const b = Number(num2[j]);
      const c = Number(num3[k]);

      if (a + b > c) {
        base = Math.max(base, a + b - c); // 현재 base보다 작은 값 무시
      } else {
        candidate = Math.max(candidate, a + 1, b + 1, c + 1);
      }
    }
  });

  x.forEach((exp) =>
            exp
            .filter((str) => /^\d+$/.test(str))
            .forEach((num) => {
    for (let digit of num) {
      candidate = Math.max(candidate, Number(digit) + 1);
    }
  })
           );

  if (candidate === 9) {
    base = 9;
  }

  return x.map((exp) => {
    const [num1, op, num2] = exp;
    const sign = op === '+' ? 1 : -1;

    if (base != 0) {
      exp[4] = (parseInt(num1, base) + parseInt(num2, base) * sign).toString(base);
      return exp.join(" ");
    }

    let i = num1.length - 1;
    let j = num2.length - 1;
    for (; i >= 0 && j >= 0; i--, j--) {
      const a = Number(num1[i]);
      const b = Number(num2[j]);
      const isPossible = sign > 0
        ? a + b < candidate
        : a - b >= 0;
      
      if (!isPossible) {
        exp[4] = '?';
        return exp.join(" ");
      }
    }
    exp[4] = (parseInt(num1) + parseInt(num2) * sign).toString();
    return exp.join(" ");
  });
}