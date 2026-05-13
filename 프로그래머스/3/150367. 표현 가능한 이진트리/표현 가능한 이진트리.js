function solution(numbers) {
    return numbers.map(num => {
        let binary = num.toString(2);
        let len = binary.length;
        
        // 1. 포화 이진트리 크기 찾기 (2^n - 1)
        let h = 0;
        while (Math.pow(2, h) - 1 < len) h++;
        let perfectLen = Math.pow(2, h) - 1;
        
        // 2. 앞에 0 채우기
        binary = "0".repeat(perfectLen - len) + binary;
        
        // 3. 재귀 검증
        return isValid(binary) ? 1 : 0;
    });
}

function isValid(bin) {
    if (bin.length === 1 || !bin.includes('1')) return true;
    
    let mid = Math.floor(bin.length / 2);
    let root = bin[mid];
    
    let left = bin.substring(0, mid);
    let right = bin.substring(mid + 1);
    
    // 루트가 0인데 자식에 1이 있으면 표현 불가능
    if (root === '0' && (left.includes('1') || right.includes('1'))) return false;
    
    return isValid(left) && isValid(right);
}
