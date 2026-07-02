import java.util.*;

class Solution {
    public String[] solution(String[] s) {
        String[] answer = new String[s.length];
        for(int i = 0; i < s.length; i++){
            String numbers = s[i];
            answer[i] = changeNumbers(numbers);
        }
        return answer;
    }
    
    // 숫자를 바꾸는 로직 함수
    public String changeNumbers(String numbers){
    	// 애초에 110을 찾을 수 없다면 원래 숫자를 반환
        if(!numbers.contains("110")) return numbers;
        
        Stack<Character> s = new Stack<>();
        // 문자열을 붙여야하기 때문에 StringBuilder 사용
        StringBuilder sb = new StringBuilder();
        int count = stackAndFind(s,numbers);
        int idx = s.size(); // 가장 마지막 0 뒤에 넣기 위해 인덱스를 찾음
        boolean flag = false;
        
        while(!s.isEmpty()){
            char cnt = s.pop();
            if(!flag){
                if(cnt == '0'){
                    flag = true;
                }
                else{
                    idx--;
                }
            }
            sb.append(cnt);
        }
        sb.reverse(); // 스택에 남아있는걸 꺼내주고 뒤집어줘야함
        
        // 110의 개수만큼 idx 뒤에 붙임
        for(int i = 0; i < count; i++){
            sb.insert(idx,"110");
        }
        return sb.toString();
    }
    
    // 스택을 쌓고, 110의 개수를 구함
    public int stackAndFind(Stack<Character> s, String numbers){
        int count = 0; // 개수
        
         // 순차 탐색
        for(int i = 0; i < numbers.length(); i++){
            char third = numbers.charAt(i);
            
            // 스택에 들어있는게 2개 미만이라면 넣기만함
            if(s.size() < 2){
                s.push(third);
            }
            else{
            	// 스택에서 2개를 꺼냄
                char second = s.pop();
                char first = s.pop();
                
                 // 110 쌍인지 확인하여 맞으면 count+1
                if(first == '1' && second == '1' && third == '0'){
                    count++;
                }
                else{
                	// 아니라면 다시 넣음
                    s.push(first);
                    s.push(second);
                    s.push(third);
                }
            }
        }
        return count;
    }
}