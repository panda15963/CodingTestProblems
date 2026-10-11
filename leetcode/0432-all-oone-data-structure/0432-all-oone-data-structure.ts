class Node {
    prev: Node | null = null;
    next: Node | null = null;
    count: number;
    keys: Set<string>;

    constructor(key: string = "", count: number = 0) {
        this.count = count;
        this.keys = new Set<string>();

        if (key !== "") {
            this.keys.add(key);
        }
    }

    insertAfter(node: Node): Node {
        node.prev = this;
        node.next = this.next;

        if (this.next) {
            this.next.prev = node;
        }

        this.next = node;
        return node;
    }

    removeFromList(): void {
        if (this.prev) {
            this.prev.next = this.next;
        }

        if (this.next) {
            this.next.prev = this.prev;
        }
    }
}

class AllOne {
    private sentinel: Node;
    private keyToNodeMap: Map<string, Node>;

    constructor() {
        this.sentinel = new Node();
        this.sentinel.next = this.sentinel;
        this.sentinel.prev = this.sentinel;

        this.keyToNodeMap = new Map<string, Node>();
    }

    inc(key: string): void {
        if (!this.keyToNodeMap.has(key)) {
            const firstNode = this.sentinel.next!;

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

        const currentNode = this.keyToNodeMap.get(key)!;
        const nextNode = currentNode.next!;
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
    }

    dec(key: string): void {
        const currentNode = this.keyToNodeMap.get(key)!;

        if (currentNode.count === 1) {
            this.keyToNodeMap.delete(key);
        } else {
            const previousNode = currentNode.prev!;
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
    }

    getMaxKey(): string {
        if (this.sentinel.prev === this.sentinel) {
            return "";
        }

        return this.sentinel.prev!.keys.values().next().value!;
    }

    getMinKey(): string {
        if (this.sentinel.next === this.sentinel) {
            return "";
        }

        return this.sentinel.next!.keys.values().next().value!;
    }
}