function productExceptSelf(nums) {
    // 결과 배열
    const answer = new Array(nums.length).fill(1);

    // 앞쪽과 뒤쪽 누적 곱
    let prefixProduct = 1;
    let suffixProduct = 1;

    // 앞쪽 누적 곱 계산
    for (let i = 0; i < nums.length - 1; i++) {
        prefixProduct *= nums[i];
        answer[i + 1] = prefixProduct;
    }

    // 뒤쪽 누적 곱 계산
    for (let i = nums.length - 1; i > 0; i--) {
        suffixProduct *= nums[i];
        answer[i - 1] *= suffixProduct;
    }

    return answer;
}