function solution(n) {
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }
    
    return n / gcd(n, 6);
}