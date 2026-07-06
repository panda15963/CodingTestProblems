import java.util.*;

class Solution {

    public int solution(int cacheSize, String[] cities) {

        List<String> cache = new ArrayList<>();
        int time = 0;

        if (cacheSize == 0) {
            return cities.length * 5;
        }

        for (String city : cities) {

            city = city.toLowerCase();

            if (cache.contains(city)) { // Cache Hit

                cache.remove(city);
                cache.add(city);

                time += 1;

            } else { // Cache Miss

                if (cache.size() == cacheSize) {
                    cache.remove(0);
                }

                cache.add(city);

                time += 5;
            }
        }

        return time;
    }
}