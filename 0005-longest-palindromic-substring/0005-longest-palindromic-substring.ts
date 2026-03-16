function longestPalindrome(s: string): string {

    let start = 0
    let end = 0

    const expand = (l: number, r: number): number => {

        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--
            r++
        }

        return r - l - 1
    }

    for (let i = 0; i < s.length; i++) {

        const len1 = expand(i, i)
        const len2 = expand(i, i + 1)

        const len = Math.max(len1, len2)

        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2)
            end = i + Math.floor(len / 2)
        }
    }

    return s.substring(start, end + 1)
}