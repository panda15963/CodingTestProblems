class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        // Create a frequency array to count occurrences of each element in nums1
        // Array size 1001 assumes elements range from 0 to 1000
        int[] frequencyCount = new int[1001];

        // Count the frequency of each element in nums1
        for (int element : nums1) {
            frequencyCount[element]++;
        }

        // List to store the intersection result
        List<Integer> intersectionResult = new ArrayList<>();

        // Iterate through nums2 and check if element exists in frequencyCount
        for (int element : nums2) {
            // If the element has remaining count in frequencyCount,
            // add it to result and decrement the count
            if (frequencyCount[element] > 0) {
                frequencyCount[element]--;
                intersectionResult.add(element);
            }
        }

        // Convert the ArrayList to int array and return
        return intersectionResult.stream()
                                .mapToInt(Integer::intValue)
                                .toArray();
    }
}
