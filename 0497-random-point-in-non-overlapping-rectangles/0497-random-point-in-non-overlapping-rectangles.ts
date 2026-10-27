class Solution {
    private s: number[];
    private rects: number[][];

    constructor(rects: number[][]) {
        const n = rects.length;
        this.rects = rects;
        this.s = new Array(n + 1).fill(0);

        for (let i = 0; i < n; i++) {
            const [x1, y1, x2, y2] = rects[i];

            this.s[i + 1] =
                this.s[i] + (x2 - x1 + 1) * (y2 - y1 + 1);
        }
    }

    pick(): number[] {
        const n = this.rects.length;
        const v = 1 + Math.floor(Math.random() * this.s[n]);

        let left = 0;
        let right = n;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (this.s[mid] >= v) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        const rect = this.rects[left - 1];
        const [x1, y1, x2, y2] = rect;

        return [
            x1 + Math.floor(Math.random() * (x2 - x1 + 1)),
            y1 + Math.floor(Math.random() * (y2 - y1 + 1))
        ];
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * const obj = new Solution(rects);
 * const param_1 = obj.pick();
 */