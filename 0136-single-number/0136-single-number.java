class Solution {
    public int singleNumber(int[] nums) {
        HashSet<Integer> set = new HashSet<>();
        for(int x : nums){
            if(set.contains(x))set.remove(x);
            else set.add(x);
        }
        int a ;
        for(int i : set)
            return i;
        return -1;
    }
}