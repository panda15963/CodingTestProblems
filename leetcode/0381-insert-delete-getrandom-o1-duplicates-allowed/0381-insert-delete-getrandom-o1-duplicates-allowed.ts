class RandomizedCollection {
    private valueToIndices: Map<number, Set<number>>;
    private valuesList: number[];

    constructor() {
        this.valueToIndices = new Map();
        this.valuesList = [];
    }

    insert(val: number): boolean {
        if (!this.valueToIndices.has(val)) {
            this.valueToIndices.set(val, new Set());
        }

        const indicesSet = this.valueToIndices.get(val)!;
        const isFirst = indicesSet.size === 0;

        indicesSet.add(this.valuesList.length);
        this.valuesList.push(val);

        return isFirst;
    }

    remove(val: number): boolean {
        if (!this.valueToIndices.has(val)) {
            return false;
        }

        const indicesSet = this.valueToIndices.get(val)!;
        const indexToRemove = indicesSet.values().next().value!;
        const lastIndex = this.valuesList.length - 1;
        const lastValue = this.valuesList[lastIndex];

        this.valuesList[indexToRemove] = lastValue;

        indicesSet.delete(indexToRemove);

        if (indexToRemove < lastIndex) {
            const lastValueIndicesSet =
                this.valueToIndices.get(lastValue)!;

            lastValueIndicesSet.delete(lastIndex);
            lastValueIndicesSet.add(indexToRemove);
        }

        if (indicesSet.size === 0) {
            this.valueToIndices.delete(val);
        }

        this.valuesList.pop();

        return true;
    }

    getRandom(): number {
        const randomIndex = Math.floor(
            Math.random() * this.valuesList.length
        );

        return this.valuesList[randomIndex];
    }
}