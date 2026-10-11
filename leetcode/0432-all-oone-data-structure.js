var Node = function(key = "", count = 0) {
    this.prev = null;
    this.next = null;
    this.count = count;
    this.keys = new Set();

    if (key !== "") {
        this.keys.add(key);
    }
};

Node.prototype.insertAfter = function(node) {
    node.prev = this;
    node.next = this.next;

    if (this.next) {
        this.next.prev = node;
    }

    this.next = node;
    return node;
};

Node.prototype.removeFromList = function() {
    if (this.prev) {
        this.prev.next = this.next;
    }

    if (this.next) {
        this.next.prev = this.prev;
    }
};

var AllOne = function() {
    this.sentinel = new Node();
    this.sentinel.next = this.sentinel;
    this.sentinel.prev = this.sentinel;

    this.keyToNodeMap = new Map();
};

AllOne.prototype.inc = function(key) {
    if (!this.keyToNodeMap.has(key)) {
        const firstNode = this.sentinel.next;

        if (
            firstNode === this.sentinel ||
            firstNode.count > 1
        ) {
            const newNode = new Node(key, 1);

            this.keyToNodeMap.set(
                key,
                this.sentinel.insertAfter(newNode)
            );
        } else {
            firstNode.keys.add(key);
            this.keyToNodeMap.set(key, firstNode);
        }

        return;
    }

    const currentNode = this.keyToNodeMap.get(key);
    const nextNode = currentNode.next;
    const newCount = currentNode.count + 1;

    if (
        nextNode === this.sentinel ||
        nextNode.count > newCount
    ) {
        const newNode = new Node(key, newCount);

        this.keyToNodeMap.set(
            key,
            currentNode.insertAfter(newNode)
        );
    } else {
        nextNode.keys.add(key);
        this.keyToNodeMap.set(key, nextNode);
    }

    currentNode.keys.delete(key);

    if (currentNode.keys.size === 0) {
        currentNode.removeFromList();
    }
};

AllOne.prototype.dec = function(key) {
    const currentNode = this.keyToNodeMap.get(key);

    if (currentNode.count === 1) {
        this.keyToNodeMap.delete(key);
    } else {
        const previousNode = currentNode.prev;
        const newCount = currentNode.count - 1;

        if (
            previousNode === this.sentinel ||
            previousNode.count < newCount
        ) {
            const newNode = new Node(key, newCount);

            this.keyToNodeMap.set(
                key,
                previousNode.insertAfter(newNode)
            );
        } else {
            previousNode.keys.add(key);
            this.keyToNodeMap.set(key, previousNode);
        }
    }

    currentNode.keys.delete(key);

    if (currentNode.keys.size === 0) {
        currentNode.removeFromList();
    }
};

AllOne.prototype.getMaxKey = function() {
    if (this.sentinel.prev === this.sentinel) {
        return "";
    }

    return this.sentinel.prev.keys.values().next().value;
};

AllOne.prototype.getMinKey = function() {
    if (this.sentinel.next === this.sentinel) {
        return "";
    }

    return this.sentinel.next.keys.values().next().value;
};