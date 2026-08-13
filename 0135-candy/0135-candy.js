/**
 * Distributes the minimum number of candies to children based on ratings.
 * Each child must receive at least one candy.
 * A child with a higher rating than a neighboring child
 * must receive more candies.
 *
 * @param {number[]} ratings
 * @returns {number}
 */
function candy(ratings) {
    const n = ratings.length;

    // 왼쪽에서 오른쪽으로 확인
    const leftToRight = new Array(n).fill(1);

    // 오른쪽에서 왼쪽으로 확인
    const rightToLeft = new Array(n).fill(1);

    // 왼쪽 이웃보다 평점이 높으면 사탕을 하나 더 준다.
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            leftToRight[i] = leftToRight[i - 1] + 1;
        }
    }

    // 오른쪽 이웃보다 평점이 높으면 사탕을 하나 더 준다.
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            rightToLeft[i] = rightToLeft[i + 1] + 1;
        }
    }

    // 두 조건을 모두 만족하기 위해 큰 값을 선택
    let totalCandies = 0;

    for (let i = 0; i < n; i++) {
        totalCandies += Math.max(leftToRight[i], rightToLeft[i]);
    }

    return totalCandies;
}