class Solution {
    public int findMinDifference(List<String> timePoints) {
        // If there are more than 1440 time points (24 * 60 minutes in a day),
        // by pigeonhole principle, at least two must be the same
        if (timePoints.size() > 1440) {
            return 0;
        }
      
        int n = timePoints.size();
        // Create array with size n+1 to store converted minutes and handle circular case
        int[] minutesArray = new int[n + 1];
      
        // Convert each time point from "HH:MM" format to total minutes
        for (int i = 0; i < n; i++) {
            String[] timeParts = timePoints.get(i).split(":");
            int hours = Integer.parseInt(timeParts[0]);
            int minutes = Integer.parseInt(timeParts[1]);
            minutesArray[i] = hours * 60 + minutes;
        }
      
        // Sort the time points in ascending order
        Arrays.sort(minutesArray, 0, n);
      
        // Add the first time point + 1440 minutes (24 hours) to handle circular difference
        // This helps calculate the difference between the last and first time point
        minutesArray[n] = minutesArray[0] + 1440;
      
        // Initialize minimum difference with a large value (2^30)
        int minDifference = 1 << 30;
      
        // Find the minimum difference between consecutive time points
        for (int i = 1; i <= n; i++) {
            int currentDifference = minutesArray[i] - minutesArray[i - 1];
            minDifference = Math.min(minDifference, currentDifference);
        }
      
        return minDifference;
    }
}
