function solution(chicken) {
    let service = 0;
    let coupon = chicken;
    while (coupon >= 10) {
        service += Math.floor(coupon / 10);
        coupon = coupon % 10 + Math.floor(coupon / 10);
    }
    return service;
}
