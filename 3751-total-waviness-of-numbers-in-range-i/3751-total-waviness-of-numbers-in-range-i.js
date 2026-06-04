/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function(num1, num2) {
    // Helper function to calculate the waviness of a single number
    function getWaviness(x) {
        const digits = [];
        while (x > 0) {
            digits.push(x % 10);
            x = Math.floor(x / 10);
        }
        
        // Since we extracted digits via modulo, they are reversed.
        // Reversing them back places them in their original reading order.
        digits.reverse();
        
        let waviness = 0;
        const len = digits.length;
        
        // Numbers with fewer than 3 digits cannot have peaks or valleys
        if (len < 3) return 0;
        
        // Check every internal digit to see if it is a peak or a valley
        for (let i = 1; i < len - 1; i++) {
            const current = digits[i];
            const prev = digits[i - 1];
            const next = digits[i + 1];
            
            // Peak condition
            if (current > prev && current > next) {
                waviness++;
            } 
            // Valley condition
            else if (current < prev && current < next) {
                waviness++;
            }
        }
        
        return waviness;
    }

    let total = 0;
    // Iterate through every number in the inclusive range
    for (let i = num1; i <= num2; i++) {
        total += getWaviness(i);
    }
    
    return total;
};
