/**
 * Calculates the maximum number of ice cream bars that can be purchased with given coins
 * @param {number[]} costs - Array of ice cream bar prices
 * @param {number} coins - Total amount of money available
 * @returns {number} Maximum number of ice cream bars that can be purchased
 */
function maxIceCream(costs, coins) {
    // Sort the costs array in ascending order
    costs.sort((a, b) => a - b);

    const totalIceCreams = costs.length;

    for (let i = 0; i < totalIceCreams; i++) {
        if (coins < costs[i]) {
            return i;
        }

        coins -= costs[i];
    }

    return totalIceCreams;
}