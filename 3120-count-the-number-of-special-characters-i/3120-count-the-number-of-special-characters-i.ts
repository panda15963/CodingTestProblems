function numberOfSpecialChars(word: string): number {
    const obj: Record<string, boolean> = {};
    const newWord = word.toLowerCase();

    for (let i = 0; i < word.length; i++) {
        if (!obj[newWord[i]]) {
            if (newWord[i] !== word[i]) {
                // 현재 문자가 대문자인 경우
                if (word.includes(newWord[i])) {
                    obj[newWord[i]] = true;
                }
            } else {
                // 현재 문자가 소문자인 경우
                if (word.includes(newWord[i].toUpperCase())) {
                    obj[newWord[i]] = true;
                }
            }
        }
    }

    return Object.values(obj).length;
}