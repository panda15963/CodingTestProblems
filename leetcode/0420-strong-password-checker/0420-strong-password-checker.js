var strongPasswordChecker = function(password) {
    const n = password.length;

    let hasLower = 0;
    let hasUpper = 0;
    let hasDigit = 0;

    for (const ch of password) {
        if (ch >= 'a' && ch <= 'z') hasLower = 1;
        else if (ch >= 'A' && ch <= 'Z') hasUpper = 1;
        else if (ch >= '0' && ch <= '9') hasDigit = 1;
    }

    const missingTypes = 3 - hasLower - hasUpper - hasDigit;

    // Case 1: Password is too short
    if (n < 6) {
        return Math.max(6 - n, missingTypes);
    }

    // Count repeating sequences
    let replacements = 0;
    const sequences = [0, 0, 0];

    for (let i = 0; i < n;) {
        let j = i;

        while (j < n && password[j] === password[i]) {
            j++;
        }

        const len = j - i;

        if (len >= 3) {
            replacements += Math.floor(len / 3);
            sequences[len % 3]++;
        }

        i = j;
    }

    // Case 2: Password length is valid
    if (n <= 20) {
        return Math.max(replacements, missingTypes);
    }

    // Case 3: Password is too long
    let deletions = n - 20;

    // First, delete one character from sequences where len % 3 === 0
    let use = Math.min(deletions, sequences[0]);
    replacements -= use;
    deletions -= use;

    // Then, delete two characters from sequences where len % 3 === 1
    use = Math.min(deletions, sequences[1] * 2);
    replacements -= Math.floor(use / 2);
    deletions -= use;

    // Finally, every three deletions can reduce one replacement
    use = Math.min(deletions, replacements * 3);
    replacements -= Math.floor(use / 3);

    return (n - 20) + Math.max(replacements, missingTypes);
};