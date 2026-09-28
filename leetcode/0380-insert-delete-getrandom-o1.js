var RandomizedSet = function() {
    this.map = new Map();
    this.list = [];
};

RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) {
        return false;
    }

    this.map.set(val, this.list.length);
    this.list.push(val);

    return true;
};

RandomizedSet.prototype.remove = function(val) {
    if (!this.map.has(val)) {
        return false;
    }

    const removedIndex = this.map.get(val);
    const lastIndex = this.list.length - 1;
    const lastVal = this.list[lastIndex];

    this.list[removedIndex] = lastVal;
    this.map.set(lastVal, removedIndex);

    this.list.pop();
    this.map.delete(val);

    return true;
};

RandomizedSet.prototype.getRandom = function() {
    const randomIndex = Math.floor(Math.random() * this.list.length);
    return this.list[randomIndex];
};