function solution(word) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    let count = 0;
    let answer = 0;

    function dfs(current) {
        if (current === word) {
            answer = count;
            return;
        }

        if (current.length === 5) return;

        for (let i = 0; i < vowels.length; i++) {
            count++;
            dfs(current + vowels[i]);
            if (answer !== 0) return;
        }
    }

    dfs("");
    return answer;
}