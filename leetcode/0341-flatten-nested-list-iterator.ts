/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation.
 * class NestedInteger {
 *     constructor(value?: number) {}
 *     isInteger(): boolean {}
 *     getInteger(): number | null {}
 *     setInteger(value: number) {}
 *     add(elem: NestedInteger) {}
 *     getList(): NestedInteger[] {}
 * }
 */

/**
 * @param nestedList
 */
class NestedIterator {
    private flattenedNumbers: number[] = [];
    private currentIndex: number = -1;

    constructor(nestedList: NestedInteger[]) {
        this.flattenedNumbers = [];
        this.currentIndex = -1;

        this.depthFirstSearch(nestedList);
    }

    private depthFirstSearch(list: NestedInteger[]): void {
        for (const element of list) {
            if (element.isInteger()) {
                this.flattenedNumbers.push(element.getInteger()!);
            } else {
                this.depthFirstSearch(element.getList());
            }
        }
    }

    /**
     * @return {boolean}
     */
    hasNext(): boolean {
        return this.currentIndex + 1 < this.flattenedNumbers.length;
    }

    /**
     * @return {number}
     */
    next(): number {
        return this.flattenedNumbers[++this.currentIndex];
    }
}