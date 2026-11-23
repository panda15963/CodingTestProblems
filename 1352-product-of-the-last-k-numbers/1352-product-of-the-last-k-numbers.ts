class ProductOfNumbers {
    private cumulativeProducts: number[];

    constructor() {
        this.cumulativeProducts = [1];
    }

    add(num: number): void {
        if (num === 0) {
            // 0을 만나면 누적 곱 초기화
            this.cumulativeProducts = [1];
        } else {
            const currentLength = this.cumulativeProducts.length;

            this.cumulativeProducts.push(
                this.cumulativeProducts[currentLength - 1] * num
            );
        }
    }

    getProduct(k: number): number {
        const currentLength = this.cumulativeProducts.length;

        // 마지막 k개 숫자에 0이 포함된 경우
        if (k >= currentLength) {
            return 0;
        }

        return (
            this.cumulativeProducts[currentLength - 1] /
            this.cumulativeProducts[currentLength - k - 1]
        );
    }
}