class MinStack {
    private stack: number[];
    private minStack: number[];

    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val: number): void {
        this.stack.push(val);

        if (
            this.minStack.length === 0 ||
            this.minStack[this.minStack.length - 1] >= val
        ) {
            this.minStack.push(val);
        }
    }

    pop(): void {
        const temp: number | undefined = this.stack.pop();

        if (temp === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}