import java.util.*;

class Solution {
    public int mirrorDistance(int n) {

        return Math.abs(n - Integer.parseInt(new StringBuffer(String.valueOf(n)).reverse().toString()));
    }
}