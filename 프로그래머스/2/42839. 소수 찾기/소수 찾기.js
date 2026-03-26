function solution(numbers) {
    const nums = numbers.split('');
    const numSet = new Set();
    
    function permute(current, used) {
        if (current.length > 0) {
            numSet.add(parseInt(current));  // 정수로 추가!
        }
        for (let i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                permute(current + nums[i], used);
                used[i] = false;
            }
        }
    }
    
    permute('', new Array(nums.length).fill(false));
    
    let count = 0;
    numSet.forEach(num => {
        if (isPrime(num)) count++;
    });
    return count;
}

function isPrime(num) {
    if (num < 2) return false;
    if (num === 2 || num === 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}
