var addStrings = function(num1, num2) {
    const len1 = num1.length - 1, len2 = num2.length - 1;
    const max = Math.max(num1.length, num2.length);
    let carry = 0, answer = "";
    
    for (let i = 0; i < max; i++) {
        const sum = carry + parseInt(num1[len1 - i] || 0) + parseInt(num2[len2 - i] || 0);
        carry = Math.floor(sum / 10);
        answer = sum % 10 + answer;
    }
    if (carry > 0) answer = carry + answer; // "1" + "9" = "10"
    return answer;
};