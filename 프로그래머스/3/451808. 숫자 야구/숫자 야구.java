import java.util.*;

public class Solution {

    // n: 최대 시도 횟수, submit: 정수를 넣으면 "xS yB"를 반환하는 함수형 인터페이스라고 가정
    @FunctionalInterface
    public interface Submitter {
        String submit(int guess);
    }

    public int solution(int n, Submitter submit) {
        List<int[]> candidates = new ArrayList<>();

        // 후보 생성: 1~9 서로 다른 4자리
        for (int a = 1; a <= 9; a++) {
            for (int b = 1; b <= 9; b++) if (b != a) {
                for (int c = 1; c <= 9; c++) if (c != a && c != b) {
                    for (int d = 1; d <= 9; d++) if (d != a && d != b && d != c) {
                        candidates.add(new int[]{a, b, c, d});
                    }
                }
            }
        }

        for (int t = 0; t < n; t++) {
            int[] guessArr = (candidates.size() == 1)
                    ? candidates.get(0)
                    : pickGuess(candidates);

            int guessNum = toNumber(guessArr);
            String hint = submit.submit(guessNum);
            int[] sb = parseHint(hint);
            int st = sb[0], ba = sb[1];

            if (st == 4) return guessNum;

            List<int[]> next = new ArrayList<>();
            for (int[] s : candidates) {
                int[] r = score(guessArr, s);
                if (r[0] == st && r[1] == ba) next.add(s);
            }
            candidates = next;
        }

        // 이론상 도달 X (n이 충분하다고 가정)
        return toNumber(candidates.get(0));
    }

    private int[] score(int[] guess, int[] secret) {
        int strike = 0, ball = 0;
        for (int i = 0; i < 4; i++) {
            if (guess[i] == secret[i]) strike++;
            else {
                for (int j = 0; j < 4; j++) {
                    if (i != j && guess[i] == secret[j]) {
                        ball++;
                        break;
                    }
                }
            }
        }
        return new int[]{strike, ball};
    }

    private int[] parseHint(String hint) {
        String[] parts = hint.split(" ");
        int s = Integer.parseInt(parts[0].substring(0, parts[0].length() - 1)); // "xS"
        int b = Integer.parseInt(parts[1].substring(0, parts[1].length() - 1)); // "yB"
        return new int[]{s, b};
    }

    private int toNumber(int[] arr) {
        return arr[0] * 1000 + arr[1] * 100 + arr[2] * 10 + arr[3];
    }

    // minimax로 다음 guess 선택
    private int[] pickGuess(List<int[]> candidates) {
        if (candidates.size() <= 2) return candidates.get(0);

        int[] best = candidates.get(0);
        int bestWorst = Integer.MAX_VALUE;

        // 필요하면 전체 공간(3024)까지 pool 확장 가능
        List<int[]> pool = candidates;

        for (int[] g : pool) {
            Map<String, Integer> buckets = new HashMap<>();
            for (int[] s : candidates) {
                int[] r = score(g, s);
                String key = r[0] + "," + r[1];
                buckets.put(key, buckets.getOrDefault(key, 0) + 1);
            }
            int worst = 0;
            for (int cnt : buckets.values()) {
                worst = Math.max(worst, cnt);
            }
            if (worst < bestWorst) {
                bestWorst = worst;
                best = g;
            }
        }
        return best;
    }
}
