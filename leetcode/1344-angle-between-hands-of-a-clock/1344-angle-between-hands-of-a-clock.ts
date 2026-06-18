/**
 * Calculate the angle between hour and minute hands on a clock
 * @param hour - The hour value (1-12)
 * @param minutes - The minutes value (0-59)
 * @returns The smaller angle in degrees between the two hands
 */
function angleClock(hour: number, minutes: number): number {
    // Calculate hour hand position in degrees
    // Hour hand moves 30° per hour (360°/12 hours)
    // Plus 0.5° per minute (30°/60 minutes)
    const hourHandAngle: number = 30 * hour + 0.5 * minutes;
  
    // Calculate minute hand position in degrees
    // Minute hand moves 6° per minute (360°/60 minutes)
    const minuteHandAngle: number = 6 * minutes;
  
    // Calculate the absolute difference between the two angles
    const angleDifference: number = Math.abs(hourHandAngle - minuteHandAngle);
  
    // Return the smaller angle between the two possible angles
    // (the direct angle or its complement to 360°)
    return Math.min(angleDifference, 360 - angleDifference);
}
