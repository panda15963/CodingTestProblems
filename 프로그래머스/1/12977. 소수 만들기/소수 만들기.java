import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MakePrimeNumber {
	public static void main(String[] args) {
		Solution s = new Solution();
		
		int[] nums1 = {1,2,3,4};
		System.out.println("result : " + s.solution(nums1));
		
		int[] nums2 = {1,2,7,6,4};
		System.out.println("result : " + s.solution(nums2));
	}
}

class Solution {
    public int solution(int[] nums) {
        int answer = 0;
        
        Arrays.sort(nums);
        int max = nums[nums.length-1] + nums[nums.length - 2] + nums[nums.length - 3];
        
        List<Boolean> list = new ArrayList<Boolean>();
        list.add(false); list.add(false);
        for (int i = 2; i <= max; i++) list.add(true);
        
        for (int i = 2; i*i <= max; i++) {
        	for (int j = i*i; j <= max; j += i) {
        		if(list.get(j)) list.set(j, false);
			}
		}
        
        for (int i = 0; i < nums.length; i++) {
			for (int j = i+1; j < nums.length; j++) {
				for (int k = j+1; k < nums.length; k++) {
					answer += list.get(nums[i] + nums[j] + nums[k]) ? 1 : 0;
				}
			}
		}

        return answer;
    }
}