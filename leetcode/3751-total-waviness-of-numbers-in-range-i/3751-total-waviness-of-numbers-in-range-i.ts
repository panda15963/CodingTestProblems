function totalWaviness(num1: number, num2: number): number {
    let totalSum = 0;

    for (let i = num1; i <= num2; i++) {
        totalSum += getWaviness(i);
    }

    return totalSum;
}

function getWaviness(num: number): number {
    const digits: number[] = [];
    
    // Extract digits of the number
    let temp = num;
    while (temp > 0) {
        digits.push(temp % 10);
        temp = Math.floor(temp / 10);
    }
    
    // Numbers with fewer than 3 digits have 0 waviness
    if (digits.length < 3) {
        return 0;
    }
    
    // Reverse because digits were extracted from last to first
    digits.reverse();
    
    let wavinessCount = 0;
    
    // Check internal digits for peaks and valleys
    for (let i = 1; i < digits.length - 1; i++) {
        const current = digits[i];
        const prev = digits[i - 1];
        const next = digits[i + 1];
        
        // Peak condition: strictly greater than both neighbors
        if (current > prev && current > next) {
            wavinessCount++;
        } 
        // Valley condition: strictly less than both neighbors
        else if (current < prev && current < next) {
            wavinessCount++;
        }
    }
    
    return wavinessCount;
}
