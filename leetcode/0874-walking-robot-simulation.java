import java.util.*;

public class Solution {
    public int robotSim(int[] commands, int[][] obstacles) {
        Set<String> obstaclesSet = new HashSet<>();
        for (int[] obs : obstacles) {
            obstaclesSet.add(obs[0] + "," + obs[1]);
        }
        
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}}; // N, E, S, W
        int dirIdx = 0;
        int x = 0, y = 0;
        int maxDist = 0;
        
        for (int cmd : commands) {
            if (cmd == -1) {
                dirIdx = (dirIdx + 1) % 4;
            } else if (cmd == -2) {
                dirIdx = (dirIdx + 4 - 1) % 4;
            } else {
                int dx = directions[dirIdx][0];
                int dy = directions[dirIdx][1];
                for (int i = 0; i < cmd; i++) {
                    int nx = x + dx;
                    int ny = y + dy;
                    if (obstaclesSet.contains(nx + "," + ny)) {
                        break;
                    }
                    x = nx;
                    y = ny;
                    maxDist = Math.max(maxDist, x * x + y * y);
                }
            }
        }
        return maxDist;
    }
}