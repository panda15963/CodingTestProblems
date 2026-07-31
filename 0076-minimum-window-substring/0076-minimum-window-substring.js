/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
    // t가 s보다 길면 불가능
    if (t.length > s.length) {
        return "";
    }

    // 필요한 문자와 개수 저장
    const target = new Map();

    for (const c of t) {
        target.set(c, (target.get(c) || 0) + 1);
    }

    let minSub = s;
    let left = 0;
    let right = 0;
    let count = t.length;
    let found = false;

    while (right < s.length) {
        const end = s[right];

        if (target.has(end)) {
            target.set(end, target.get(end) - 1);

            if (target.get(end) >= 0) {
                count--;
            }
        }

        right++;

        if (count > 0) {
            continue;
        }

        found = true;

        while (count === 0) {
            const start = s[left];

            if (target.has(start)) {
                target.set(start, target.get(start) + 1);

                if (target.get(start) > 0) {
                    count++;
                }
            }

            left++;
        }

        if (right - (left - 1) < minSub.length) {
            minSub = s.substring(left - 1, right);
        }
    }

    return found ? minSub : "";
}