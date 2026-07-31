class Solution {
    public String minWindow(String s, String t) {
        // 타겟이 되는 t문자열의 길이가 s문자열의 길이보다 큰 경우 정답이 존재할 수 없음
        // 바로 빈 문자열을 return
        if(t.length() > s.length()) return "";
        
        // 필요한 문자와 개수를 저장할 Map
        Map<Character, Integer> target = new HashMap<>();
        // 필요한 모든 문자와 개수를 Map에 저장
        for(int i = 0; i < t.length(); i++) {
            Character c = t.charAt(i);
            target.put(c, target.getOrDefault(c, 0) + 1);
        }
        
        // 최소 부분 문자열
        String minSub = s;
        // 탐색중인 범위의 왼쪽 인덱스
        int left = 0;
        // 탐색중인 범위의 오른쪽 인덱스
        int right = 0;
        // 필요한 문자의 총 개수
        int count = t.length();
        // 타겟 문자를 모두 포함한 부분문자열이 존재하는지 여부
        boolean find = false;
        
        // 문자열의 끝까지 탐색할 때 까지 반복
        while(right < s.length()) {
            // 오른쪽 인덱스의 문자 탐색
            Character end = s.charAt(right);
            // 필요한 문자인 경우
            if(target.containsKey(end)) {
                // target에서 해당 문자의 카운트 감소
                target.put(end, target.get(end) - 1);
                // 필요한 문자의 총 개수 감소
                if(target.get(end) >= 0) count--;
            }
            
            // 필요한 문자의 총 개수가 남아있으면 필요한 모든 문자를 포함할 때 까지 오른쪽 인덱스를 증가시키며 재탐색
            right++;
            if(count > 0) continue;
            
            // 필요한 문자를 모두 포함한 경우
            // 정답이 될 수 있는 부분 문자열 존재 여부 업데이트
            find = true;
            
            // 필요한 문자의 개수가 다시 0보다 커질 때 까지 왼쪽 인덱스를 증가시키며 범위를 감소시킴
            while(count == 0) {
                // 왼쪽 인덱스의 문자 탐색
                Character start = s.charAt(left);
                // 필요한 문자인 경우
                if(target.containsKey(start)) {
                    // target에서 해당 문자의 카운트 증가
                    target.put(start, target.get(start) + 1);
                    // 필요한 문자의 총 개수 증가
                    if(target.get(start) > 0) count++;
                }
                
                // 왼쪽 인덱스 증가
                left++;
            }
            
            // 현재 탐색 범위가 최소 부분문자열 길이보다 작은 경우
            if(right - (left - 1) < minSub.length()) {
                // 현재 탐색범위의 문자열을 최소 부분문자열로 저장
                minSub = s.substring(left - 1, right);
            }
            
        }
        
        // 정답이 되는 부분 문자열을 찾은 경우 최소 부분문자열을 return
        // 찾지 못한 경우 빈 문자열을 return
        return find ? minSub : "";
    }
}