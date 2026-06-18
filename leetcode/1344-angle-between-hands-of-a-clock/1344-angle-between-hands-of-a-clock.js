/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
var angleClock = function(hour, minutes) {
    // 시침 각도
    const hourHandAngle = 30 * hour + 0.5 * minutes;

    // 분침 각도
    const minuteHandAngle = 6 * minutes;

    // 각도 차이
    const angleDifference = Math.abs(hourHandAngle - minuteHandAngle);

    // 더 작은 각도 반환
    return Math.min(angleDifference, 360 - angleDifference);
};