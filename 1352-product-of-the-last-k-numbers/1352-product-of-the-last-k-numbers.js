/**
 * @param {number} num
 * @return {void}
 */
var ProductOfNumbers = function() {
    this.cumulativeProducts = [1];
};

/**
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) {
        // 0을 만나면 누적 곱 배열 초기화
        this.cumulativeProducts = [1];
    } else {
        const currentLength = this.cumulativeProducts.length;

        this.cumulativeProducts.push(
            this.cumulativeProducts[currentLength - 1] * num
        );
    }
};

/**
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function(k) {
    const currentLength = this.cumulativeProducts.length;

    // 마지막 k개 숫자에 0이 포함된 경우
    if (k >= currentLength) {
        return 0;
    }

    // 누적 곱의 나눗셈으로 최근 k개 숫자의 곱 계산
    return (
        this.cumulativeProducts[currentLength - 1] /
        this.cumulativeProducts[currentLength - k - 1]
    );
};