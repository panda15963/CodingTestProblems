class LFUNode {
    key: number;
    value: number;
    freq: number;
    prev: LFUNode | null = null;
    next: LFUNode | null = null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
        this.freq = 1;
    }
}

class LFUDoublyLinkedList {
    head: LFUNode;
    tail: LFUNode;

    constructor() {
        this.head = new LFUNode(-1, -1);
        this.tail = new LFUNode(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addFirst(node: LFUNode): void {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    remove(node: LFUNode): LFUNode {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
        node.prev = null;
        node.next = null;
        return node;
    }

    removeLast(): LFUNode {
        return this.remove(this.tail.prev!);
    }

    isEmpty(): boolean {
        return this.head.next === this.tail;
    }
}

class LFUCache {
    private map: Map<number, LFUNode>;
    private freqMap: Map<number, LFUDoublyLinkedList>;
    private capacity: number;
    private minFreq: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map<number, LFUNode>();
        this.freqMap = new Map<number, LFUDoublyLinkedList>();
        this.minFreq = 0;
    }

    get(key: number): number {
        if (this.capacity === 0 || !this.map.has(key)) {
            return -1;
        }

        const node = this.map.get(key)!;
        this.incrFreq(node);
        return node.value;
    }

    put(key: number, value: number): void {
        if (this.capacity === 0) {
            return;
        }

        if (this.map.has(key)) {
            const node = this.map.get(key)!;
            node.value = value;
            this.incrFreq(node);
            return;
        }

        if (this.map.size === this.capacity) {
            const list = this.freqMap.get(this.minFreq)!;
            const removed = list.removeLast();
            this.map.delete(removed.key);
        }

        const node = new LFUNode(key, value);
        this.map.set(key, node);
        this.addNode(node);
        this.minFreq = 1;
    }

    private incrFreq(node: LFUNode): void {
        const freq = node.freq;
        const list = this.freqMap.get(freq)!;

        list.remove(node);

        if (list.isEmpty()) {
            this.freqMap.delete(freq);

            if (freq === this.minFreq) {
                this.minFreq++;
            }
        }

        node.freq++;
        this.addNode(node);
    }

    private addNode(node: LFUNode): void {
        const freq = node.freq;

        if (!this.freqMap.has(freq)) {
            this.freqMap.set(freq, new LFUDoublyLinkedList());
        }

        this.freqMap.get(freq)!.addFirst(node);
    }
}