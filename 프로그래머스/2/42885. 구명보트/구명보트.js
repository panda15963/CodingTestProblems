function solution(people, limit) {
    // 몸무게 오름차순 정렬
    people.sort((a, b) => a - b);

    let left = 0;
    let right = people.length - 1;
    let boatCount = 0;

    while (left <= right) {
        // 가장 가벼운 사람과 가장 무거운 사람이 함께 탈 수 있는 경우
        if (people[left] + people[right] <= limit) {
            left++;
        }

        // 가장 무거운 사람은 항상 탑승
        right--;
        boatCount++;
    }

    return boatCount;
}