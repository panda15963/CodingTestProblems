import java.util.*;

class Solution {
    static int[] bus;
    static ArrayList<Integer>[] crew;
    
    public String solution(int n, int t, int m, String[] timetable) {
        bus = new int[n];
        crew = new ArrayList[n];
        
        for(int i=0;i<n;i++)
            crew[i] = new ArrayList<>();
        
        bus[0] = 540;
        
        for(int i=1;i<n;i++)
            bus[i] = bus[i - 1] + t;
        
        Arrays.sort(timetable);
        
        for(String str : timetable) 
            findBus(strToInt(str), n, m);
        
        int ans = getAnswer(n, m);
        return intToStr(ans);
    }
    
    static int strToInt(String str) {
        StringTokenizer st = new StringTokenizer(str, ":");
        return Integer.parseInt(st.nextToken()) * 60 + Integer.parseInt(st.nextToken());
    }
    
    static String intToStr(int m) {
        StringBuilder sb = new StringBuilder();
        if(m / 60 < 10)
            sb.append('0');
        sb.append(m / 60);
        
        m %= 60;
        sb.append(':');
        
        if(m < 10)
            sb.append('0');
        sb.append(m);
        
        return sb.toString();
    }
    
    static void findBus(int min, int n, int m) {
        // 가장 늦은 버스보다 늦게 도착했다면 아무 버스도 타지 못함
    	if(bus[n - 1] < min)
            return;
        
    	// 버스 자리가 남아있고 크루 도착 시간이 버스 도착시간과 같거나 작다면 해당 버스 탑승
        for(int i=0;i<n;i++) {
        	if(bus[i] >= min && crew[i].size() < m) {
        		crew[i].add(min);
        		break;
        	}
        }

    }
    
    static int getAnswer(int n, int m) {
    	// 마지막 버스의 자리가 비어있다면 버스 출발 시간에 도착
        if(crew[n - 1].size() < m)
            return bus[n - 1];
        
        // 마지막 버스가 다 찼다면 가장 늦게 탑승한 크루보다 1분 일찍 도착
        return crew[n - 1].get(m - 1) - 1;
    }

}