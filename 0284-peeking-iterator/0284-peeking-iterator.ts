/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation.
 *
 * interface Iterator {
 *     next(): number;
 *     hasNext(): boolean;
 * }
 */

/**
 * @param iterator
 */
class PeekingIterator {
    private iterator: Iterator;
    private hasPeeked: boolean;
    private peekedElement: number;

    constructor(iterator: Iterator) {
        this.iterator = iterator;
        this.hasPeeked = false;
        this.peekedElement = 0;
    }

    /**
     * @return {number}
     */
    peek(): number {
        // 아직 peek하지 않았다면 다음 값을 미리 저장
        if (!this.hasPeeked) {
            this.peekedElement = this.iterator.next();
            this.hasPeeked = true;
        }

        return this.peekedElement;
    }

    /**
     * @return {number}
     */
    next(): number {
        // peek한 값이 없다면 iterator에서 바로 가져옴
        if (!this.hasPeeked) {
            return this.iterator.next();
        }

        // 저장된 peek 값을 반환
        this.hasPeeked = false;
        return this.peekedElement;
    }

    /**
     * @return {boolean}
     */
    hasNext(): boolean {
        // peek한 값이 있거나 iterator에 다음 값이 있으면 true
        return this.hasPeeked || this.iterator.hasNext();
    }
}