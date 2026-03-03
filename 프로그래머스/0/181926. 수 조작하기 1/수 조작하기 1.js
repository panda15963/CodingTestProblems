function solution(n, control) {
    for (let c of control) {
        if (c === 'w') n++;
        else if (c === 's') n--;
        else if (c === 'd') n += 10;
        else if (c === 'a') n -= 10;
    }
    return n;
}
