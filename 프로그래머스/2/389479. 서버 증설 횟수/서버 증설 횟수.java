class Solution {

    public int solution(int[] players, int m, int k) {
        int answer = 0;
        int n = 0;
        
        int[] server = new int[24]; // 시간대별 서버의 수 
        
        for(int i=0; i<24; i++){
            
            if(players[i] / m > server[i])
            {
                int adding = (players[i] / m) - server[i];
                answer+= adding;
                
                for(int j=i; j<i+k; j++){
                    if(j < 24) server[j]+= adding;
                } 
            }
        }
        
        return answer;
    }
}