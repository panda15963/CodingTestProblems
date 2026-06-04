class Solution {
    public int[] solution(String myString) {
        // "x"를 기준으로 문자열을 나눔. limit 값을 -1로 주어 맨 뒤의 빈 문자열도 생략하지 않고 포함시킴
        String[] parts = myString.split("x", -1);
        
        int[] answer = new int[parts.length];
        
        // 각 나뉜 문자열의 길이를 answer 배열에 저장
        for (int i = 0; i < parts.length; i++) {
            answer[i] = parts[i].length();
        }
        
        return answer;
    }
}
