class SummaryRanges {
    private intervals: Map<number, number[]>;

    constructor() {
        this.intervals = new Map();
    }

    addNum(value: number): void {
        const intervalStarts = Array.from(this.intervals.keys())
            .sort((a, b) => a - b);

        const rightIntervalIndex = intervalStarts.findIndex(
            start => start > value
        );

        const rightIntervalStart =
            rightIntervalIndex !== -1
                ? intervalStarts[rightIntervalIndex]
                : null;

        const leftIntervalIndex =
            rightIntervalIndex === -1
                ? intervalStarts.length - 1
                : rightIntervalIndex - 1;

        const leftIntervalStart =
            leftIntervalIndex >= 0
                ? intervalStarts[leftIntervalIndex]
                : null;

        const leftInterval =
            leftIntervalStart !== null
                ? this.intervals.get(leftIntervalStart)
                : null;

        const rightInterval =
            rightIntervalStart !== null
                ? this.intervals.get(rightIntervalStart)
                : null;

        // 두 interval을 연결
        if (
            leftInterval &&
            rightInterval &&
            leftInterval[1] + 1 === value &&
            rightInterval[0] - 1 === value
        ) {
            leftInterval[1] = rightInterval[1];
            this.intervals.delete(rightIntervalStart!);
        }

        // 왼쪽 interval 확장
        else if (
            leftInterval &&
            value <= leftInterval[1] + 1
        ) {
            leftInterval[1] = Math.max(
                value,
                leftInterval[1]
            );
        }

        // 오른쪽 interval 확장
        else if (
            rightInterval &&
            value >= rightInterval[0] - 1
        ) {
            const updatedInterval = [
                Math.min(value, rightInterval[0]),
                rightInterval[1]
            ];

            this.intervals.delete(rightIntervalStart!);
            this.intervals.set(
                updatedInterval[0],
                updatedInterval
            );
        }

        // 새로운 interval 생성
        else {
            this.intervals.set(value, [value, value]);
        }
    }

    getIntervals(): number[][] {
        const result: number[][] = [];

        const sortedKeys = Array.from(this.intervals.keys())
            .sort((a, b) => a - b);

        for (const key of sortedKeys) {
            result.push(this.intervals.get(key)!);
        }

        return result;
    }
}