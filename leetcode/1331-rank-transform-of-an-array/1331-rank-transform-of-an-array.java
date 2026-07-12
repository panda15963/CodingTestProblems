class Solution {
    public int[] arrayRankTransform(int[] arr) {
        // Clone and sort the array to get unique sorted elements
        int[] sortedArr = arr.clone();
        Arrays.sort(sortedArr);
        
        Map<Integer, Integer> rankMap = new HashMap<>();
        for (int num : sortedArr) {
            rankMap.putIfAbsent(num, rankMap.size() + 1);
        }
        
        // Transform the original array
        int[] result = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            result[i] = rankMap.get(arr[i]);
        }
        
        return result;
    }
}
