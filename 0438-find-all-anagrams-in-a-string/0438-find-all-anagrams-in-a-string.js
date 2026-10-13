var findAnagrams = function(s, p) {
    const m = s.length;
    const n = p.length;
    const ans = [];

    if (m < n) {
        return ans;
    }

    const cnt1 = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        cnt1[p.charCodeAt(i) - 97]++;
    }

    const cnt2 = new Array(26).fill(0);
    for (let i = 0; i < n - 1; i++) {
        cnt2[s.charCodeAt(i) - 97]++;
    }

    for (let i = n - 1; i < m; i++) {
        cnt2[s.charCodeAt(i) - 97]++;

        if (cnt1.every((count, index) => count === cnt2[index])) {
            ans.push(i - n + 1);
        }

        cnt2[s.charCodeAt(i - n + 1) - 97]--;
    }

    return ans;
};