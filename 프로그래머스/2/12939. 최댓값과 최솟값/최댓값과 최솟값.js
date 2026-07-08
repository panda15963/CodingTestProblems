function solution(s) {
    // 공백을 기준으로 나누고 숫자 배열로 변환
    const nums = s.split(" ").map(Number);

    // 오름차순 정렬
    nums.sort((a, b) => a - b);

    // "최솟값 최댓값" 형태로 반환
    return `${nums[0]} ${nums[nums.length - 1]}`;
}