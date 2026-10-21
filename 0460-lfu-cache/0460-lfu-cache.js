var LFUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.freqMap = new Map();
    this.minFreq = 0;
};

LFUCache.prototype.get = function(key) {
    if (this.capacity === 0 || !this.map.has(key)) {
        return -1;
    }

    const node = this.map.get(key);
    this.incrFreq(node);
    return node.value;
};

LFUCache.prototype.put = function(key, value) {
    if (this.capacity === 0) {
        return;
    }

    if (this.map.has(key)) {
        const node = this.map.get(key);
        node.value = value;
        this.incrFreq(node);
        return;
    }

    if (this.map.size === this.capacity) {
        const list = this.freqMap.get(this.minFreq);
        const removed = list.removeLast();
        this.map.delete(removed.key);
    }

    const node = new LFUNode(key, value);
    this.addNode(node);
    this.map.set(key, node);
    this.minFreq = 1;
};

LFUCache.prototype.incrFreq = function(node) {
    const freq = node.freq;
    const list = this.freqMap.get(freq);

    list.remove(node);

    if (list.isEmpty()) {
        this.freqMap.delete(freq);

        if (freq === this.minFreq) {
            this.minFreq++;
        }
    }

    node.freq++;
    this.addNode(node);
};

LFUCache.prototype.addNode = function(node) {
    const freq = node.freq;

    if (!this.freqMap.has(freq)) {
        this.freqMap.set(freq, new DoublyLinkedList());
    }

    this.freqMap.get(freq).addFirst(node);
};

var LFUNode = function(key, value) {
    this.key = key;
    this.value = value;
    this.freq = 1;
    this.prev = null;
    this.next = null;
};

var DoublyLinkedList = function() {
    this.head = new LFUNode(-1, -1);
    this.tail = new LFUNode(-1, -1);

    this.head.next = this.tail;
    this.tail.prev = this.head;
};

DoublyLinkedList.prototype.addFirst = function(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
};

DoublyLinkedList.prototype.remove = function(node) {
    node.next.prev = node.prev;
    node.prev.next = node.next;
    node.next = null;
    node.prev = null;
    return node;
};

DoublyLinkedList.prototype.removeLast = function() {
    return this.remove(this.tail.prev);
};

DoublyLinkedList.prototype.isEmpty = function() {
    return this.head.next === this.tail;
};