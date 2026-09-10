/**
 * Converts a number to its English words representation
 * @param {number} num
 * @returns {string}
 */
function numberToWords(num) {
    // Special case for zero
    if (num === 0) return 'Zero';

    /**
     * Helper function to convert numbers to words recursively
     * @param {number} x
     * @returns {string}
     */
    const convertToWords = (x) => {
        // Dictionary for numbers 0-19
        const onesAndTeens = [
            '',
            'One',
            'Two',
            'Three',
            'Four',
            'Five',
            'Six',
            'Seven',
            'Eight',
            'Nine',
            'Ten',
            'Eleven',
            'Twelve',
            'Thirteen',
            'Fourteen',
            'Fifteen',
            'Sixteen',
            'Seventeen',
            'Eighteen',
            'Nineteen'
        ];

        // Dictionary for tens
        const tens = [
            '',
            '',
            'Twenty',
            'Thirty',
            'Forty',
            'Fifty',
            'Sixty',
            'Seventy',
            'Eighty',
            'Ninety'
        ];

        let result = '';

        // 0-19
        if (x <= 19) {
            result = onesAndTeens[x];
        }
        // 20-99
        else if (x < 100) {
            const tensDigit = Math.floor(x / 10);
            const onesDigit = x % 10;

            result = `${tens[tensDigit]} ${convertToWords(onesDigit)}`;
        }
        // 100-999
        else if (x < 1000) {
            const hundreds = Math.floor(x / 100);
            const remainder = x % 100;

            result = `${onesAndTeens[hundreds]} Hundred ${convertToWords(remainder)}`;
        }
        // 1,000-999,999
        else if (x < 1000000) {
            const thousands = Math.floor(x / 1000);
            const remainder = x % 1000;

            result = `${convertToWords(thousands)} Thousand ${convertToWords(remainder)}`;
        }
        // 1,000,000-999,999,999
        else if (x < 1000000000) {
            const millions = Math.floor(x / 1000000);
            const remainder = x % 1000000;

            result = `${convertToWords(millions)} Million ${convertToWords(remainder)}`;
        }
        // 1,000,000,000+
        else {
            const billions = Math.floor(x / 1000000000);
            const remainder = x % 1000000000;

            result = `${convertToWords(billions)} Billion ${convertToWords(remainder)}`;
        }

        return result.trim();
    };

    return convertToWords(num);
}