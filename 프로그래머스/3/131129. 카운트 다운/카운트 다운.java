class Solution {
    
    int result1 = Integer.MAX_VALUE;
    int result2 = -1;
    
    public int[] solution(int target) {
        int temp = 0;
        while (target>600) {
            target -= 60;
            temp++;
        }
        dp(temp,0,target);
        
        int[] answer = new int[2];
        answer[0] = result1;
        answer[1] = result2;
        
        return answer;
    }
    
    public void dp(int count, int sf, int target) {
        
        if (target==0) {
            set(count,sf);
            return;
        }
        if (target<=60) {
            if (target<=20 || target==50) {
                set(count+1,sf+1);
                return;
            } else {
                for (int i=2; i<=3; i++) {
                    if (target%i==0 && target/i>=1 && target/i<=20) {
                        set(count+1,sf);
                        return;
                    }
                }
            }
            if (target>=41 && target<=49) set(count+2,sf+1);
            else set(count+2,sf+2);
            return;
        }
        dp(count+1,sf+1,target-50);
        dp(count+1,sf,target-60);
        
    }
    
    public void set(int count, int sf) {
        
        if (count==result1 && sf>result2) result2 = sf;
        else if (count<result1) {
            result1 = count;
            result2 = sf;
        }
        
    }
}