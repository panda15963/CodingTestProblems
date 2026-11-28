class MyCircularDeque {
    private vals: number[];
    private length: number;
    private size: number;
    private start: number;
    private end: number;

    constructor(k: number) {
        this.vals = new Array(k).fill(0);
        this.length = 0;
        this.size = k;
        this.start = 0;
        this.end = 0;
    }

    insertFront(value: number): boolean {
        if (this.isFull()) {
            return false;
        }

        if (this.start === 0) {
            this.start = this.size - 1;
        } else {
            this.start--;
        }

        this.vals[this.start] = value;
        this.length++;
        return true;
    }

    insertLast(value: number): boolean {
        if (this.isFull()) {
            return false;
        }

        this.vals[this.end] = value;
        this.length++;

        if (this.end + 1 === this.size) {
            this.end = 0;
        } else {
            this.end++;
        }

        return true;
    }

    deleteFront(): boolean {
        if (this.isEmpty()) {
            return false;
        }

        if (this.start + 1 === this.size) {
            this.start = 0;
        } else {
            this.start++;
        }

        this.length--;
        return true;
    }

    deleteLast(): boolean {
        if (this.isEmpty()) {
            return false;
        }

        if (this.end === 0) {
            this.end = this.size - 1;
        } else {
            this.end--;
        }

        this.length--;
        return true;
    }

    getFront(): number {
        if (this.isEmpty()) {
            return -1;
        }

        return this.vals[this.start];
    }

    getRear(): number {
        if (this.isEmpty()) {
            return -1;
        }

        if (this.end === 0) {
            return this.vals[this.size - 1];
        }

        return this.vals[this.end - 1];
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    isFull(): boolean {
        return this.length === this.size;
    }
}