function solution(numer1, denom1, numer2, denom2) {
    let numer = numer1 * denom2 + numer2 * denom1;
    let denom = denom1 * denom2;
    
    let gcd = (a, b) => b ? gcd(b, a % b) : a;
    let g = gcd(numer, denom);
    
    return [numer / g, denom / g];
}
