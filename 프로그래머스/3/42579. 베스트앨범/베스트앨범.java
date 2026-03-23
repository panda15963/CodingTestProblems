import java.util.*;

class Solution {
    public int[] solution(String[] genres, int[] plays) {
        HashMap<String, Integer> genreTotal = new HashMap<>();
        HashMap<String, List<int[]>> genreSongs = new HashMap<>();
        
        // 장르별 총합과 노래 목록
        for (int i = 0; i < genres.length; i++) {
            String g = genres[i];
            genreTotal.put(g, genreTotal.getOrDefault(g, 0) + plays[i]);
            genreSongs.computeIfAbsent(g, k -> new ArrayList<>()).add(new int[]{plays[i], i});
        }
        
        // 장르 총합 내림차순 정렬
        List<String> sortedGenres = new ArrayList<>(genreTotal.keySet());
        sortedGenres.sort((a, b) -> genreTotal.get(b).compareTo(genreTotal.get(a)));
        
        List<Integer> answer = new ArrayList<>();
        for (String g : sortedGenres) {
            // 각 장르 내 정렬: 재생수 내림차순, 인덱스 오름차순
            List<int[]> songs = genreSongs.get(g);
            songs.sort((a, b) -> a[0] == b[0] ? a[1] - b[1] : b[0] - a[0]);
            answer.add(songs.get(0)[1]);
            if (songs.size() > 1) answer.add(songs.get(1)[1]);
        }
        
        return answer.stream().mapToInt(i -> i).toArray();
    }
}
