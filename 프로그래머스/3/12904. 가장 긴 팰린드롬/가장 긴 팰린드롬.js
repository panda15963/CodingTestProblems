function solution(s) {
    for (let leng = s.length; leng > 1; leng--) {
        for (let start = 0; start + leng <= s.length; start++) {
            let check = true;

            for (let i = 0; i < leng / 2; i++) {
                if (s[start + i] !== s[start + leng - i - 1]) {
                    check = false;
                    break;
                }
            }

            if (check) return leng;
        }
    }

    return 1;
}