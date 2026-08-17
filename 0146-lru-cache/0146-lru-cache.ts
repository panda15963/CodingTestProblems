class LRUCache {
    private cache: Map<number, number>;
    private capacity: number;

    /**
     * @param capacity - LRU Cache의 최대 용량
     */
    constructor(capacity: number) {
        this.cache = new Map<number, number>();
        this.capacity = capacity;
    }

    /**
     * @param key
     * @returns 해당 key의 value, 없으면 -1
     */
    get(key: number): number {
        if (!this.cache.has(key)) {
            return -1;
        }

        const value = this.cache.get(key)!;

        // 최근 사용된 key로 이동
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    /**
     * @param key
     * @param value
     */
    put(key: number, value: number): void {
        // 이미 존재하면 삭제 후 다시 추가
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        // 용량이 가득 찼다면 가장 오래된 key 제거
        else if (this.cache.size === this.capacity) {
            const firstKey = this.cache.keys().next().value;

            if (firstKey !== undefined) {
                this.cache.delete(firstKey);
            }
        }

        // 가장 최근에 사용된 위치에 추가
        this.cache.set(key, value);
    }
}