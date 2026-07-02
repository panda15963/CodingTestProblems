import java.util.*;

class Solution {
    Map<Integer, Set<Integer>> connections;
    Map<Integer, Map<Integer, Integer>> returnWeights;
    Map<Integer, Map<Integer, Integer>> noreturnWeights;
    int maxnoreturn;

    public int solution(int[][] t) {
        maxnoreturn = 0;
        // 노드별 편도 최대 길이중 가장 큰거 선택하면 될듯
        // 왕복시 최대길이는 최대 깊이 - 자식들의 왕복시 최대길이 중 가장 큰것 + 1
        // 편도시 최대길이는 - 자식한놈의 왕복시 최대길이 + 다른자식의 편도시최대길이 합조합중 큰것 + 1?
        buildConnections(t);
        buildReturnWeights();
        buildNoReturnWeights();
//        int answer = 0;
//        for (Map.Entry<Integer, Map<Integer, Integer>> e : noreturnWeights.entrySet()) {
//            for (Integer nrw : e.getValue().values()) {
//                answer = Math.max(answer, nrw + 1);
//            }
//        }
        int answer = maxnoreturn + 1;
        return answer;
    }

    private void buildConnections(int[][] t) {
        connections = new HashMap<>();
        for (int [] e : t) {
            connections.computeIfAbsent(e[0], x -> new HashSet<>()).add(e[1]);
            connections.computeIfAbsent(e[1], x -> new HashSet<>()).add(e[0]);
        }
    }

    private void buildReturnWeights() {
        returnWeights = new HashMap<>();
        initReturnWeights();
        propagateReturnWeights();
        returnWeights.remove(-1);
        returnWeights.get(0).remove(-1);
    }

    private void initReturnWeights() {
        Stack<int[]> stack = new Stack<>();
        stack.push(new int[]{-1, 0});
        Set<Integer> wait = new HashSet<>();
        while (!stack.isEmpty()) {
            int[] top = stack.peek();
            int prev = top[0];
            int v = top[1];
            if (!wait.contains(v)) {
                for (Integer next : connections.get(v)) {
                    if (!Objects.equals(next, prev)) {
                        stack.add(new int[]{v, next});
                    }
                }
                wait.add(v);
            } else {
                int max = 0;
                for (Integer next : connections.get(v)) {
                    if (!Objects.equals(next, prev)) {
                        int w = returnWeights.get(v).get(next);
                        if (max < w) {
                            max = w;
                        }
                    }
                }
                returnWeights.computeIfAbsent(prev, x -> new HashMap<>()).put(v, max + 1);
                stack.pop();
                wait.remove(v);
            }
        }
    }

