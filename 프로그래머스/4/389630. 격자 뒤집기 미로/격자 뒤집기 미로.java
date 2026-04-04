import java.util.*;

class Solution {

    int height;
    int width;

    boolean is_odd;

    int dp_size;
    int[] dp_sum;
    int[] dp_min;
    int[][] dp_visible_sum;
    int[][] dp_hidden_sum;
    int[][] dp_visible_min;
    int[][] dp_hidden_min;

    public int solution(int[][] visible, int[][] hidden, int k) {    
        height = visible.length;
        width = visible[0].length;

        is_odd = ((height % 2) == 0 && (width % 2) == 0);

        dp_size = (int)Math.pow(2, height);
        dp_sum = new int[dp_size];
        dp_min = new int[dp_size];
        dp_visible_sum = new int[dp_size][width];
        dp_hidden_sum = new int[dp_size][width];
        dp_visible_min = new int[dp_size][width];
        dp_hidden_min = new int[dp_size][width];

        for(int n = 0; n < dp_size; n++) {
            dp_min[n] = 100;
            for(int i = 0; i < height; i++) {
                if((n & (1 << i)) > 0) {
                    dp_sum[n] = dp_sum[n] - k;
                }
                for(int j = 0; j < width; j++) {

                    if(i == 0) {
                        dp_visible_min[n][j] = 100;
                        dp_hidden_min[n][j] = 100;
                    }

                    if((n & (1 << i)) == 0) {
                        dp_sum[n] = dp_sum[n] + visible[i][j];
                        dp_visible_sum[n][j] =  dp_visible_sum[n][j] + visible[i][j];
                        dp_hidden_sum[n][j] =  dp_hidden_sum[n][j] + hidden[i][j];

                        if(((i % 2) == 0) ^ ((j % 2) == 0)) {
                            dp_visible_min[n][j] = Math.min(dp_visible_min[n][j], visible[i][j]);
                            dp_hidden_min[n][j] = Math.min(dp_hidden_min[n][j], hidden[i][j]);
                        }
                    } else {
                        dp_sum[n] = dp_sum[n] + hidden[i][j];
                        dp_visible_sum[n][j] =  dp_visible_sum[n][j] + hidden[i][j];
                        dp_hidden_sum[n][j] =  dp_hidden_sum[n][j] + visible[i][j];

                        if(((i % 2) == 0) ^ ((j % 2) == 0)) {
                            dp_visible_min[n][j] = Math.min(dp_visible_min[n][j], hidden[i][j]);
                            dp_hidden_min[n][j] = Math.min(dp_hidden_min[n][j], visible[i][j]);
                        }
                    }

                    dp_min[n] = Math.min(dp_min[n], dp_visible_min[n][j]);
                }
            }
        }

        int answer = 0;

        for(int n = 0; n < dp_size; n++) {

            boolean[] swap = new boolean[width];

            for(int i = 0; i < width; i++) {
                int min = 100;

                for(int j = 0; j < width; j++) {
                    if(i == j) {
                        min = Math.min(min, dp_hidden_min[n][j]);
                    } else if(swap[j]) {
                        min = Math.min(min, dp_hidden_min[n][j]);
                    } else {
                        min = Math.min(min, dp_visible_min[n][j]);
                    }
                }

                int sum1 = dp_sum[n];
                int sum2 = dp_sum[n] - dp_visible_sum[n][i] + dp_hidden_sum[n][i] - k;

                if(sum2 > sum1) {
                    swap[i] = true;
                    dp_sum[n] = sum2;
                    dp_min[n] = min;
                }
            }

            if(is_odd) {
                answer = Math.max(answer, dp_sum[n] - dp_min[n]);
            } else {
                answer = Math.max(answer, dp_sum[n]);
            }
        }

        return answer;
    }

}