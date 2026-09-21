/**
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
    this.flattenedNumbers = [];
    this.currentIndex = -1;

    const depthFirstSearch = (list) => {
        for (const element of list) {
            if (element.isInteger()) {
                this.flattenedNumbers.push(element.getInteger());
            } else {
                depthFirstSearch(element.getList());
            }
        }
    };

    depthFirstSearch(nestedList);
};

/**
 * @return {boolean}
 */
NestedIterator.prototype.hasNext = function() {
    return this.currentIndex + 1 < this.flattenedNumbers.length;
};

/**
 * @return {number}
 */
NestedIterator.prototype.next = function() {
    return this.flattenedNumbers[++this.currentIndex];
};