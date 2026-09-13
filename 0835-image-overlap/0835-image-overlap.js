/**
 * Finds the largest overlap between two binary images after translation
 *
 * @param {number[][]} img1 - First binary image
 * @param {number[][]} img2 - Second binary image
 * @returns {number} Maximum number of overlapping 1s
 */
function largestOverlap(img1, img2) {
    const imageSize = img1.length;

    // Translation vector와 overlap 개수를 저장
    // Key: row_offset * 200 + col_offset
    // Value: overlap count
    const translationCountMap = new Map();

    let maxOverlap = 0;

    // img1의 모든 1 위치 확인
    for (let row1 = 0; row1 < imageSize; ++row1) {
        for (let col1 = 0; col1 < imageSize; ++col1) {

            if (img1[row1][col1] === 1) {

                // img2의 모든 1 위치와 비교
                for (let row2 = 0; row2 < imageSize; ++row2) {
                    for (let col2 = 0; col2 < imageSize; ++col2) {

                        if (img2[row2][col2] === 1) {

                            // Translation vector 계산
                            const translationKey =
                                (row1 - row2) * 200 + (col1 - col2);

                            // 해당 translation의 overlap 개수 증가
                            const currentCount =
                                (translationCountMap.get(translationKey) || 0) + 1;

                            translationCountMap.set(
                                translationKey,
                                currentCount
                            );

                            // 최대 overlap 갱신
                            maxOverlap = Math.max(
                                maxOverlap,
                                currentCount
                            );
                        }
                    }
                }
            }
        }
    }

    return maxOverlap;
}