var palindromePairs = function(words) {
    const map = new Map();
    const result = [];

    // word -> index
    for (let i = 0; i < words.length; i++) {
        map.set(words[i], i);
    }

    // Check whether s[left...right] is palindrome
    function isPalindrome(s, left, right) {
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const n = word.length;

        for (let j = 0; j <= n; j++) {
            /*
             * Case 1
             *
             * word[j...n-1] is palindrome.
             *
             * We need:
             *
             * reverse(word[0...j-1]) + word
             *
             * to be a palindrome.
             */
            if (isPalindrome(word, j, n - 1)) {
                const left = word.substring(0, j);
                const reversed = left.split('').reverse().join('');

                if (map.has(reversed)) {
                    const index = map.get(reversed);

                    if (index !== i) {
                        result.push([i, index]);
                    }
                }
            }

            /*
             * Case 2
             *
             * word[0...j-1] is palindrome.
             *
             * We need:
             *
             * word + reverse(word[j...n-1])
             *
             * to be a palindrome.
             *
             * j === 0 is excluded because it would duplicate
             * the empty-string case from Case 1.
             */
            if (j > 0 && isPalindrome(word, 0, j - 1)) {
                const right = word.substring(j);
                const reversed = right.split('').reverse().join('');

                if (map.has(reversed)) {
                    const index = map.get(reversed);

                    if (index !== i) {
                        result.push([index, i]);
                    }
                }
            }
        }
    }

    return result;
};