/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function(score) {
    const athleteCount = score.length;

    // Create an array of original indices
    const indices = Array.from(
        { length: athleteCount },
        (_, index) => index
    );

    // Sort indices by score in descending order
    indices.sort((indexA, indexB) => {
        return score[indexB] - score[indexA];
    });

    // Medal names for the top 3 athletes
    const medalNames = [
        'Gold Medal',
        'Silver Medal',
        'Bronze Medal'
    ];

    const ranks = new Array(athleteCount);

    // Assign ranks
    for (let position = 0; position < athleteCount; position++) {
        const originalIndex = indices[position];

        if (position < 3) {
            ranks[originalIndex] = medalNames[position];
        } else {
            ranks[originalIndex] = String(position + 1);
        }
    }

    return ranks;
};