    private void propagateReturnWeights() {
        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{-1, 0});
        while (!queue.isEmpty()) {
            int[] first = queue.remove();
            int prev = first[0];
            int v = first[1];
            int[][] returnWeightPairs = getReturnWeightPairs(v);
            for (Integer next : connections.get(v)) {
                if (!Objects.equals(next, prev)) {
                    int w = filterAndGetMaxReturnWeight(returnWeightPairs, next);
                    returnWeights.computeIfAbsent(next, x -> new HashMap<>()).put(v, w + 1);
                    queue.add(new int[]{v, next});
                }
            }
        }
    }

    private int [][] getReturnWeightPairs(int v) {
        Map<Integer, Integer> m = returnWeights.get(v);
        int[][] nextWeights = m.entrySet().stream().map(e -> new int[]{e.getKey(), e.getValue()}).toArray(int[][]::new);
        Arrays.sort(nextWeights, (a, b) -> b[1] - a[1]);
        return nextWeights;
    }

    private int filterAndGetMaxReturnWeight(int [][] pairs, int ... vs) {
        for (int [] pair : pairs) {
            boolean pass = true;
            for (int v : vs) {
                if (pair[0] == v) {
                    pass = false;
                    break;
                }
            }
            if (pass) {
                return pair[1];
            }
        }
        return 0;
    }

    private int [] filterAndGetMaxPair(int [][] pairs, int ... vs) {
        for (int [] pair : pairs) {
            boolean pass = true;
            for (int v : vs) {
                if (pair[0] == v) {
                    pass = false;
                    break;
                }
            }
            if (pass) {
                return pair;
            }
        }
        return null;
    }

    private void buildNoReturnWeights() {
        noreturnWeights = new HashMap<>();
        initNoReturnWeights();
        propagateNoReturnWeights();
        noreturnWeights.remove(-1);
        noreturnWeights.get(0).remove(-1);
    }

    private void initNoReturnWeights() {
        Stack<int[]> stack = new Stack<>();
        stack.push(new int[]{-1, 0});
        Set<Integer> wait = new HashSet<>();
        while (!stack.isEmpty()) {
            int[] top = stack.peek();
            int prev = top[0];
            int v = top[1];
            if (!wait.contains(v)) {
                for (Integer next : connections.get(v)) {
                    if (!Objects.equals(next, prev)) {
                        stack.add(new int[]{v, next});
                    }
                }
                wait.add(v);
            } else {
                int max = 0;
                int[][] returnWeightPairs = getReturnWeightPairs(v);
                int[][] noreturnWeightPairs = getNoReturnWeightPairs(v);
                for (Integer next : connections.get(v)) {
                    if (!Objects.equals(next, prev)) {
                        int w1 = returnWeights.get(v).get(next) + filterAndGetMaxReturnWeight(noreturnWeightPairs, prev, next);
                        int w2 = noreturnWeights.get(v).get(next) + filterAndGetMaxReturnWeight(returnWeightPairs, prev, next);
                        int w = Math.max(w1, w2);
                        if (max < w) {
                            max = w;
                        }
                    }
                }
                noreturnWeights.computeIfAbsent(prev, x -> new HashMap<>()).put(v, max + 1);
                stack.pop();
                wait.remove(v);
            }
        }
    }

    private int [][] getNoReturnWeightPairs(int v) {
        Map<Integer, Integer> m = noreturnWeights.get(v);
        if (m == null) {
            return new int[0][];
        }
        int[][] nextWeights = m.entrySet().stream().map(e -> new int[]{e.getKey(), e.getValue()}).toArray(int[][]::new);
        Arrays.sort(nextWeights, (a, b) -> b[1] - a[1]);
        return nextWeights;
    }

    private void propagateNoReturnWeights() {
        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{-1, 0});
        while (!queue.isEmpty()) {
            int[] first = queue.remove();
            int prev = first[0];
            int v = first[1];
            int[][] returnWeightPairs = getReturnWeightPairs(v);
            int[][] noreturnWeightPairs = getNoReturnWeightPairs(v);
            for (Integer next : connections.get(v)) {
//                Map<Integer, Integer> rm = returnWeights.get(v);
//                Map<Integer, Integer> nrm = noreturnWeights.get(v);
                if (!Objects.equals(next, prev)) {
//                    int max = 0;
//                    for (Integer onext : connections.get(v)) {
//                        if (!Objects.equals(onext, next)) {
//                            int nrmax = 0;
//                            int rmax = 0;
//                            for (Integer onext2 : connections.get(v)) {
//                                if (!Objects.equals(onext2, next) && !Objects.equals(onext2, onext)) {
//                                    int nrw = nrm.get(onext2);
//                                    if (nrmax < nrw) {
//                                        nrmax = nrw;
//                                    }
//                                    int rw = rm.get(onext2);
//                                    if (rmax < rw) {
//                                        rmax = rw;
//                                    }
//                                }
//                            }
//                            int w1 = rm.get(onext) + nrmax;
//                            int w2 = nrm.get(onext) + rmax;
//                            int mw = Math.max(w1, w2);
//                            if (max < mw) {
//                                max = mw;
//                            }
//                        }
//                    }
//                    maxnoreturn = Math.max(maxnoreturn, max + 1);
//                    noreturnWeights.computeIfAbsent(next, x -> new HashMap<>()).put(v, max + 1);
                    int [] rmaxpair = filterAndGetMaxPair(returnWeightPairs, next);
                    int [] nrmaxpair = filterAndGetMaxPair(noreturnWeightPairs, next);
                    int w1;
                    int w2;
                    if (rmaxpair == null) {
                        w1 = filterAndGetMaxReturnWeight(noreturnWeightPairs, next);
                    } else {
                        w1 = rmaxpair[1] + filterAndGetMaxReturnWeight(noreturnWeightPairs, next, rmaxpair[0]);
                    }
                    if (nrmaxpair == null) {
                        w2 = filterAndGetMaxReturnWeight(returnWeightPairs, next);
                    } else {
                        w2 = nrmaxpair[1] + filterAndGetMaxReturnWeight(returnWeightPairs, next, nrmaxpair[0]);
                    }
                    int max = Math.max(w1, w2);
                    maxnoreturn = Math.max(maxnoreturn, max + 1);
                    noreturnWeights.computeIfAbsent(next, x -> new HashMap<>()).put(v, max + 1);
                    queue.add(new int[]{v, next});
                }
            }
        }
    }

    // public static void main(String[] args) {
    //     Solution solution = new Solution();
    //     System.out.println(solution.solution(new int[][]{{5,1},{2,5},{3,5},{3,6},{2,4},{4,0}}));
    //     System.out.println(solution.solution(new int[][]{{2,5},{2,0},{3,2},{4,2},{2,1}}));
    // }
}