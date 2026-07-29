import java.util.*;

class Solution {
    private static final int MAX = 1_000_001;

    public String smallestPalindrome(String s, int k) {
        Map<Character, Integer> count = new HashMap<>();

        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }

        if (!isPalindromePossible(count)) {
            return "";
        }

        HalfResult result = getHalfCountAndMidLetter(count);
        int[] halfCount = result.halfCount;
        String midLetter = result.midLetter;

        int totalPerm = calculateTotalPermutations(halfCount);
        if (k > totalPerm) {
            return "";
        }

        List<Character> leftHalf = generateLeftHalf(halfCount, k);

        StringBuilder ans = new StringBuilder();

        for (char c : leftHalf) {
            ans.append(c);
        }

        ans.append(midLetter);

        for (int i = leftHalf.size() - 1; i >= 0; i--) {
            ans.append(leftHalf.get(i));
        }

        return ans.toString();
    }

    private boolean isPalindromePossible(Map<Character, Integer> count) {
        int oddCount = 0;

        for (int freq : count.values()) {
            if ((freq & 1) == 1) {
                oddCount++;
            }
        }

        return oddCount <= 1;
    }

    private HalfResult getHalfCountAndMidLetter(Map<Character, Integer> count) {
        int[] halfCount = new int[26];
        String midLetter = "";

        for (Map.Entry<Character, Integer> entry : count.entrySet()) {
            char c = entry.getKey();
            int freq = entry.getValue();

            halfCount[c - 'a'] = freq / 2;

            if ((freq & 1) == 1) {
                midLetter = String.valueOf(c);
            }
        }

        return new HalfResult(halfCount, midLetter);
    }

    private int calculateTotalPermutations(int[] halfCount) {
        return countArrangements(halfCount);
    }

    private List<Character> generateLeftHalf(int[] halfCount, int k) {
        int halfLen = 0;
        for (int freq : halfCount) {
            halfLen += freq;
        }

        List<Character> left = new ArrayList<>();

        for (int pos = 0; pos < halfLen; pos++) {
            for (int i = 0; i < 26; i++) {
                if (halfCount[i] == 0) {
                    continue;
                }

                halfCount[i]--;

                int arrangements = countArrangements(halfCount);

                if (arrangements >= k) {
                    left.add((char) ('a' + i));
                    break;
                } else {
                    k -= arrangements;
                    halfCount[i]++;
                }
            }
        }

        return left;
    }

    private int countArrangements(int[] count) {
        int total = 0;

        for (int x : count) {
            total += x;
        }

        long res = 1;

        for (int freq : count) {
            res *= nCk(total, freq);

            if (res >= MAX) {
                return MAX;
            }

            total -= freq;
        }

        return (int) res;
    }

    private int nCk(int n, int k) {
        long res = 1;

        int limit = Math.min(k, n - k);

        for (int i = 1; i <= limit; i++) {
            res = res * (n - i + 1) / i;

            if (res >= MAX) {
                return MAX;
            }
        }

        return (int) res;
    }

    private static class HalfResult {
        int[] halfCount;
        String midLetter;

        HalfResult(int[] halfCount, String midLetter) {
            this.halfCount = halfCount;
            this.midLetter = midLetter;
        }
    }
}