/**
 * @param s
 * @param t
 * @returns
 */
function minWindow(s: string, t: string): string {
    // t가 s보다 길면 불가능
    if (t.length > s.length) {
        return "";
    }

    // 필요한 문자와 개수 저장
    const target: Map<string, number> = new Map();

    for (const c of t) {
        target.set(c, (target.get(c) ?? 0) + 1);
    }

    let minSub: string = s;
    let left: number = 0;
    let right: number = 0;
    let count: number = t.length;
    let found: boolean = false;

    while (right < s.length) {
        const end: string = s[right];

        if (target.has(end)) {
            target.set(end, target.get(end)! - 1);

            if (target.get(end)! >= 0) {
                count--;
            }
        }

        right++;

        if (count > 0) {
            continue;
        }

        found = true;

        while (count === 0) {
            const start: string = s[left];

            if (target.has(start)) {
                target.set(start, target.get(start)! + 1);

                if (target.get(start)! > 0) {
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