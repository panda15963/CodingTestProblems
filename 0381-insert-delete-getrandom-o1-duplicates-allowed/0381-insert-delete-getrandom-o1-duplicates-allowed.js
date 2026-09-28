var RandomizedCollection = function() {
    this.valueToIndices = new Map();
    this.valuesList = [];
};

RandomizedCollection.prototype.insert = function(val) {
    if (!this.valueToIndices.has(val)) {
        this.valueToIndices.set(val, new Set());
    }

    const indicesSet = this.valueToIndices.get(val);
    const isFirst = indicesSet.size === 0;

    indicesSet.add(this.valuesList.length);
    this.valuesList.push(val);

    return isFirst;
};

RandomizedCollection.prototype.remove = function(val) {
    if (!this.valueToIndices.has(val)) {
        return false;
    }

    const indicesSet = this.valueToIndices.get(val);
    const indexToRemove = indicesSet.values().next().value;

    const lastIndex = this.valuesList.length - 1;
    const lastValue = this.valuesList[lastIndex];

    this.valuesList[indexToRemove] = lastValue;

    indicesSet.delete(indexToRemove);

    if (indexToRemove < lastIndex) {
        const lastValueIndicesSet =
            this.valueToIndices.get(lastValue);

        lastValueIndicesSet.delete(lastIndex);
        lastValueIndicesSet.add(indexToRemove);
    }

    if (indicesSet.size === 0) {
        this.valueToIndices.delete(val);
    }

    this.valuesList.pop();

    return true;
};

RandomizedCollection.prototype.getRandom = function() {
    const randomIndex = Math.floor(
        Math.random() * this.valuesList.length
    );

    return this.valuesList[randomIndex];
};