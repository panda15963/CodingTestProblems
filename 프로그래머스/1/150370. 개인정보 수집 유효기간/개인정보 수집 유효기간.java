import java.util.*;

class Solution {
    public int[] solution(String today, String[] terms, String[] privacies) {
        // 1. 오늘 날짜를 일수로 변환
        long totalToday = dateToDays(today);
        
        // 2. 약관 유효기간 Map
        Map<String, Integer> termMap = new HashMap<>();
        for (String term : terms) {
            String[] split = term.split(" ");
            termMap.put(split[0], Integer.parseInt(split[1]));
        }
        
        List<Integer> result = new ArrayList<>();
        
        // 3. 개인정보 유효기간 계산 및 비교
        for (int i = 0; i < privacies.length; i++) {
            String[] privacy = privacies[i].split(" ");
            long privacyDate = dateToDays(privacy[0]);
            int termMonth = termMap.get(privacy[1]);
            
            // 수집일 + 약관개월(28일 기준)
            if (privacyDate + (termMonth * 28) <= totalToday) {
                result.add(i + 1);
            }
        }
        
        return result.stream().mapToInt(Integer::intValue).toArray();
    }
    
    // YYYY.MM.DD 형식을 일수로 변환하는 함수
    private long dateToDays(String date) {
        String[] parts = date.split("\\.");
        int year = Integer.parseInt(parts[0]);
        int month = Integer.parseInt(parts[1]);
        int day = Integer.parseInt(parts[2]);
        return (year * 12 * 28) + (month * 28) + day;
    }
}
