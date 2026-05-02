import java.math.BigInteger;

class Solution {
    static int[][] g;
    static int[] d_;
    static int w;
    static int h;
    int[][] path;

    public int[][] matMul(int[][] mat1, int[][] mat2) {
        int[][] result = new int[w*h][w*h];

        for(int i = 0; i < w*h; i++) {
            for(int j = 0; j < w*h; j++) {
                BigInteger sum = new BigInteger("0");
                for(int n = 0; n < w*h; n++) {
                    sum = sum.add(BigInteger.valueOf(mat1[i][n]).multiply(BigInteger.valueOf(mat2[n][j])));
                    sum = sum.remainder(BigInteger.valueOf(1000000007));
                }

                result[i][j] = sum.intValue();
            }
        }

        return result;
    }


    public int[][] matPower(int[][] mat, int k) {
        int[][] result = new int[w*h][w*h];
        for(int i = 0; i < w*h; i++) result[i][i] = 1;

        while(k > 0) {
            if(k % 2 == 1) {
                k--;
                result = matMul(result, mat);
            } else {
                mat = matMul(mat, mat);
                k /= 2;
            }
        }

        return result;
    }

    public void findPath(int nowX, int nowY) {
        int[] dx = {-1, 1, 0, 0};
        int[] dy = {0, 0, 1, -1};

        int[][][] dp = new int[h][w][d_.length+1];

        for(int k = 0; k < 4; k++) {
            int nx = nowX + dx[k];
            int ny = nowY + dy[k];
            if(nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
            if(g[ny][nx] - g[nowY][nowX] != d_[0]) continue;
            dp[ny][nx][1] += 1;
        }

        for(int i = 1; i < d_.length; i++) {
            for(int y = 0; y < h; y++) {
                for(int x = 0; x < w; x++) {
                    for(int k = 0; k < 4; k++) {
                        int nx = x + dx[k];
                        int ny = y + dy[k];
                        if(nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
                        if(g[ny][nx] - g[y][x] != d_[i]) continue;
                        dp[ny][nx][i+1] += dp[y][x][i];
                        dp[ny][nx][i+1] %= 1000000007;
                    }
                }
            }        
        }

        for(int y = 0; y < h; y++)
            for(int x = 0; x < w; x++)
                path[nowY*w + nowX][y*w + x] = dp[y][x][d_.length];

    }

    public int solution(int[][] grid, int[] d, int k) {
        g = grid;
        d_ = d;
        h = grid.length;
        w = grid[0].length;
        path = new int[w*h][w*h];

        for(int y = 0; y < h; y++)
            for(int x = 0; x < w; x++) 
                findPath(x, y);

        int[][] mat = matPower(path, k);

        int answer = 0;

        for(int i = 0; i < w*h; i++) {
            for(int j = 0; j < w*h; j++) {
                answer += mat[i][j];
                answer %= 1000000007;
            }
        }

        return answer;
    }
}
