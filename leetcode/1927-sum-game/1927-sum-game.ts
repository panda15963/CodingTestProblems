/**
 * Determines if Alice wins the sum game.
 * Alice and Bob take turns replacing '?' with digits (0-9).
 * Alice goes first. Bob wins if both halves have equal sums, Alice wins otherwise.
 * 
 * @param num - String containing digits and '?' characters with even length
 * @returns true if Alice wins, false if Bob wins
 */
function sumGame(num: string): boolean {
    const length = num.length;
  
    // Variables for the first half of the string
    let questionMarksInFirstHalf = 0;
    let sumOfDigitsInFirstHalf = 0;
  
    // Variables for the second half of the string
    let questionMarksInSecondHalf = 0;
    let sumOfDigitsInSecondHalf = 0;
  
    // Process the first half of the string
    for (let i = 0; i < length >> 1; i++) {
        if (num[i] === '?') {
            questionMarksInFirstHalf++;
        } else {
            // Convert character digit to numeric value and add to sum
            sumOfDigitsInFirstHalf += num[i].charCodeAt(0) - '0'.charCodeAt(0);
        }
    }
  
    // Process the second half of the string
    for (let i = length >> 1; i < length; i++) {
        if (num[i] === '?') {
            questionMarksInSecondHalf++;
        } else {
            // Convert character digit to numeric value and add to sum
            sumOfDigitsInSecondHalf += num[i].charCodeAt(0) - '0'.charCodeAt(0);
        }
    }
  
    // Alice wins if:
    // 1. Total question marks is odd (Alice gets the last move)
    // 2. The difference in sums cannot be balanced by the difference in question marks
    //    (Each question mark can contribute 0-9, average is 4.5, so optimal play gives 9/2 per mark)
    const totalQuestionMarks = questionMarksInFirstHalf + questionMarksInSecondHalf;
    const sumDifference = sumOfDigitsInFirstHalf - sumOfDigitsInSecondHalf;
    const questionMarkDifference = questionMarksInSecondHalf - questionMarksInFirstHalf;
  
    return totalQuestionMarks % 2 === 1 || 2 * sumDifference !== 9 * questionMarkDifference;
}
