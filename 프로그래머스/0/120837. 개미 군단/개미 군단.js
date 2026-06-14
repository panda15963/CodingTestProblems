function solution(hp) {
    const army = [5, 3, 1];  // 순회할 요소(개미 각각의 hp)를 배열로 만든다.
    let count = 0;  // 개미의 수를 셀 것이므로 count를 선언

    for (let i = 0; i < army.length; i++) {
        count += Math.floor(hp / army[i]);  // 하나씩 순회하면서 나온 몫이 개미의 수(count)에 더해짐 
        hp %= army[i]; // hp를 나머지로 계속 업데이트 
    }
    return count;
}