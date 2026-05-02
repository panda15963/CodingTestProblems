import java.util.*;

class Solution {
    private int [] group;
    private int [] prev;
    private int [] next;
    private int [] same;
    private int nextGroup;
    private Map<Integer, Integer> headMap;

    public String[] solution(int n, int[][] queries) {
        nextGroup = n;
        group = new int[n];
        prev = new int[n];
        next = new int[n];
        same = new int[n];
        headMap = new HashMap<>();
        for (int i = 0; i < n; i++) {
            group[i] = i;
            prev[i] = i;
            next[i] = i;
            same[i] = -1;
            headMap.put(i, i);
        }
        List<String> checks = new ArrayList<>();
        for (int[] query : queries) {
            switch (query[0]) {
                case 1:
                    mergeGroup(query[1], query[2]);
                    break;
                case 2:
                    splitNewGroup(query[1], query[2]);
                    break;
                case 3:
                    if (checkSameGroup(query[1], query[2])) {
                        checks.add("Yes");
                    } else {
                        checks.add("No");
                    }
                    break;
            }
        }
        String[] answer = checks.toArray(String[]::new);
        return answer;
    }

    private int findTop(int x) {
        int i = x;
        while (same[i] != -1) {
            i = same[i];
        }
        // 경로 상의 모든 하위 노드를 top으로 직접 연결
        int j = x;
        while (same[j] != -1) {
            int n = same[j];
            same[j] = i;
            j = n;
        }
        return i;
    }

    private int findGroup(int x) {
        return group[findTop(x)];
    }

    private void mergeGroup(int to, int from) {
        int tg = findGroup(to);
        int fg = findGroup(from);
        if (tg != fg) {
            int fh = headMap.get(fg);
            while (next[fh] != fh) {
                downNext(fh);
            }
            headMap.remove(fg);

            int th = headMap.get(tg);
            int tt = prev[th];
            prev[fh] = tt;
            next[fh] = th;
            prev[th] = fh;
            next[tt] = fh;
            group[fh] = tg;
        }
    }

    private int downNext(int i) {
        int n = next[i];
        int nn = next[n];
        prev[n] = -1;
        next[n] = -1;
        same[n] = i;
        next[i] = nn;
        return n;
    }

    private boolean checkNext(int g, int pt, int nt) {
        int head = headMap.get(g);
        int i = next[pt];
        while (i != head && i != nt) {
            i = next[i];
        }
        return i != head;
    }

    private void splitNewGroup(int start, int end) {
        int st = findTop(start);
        int et = findTop(end);
        int g = group[st];
        if (st != et) {
            if (!checkNext(g, st, et)) {
                return;
            }
            while (downNext(st) != et);
        }
        if (headMap.get(g) == st) {
            if (next[st] == st) {
                headMap.remove(g);
            } else {
                headMap.put(g, next[st]);
                int n = next[st];
                int p = prev[st];
                next[p] = n;
                prev[n] = p;
            }
        } else {
            int n = next[st];
            int p = prev[st];
            next[p] = n;
            prev[n] = p;
        }
        group[st] = nextGroup;
        prev[st] = st;
        next[st] = st;
        same[st] = -1;
        headMap.put(nextGroup, st);
        nextGroup++;
    }

    private boolean checkSameGroup(int a, int b) {
        return findGroup(a) == findGroup(b);
    }
}