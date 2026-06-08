function solution(order) {
    let sum = 0;

    for (const o of order) {
        if (o.includes("americano") || o.includes("anything")) {
            sum += 4500;
        } else {
            sum += 5000;
        }
    }

    return sum;
}