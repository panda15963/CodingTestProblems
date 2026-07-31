class Solution {
    public int removeDuplicates(int[] nums) {
        int idx = 1;
        int cnt = 1;
        for(int i=1;i<nums.length;i++){
        	// 원소가 같은 경우
            if(nums[i-1]==nums[i]){
            	// 카운트 증가
                cnt++;
                
                // 2개까지는 허용하므로 갱신 후 포인터 증가
                if(cnt<=2){
                    nums[idx++] = nums[i];
                }
            }else{
            
            	//원소가 다른 경우 카운트를 1로 초기화 후, 갱신
                cnt=1;
                nums[idx++] = nums[i];
            }
        }

        return idx;
    }
}