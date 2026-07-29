/**
 * @param {number[]} nums
 * @return {void}
 */
function sortColors(nums) {
    let red = 0;
    let white = 0;
    let blue = 0;

    for (const num of nums) {
        switch (num) {
            case 0:
                red++;
                break;
            case 1:
                white++;
                break;
            case 2:
                blue++;
                break;
        }
    }

    for (let i = 0; i < red; i++) {
        nums[i] = 0;
    }

    for (let i = red; i < red + white; i++) {
        nums[i] = 1;
    }

    for (let i = red + white; i < red + white + blue; i++) {
        nums[i] = 2;
    }
}