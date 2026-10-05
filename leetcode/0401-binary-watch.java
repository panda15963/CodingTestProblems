class Solution {
    /**
     * Finds all possible times that can be displayed on a binary watch
     * when exactly 'turnedOn' LEDs are lit.
     * 
     * @param turnedOn The number of LEDs currently on
     * @return List of valid times in "H:MM" format
     */
    public List<String> readBinaryWatch(int turnedOn) {
        // List to store all valid time combinations
        List<String> result = new ArrayList<>();
      
        // Iterate through all possible hours (0-11)
        for (int hour = 0; hour < 12; hour++) {
            // Iterate through all possible minutes (0-59)
            for (int minute = 0; minute < 60; minute++) {
                // Count the number of set bits (1s) in binary representation
                // of both hour and minute values
                int totalBitsSet = Integer.bitCount(hour) + Integer.bitCount(minute);
              
                // If the total number of set bits equals the turned on LEDs,
                // this is a valid time combination
                if (totalBitsSet == turnedOn) {
                    // Format the time string with leading zero for minutes if needed
                    String timeString = String.format("%d:%02d", hour, minute);
                    result.add(timeString);
                }
            }
        }
      
        return result;
    }
}
