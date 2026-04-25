import java.util.*;

class Solution {
    static class Event implements Comparable<Event> {
        long u;
        int type;
        long vMin, vMax;

        public Event(long u, int type, long vMin, long vMax) {
            this.u = u;
            this.type = type;
            this.vMin = vMin;
            this.vMax = vMax;
        }

        @Override
        public int compareTo(Event o) {
            return Long.compare(this.u, o.u);
        }
    }

    long[] maxLen0, maxLen1;
    long[] len0, len1;
    int[] cnt;

    public long solution(int n, int m, int[][] tests) {
        long validMinU = 0, validMaxU = (long)n + m;
        long validMinV = -(long)m, validMaxV = (long)n;

        List<long[]> badRects = new ArrayList<>();

        long interMinU = Long.MIN_VALUE, interMaxU = Long.MAX_VALUE;
        long interMinV = Long.MIN_VALUE, interMaxV = Long.MAX_VALUE;

        for (int[] t : tests) {
            long x = t[0];
            long y = t[1];
            long d = t[2];
            int flag = t[3];

            long u = x + y;
            long v = x - y;

            if (flag == 1) {
                interMinU = Math.max(interMinU, u - d);
                interMaxU = Math.min(interMaxU, u + d);
                interMinV = Math.max(interMinV, v - d);
                interMaxV = Math.min(interMaxV, v + d);
            } else {
                badRects.add(new long[]{u - d, u + d, v - d, v + d});
            }
        }

        validMinU = Math.max(validMinU, interMinU);
        validMaxU = Math.min(validMaxU, interMaxU);
        validMinV = Math.max(validMinV, interMinV);
        validMaxV = Math.min(validMaxV, interMaxV);

        if (validMinU > validMaxU || validMinV > validMaxV) return 0;

        List<Event> events = new ArrayList<>();
        TreeSet<Long> vCoords = new TreeSet<>();

        vCoords.add(validMinV);
        vCoords.add(validMaxV + 1);

        for (long[] rect : badRects) {
            long u1 = Math.max(rect[0], validMinU);
            long u2 = Math.min(rect[1], validMaxU);
            long v1 = Math.max(rect[2], validMinV);
            long v2 = Math.min(rect[3], validMaxV);

            if (u1 <= u2 && v1 <= v2) {
                events.add(new Event(u1, 1, v1, v2));
                events.add(new Event(u2 + 1, -1, v1, v2));
                vCoords.add(v1);
                vCoords.add(v2 + 1);
            }
        }

        Set<Long> uBreaks = new HashSet<>();
        uBreaks.add(validMinU);
        uBreaks.add(validMaxU + 1);

        long[] gridPivots = {0, n, m, (long)n + m};
        for(long p : gridPivots) {
             if (p >= validMinU && p <= validMaxU + 1) uBreaks.add(p);
        }

        addGridIntersections(uBreaks, validMinV, validMaxV, n, m, validMinU, validMaxU);

        for (long u : uBreaks) {
             events.add(new Event(u, 0, 0, 0));
        }

        Collections.sort(events);

        List<Long> uniqueV = new ArrayList<>(vCoords);
        Map<Long, Integer> vMap = new HashMap<>();
        for (int i = 0; i < uniqueV.size(); i++) {
            vMap.put(uniqueV.get(i), i);
        }

        int vSize = uniqueV.size();
        if (vSize <= 1) return 0;

        maxLen0 = new long[4 * vSize];
        maxLen1 = new long[4 * vSize];
        len0 = new long[4 * vSize];
        len1 = new long[4 * vSize];
        cnt = new int[4 * vSize];

        build(1, 0, vSize - 2, uniqueV);

        long totalPoints = 0;

        for (int i = 0; i < events.size(); i++) {
            int j = i;
            while (j < events.size() && events.get(j).u == events.get(i).u) {
                Event e = events.get(j);
                if (e.type != 0) {
                    int idx1 = vMap.get(e.vMin);
                    int idx2 = vMap.get(e.vMax + 1);
                    update(1, 0, vSize - 2, idx1, idx2 - 1, e.type);
                }
                j++;
            }

            if (j < events.size()) {
                long uStart = events.get(i).u;
                long uEnd = events.get(j).u - 1;

                if (uStart <= uEnd) {
                    long kL, cL, kR, cR;
                    if (uStart >= m) { kL = 1; cL = -2L * m; } 
                    else { kL = -1; cL = 0; }

                    if (uStart >= n) { kR = -1; cR = 2L * n; } 
                    else { kR = 1; cR = 0; }

                    totalPoints += integrateIntersection(uStart, uEnd, kL, cL, kR, cR, validMinV, validMaxV);

                    totalPoints -= queryTreeIntersection(1, 0, vSize - 2, uniqueV, uStart, uEnd, kL, cL, kR, cR, validMinV, validMaxV);
                }
            }
            i = j - 1;
        }

        return totalPoints;
    }

    void addGridIntersections(Set<Long> breaks, long vMin, long vMax, int n, int m, long uMin, long uMax) {
        addBreak(breaks, -vMin, uMin, uMax);
        addBreak(breaks, -vMax, uMin, uMax);
        addBreak(breaks, vMin + 2L * m, uMin, uMax);
        addBreak(breaks, vMax + 2L * m, uMin, uMax);
        addBreak(breaks, vMin, uMin, uMax);
        addBreak(breaks, vMax, uMin, uMax);
        addBreak(breaks, 2L * n - vMin, uMin, uMax);
        addBreak(breaks, 2L * n - vMax, uMin, uMax);
    }

    void addBreak(Set<Long> breaks, long val, long min, long max) {
        if (val >= min && val <= max + 1) breaks.add(val);
    }

    long integrateIntersection(long uStart, long uEnd, long kL, long cL, long kR, long cR, long vMin, long vMax) {
        if (uStart > uEnd) return 0;

        TreeSet<Long> cuts = new TreeSet<>();
        cuts.add(uStart);
        cuts.add(uEnd + 1);

        long[] targets = {vMin, vMax};
        for (long vT : targets) {
            addCut(cuts, kL, cL, vT, uStart, uEnd);
            addCut(cuts, kR, cR, vT, uStart, uEnd);
        }

        long total = 0;
        List<Long> cutList = new ArrayList<>(cuts);
        for (int i = 0; i < cutList.size() - 1; i++) {
            long segU1 = cutList.get(i);
            long segU2 = cutList.get(i+1) - 1;
            if (segU1 > segU2) continue;

            long effKL, effCL, effKR, effCR;

            long valL = kL * segU1 + cL;
            if (valL < vMin) { effKL = 0; effCL = vMin; } 
            else { effKL = kL; effCL = cL; }

            long valR = kR * segU1 + cR;
            if (valR > vMax) { effKR = 0; effCR = vMax; } 
            else { effKR = kR; effCR = cR; }

            total += sumParitySeries(segU1, segU2, 0, effKL, effCL, effKR, effCR);
            total += sumParitySeries(segU1, segU2, 1, effKL, effCL, effKR, effCR);
        }
        return total;
    }

    void addCut(TreeSet<Long> cuts, long k, long c, long v, long min, long max) {
        if (k == 0) return;
        long u = (v - c) / k; 
        if (u >= min && u <= max + 1) cuts.add(u);
        if (u + 1 >= min && u + 1 <= max + 1) cuts.add(u + 1); 
    }

    long sumParitySeries(long uStart, long uEnd, int parity, long kL, long cL, long kR, long cR) {
        long curr = uStart;
        if ((curr % 2 + 2) % 2 != parity) curr++;
        if (curr > uEnd) return 0;

        long nTerms = (uEnd - curr) / 2 + 1;
        long last = curr + (nTerms - 1) * 2;

        long effStart = curr, effEnd = last;

        long dk = kL - kR;
        long dc = cR - cL;
        if (dk > 0) effEnd = Math.min(effEnd, floor(dc, parity, dk)); 
        else if (dk < 0) effStart = Math.max(effStart, ceil(dc, parity, dk));
        else if (dc < 0) return 0;

        if (effStart > effEnd) return 0;

        long count = (effEnd - effStart) / 2 + 1;
        long sumU = (effStart + effEnd) * count / 2;

        long L_val_start = kL * effStart + cL;
        long L_adj_start = ceil(L_val_start, parity);

        long R_val_start = kR * effStart + cR;
        long R_adj_start = floor(R_val_start, parity);

        long termSum = (kR - kL) * (sumU - effStart * count) + (R_adj_start - L_adj_start) * count;

        return termSum / 2 + count;
    }

    void build(int node, int start, int end, List<Long> uniqueV) {
        if (start > end) return;
        if (start == end) {
            long v1 = uniqueV.get(start);
            long v2 = uniqueV.get(start + 1) - 1;
            maxLen0[node] = countParity(v1, v2, 0);
            maxLen1[node] = countParity(v1, v2, 1);
        } else {
            int mid = (start + end) / 2;
            build(node * 2, start, mid, uniqueV);
            build(node * 2 + 1, mid + 1, end, uniqueV);
            maxLen0[node] = maxLen0[node * 2] + maxLen0[node * 2 + 1];
            maxLen1[node] = maxLen1[node * 2] + maxLen1[node * 2 + 1];
        }
    }

    void update(int node, int start, int end, int l, int r, int val) {
        if (l > end || r < start) return;
        if (l <= start && end <= r) {
            cnt[node] += val;
        } else {
            int mid = (start + end) / 2;
            update(node * 2, start, mid, l, r, val);
            update(node * 2 + 1, mid + 1, end, l, r, val);
        }

        if (cnt[node] > 0) {
            len0[node] = maxLen0[node];
            len1[node] = maxLen1[node];
        } else {
            if (start != end) {
                len0[node] = len0[node * 2] + len0[node * 2 + 1];
                len1[node] = len1[node * 2] + len1[node * 2 + 1];
            } else {
                len0[node] = 0;
                len1[node] = 0;
            }
        }
    }

    long queryTreeIntersection(int node, int start, int end, List<Long> uniqueV,
                               long u1, long u2, long kL, long cL, long kR, long cR, long globalVMin, long globalVMax) {

        long nodeVMin = uniqueV.get(start);
        long nodeVMax = uniqueV.get(end + 1) - 1;

        long effVMin = Math.max(nodeVMin, globalVMin);
        long effVMax = Math.min(nodeVMax, globalVMax);

        if (effVMin > effVMax) return 0;

        if (cnt[node] > 0) {
            return integrateIntersection(u1, u2, kL, cL, kR, cR, effVMin, effVMax);
        }

        if (start == end) return 0;

        if (isRectInTrapezoid(u1, u2, kL, cL, kR, cR, effVMin, effVMax)) {
             long evenU = countParity(u1, u2, 0);
             long oddU = countParity(u1, u2, 1);
             return len0[node] * evenU + len1[node] * oddU;
        }

        if (isRectDisjointTrapezoid(u1, u2, kL, cL, kR, cR, effVMin, effVMax)) return 0;

        int mid = (start + end) / 2;
        return queryTreeIntersection(node * 2, start, mid, uniqueV, u1, u2, kL, cL, kR, cR, globalVMin, globalVMax) +
               queryTreeIntersection(node * 2 + 1, mid + 1, end, uniqueV, u1, u2, kL, cL, kR, cR, globalVMin, globalVMax);
    }

    long countParity(long A, long B, long parity) {
        if (A > B) return 0;
        long first = A;
        if ((first % 2 + 2) % 2 != parity) first++;
        long last = B;
        if ((last % 2 + 2) % 2 != parity) last--;
        if (first > last) return 0;
        return (last - first) / 2 + 1;
    }

    long ceil(long val, int parity) {
        long res = val;
        if ((res % 2 + 2) % 2 != parity) res++;
        return res;
    }
    long floor(long val, int parity) {
        long res = val;
        if ((res % 2 + 2) % 2 != parity) res--;
        return res;
    }
    long floor(long num, int parity, long den) {
        long val = (long)Math.floor((double)num/den);
        return floor(val, parity);
    }
    long ceil(long num, int parity, long den) {
        long val = (long)Math.ceil((double)num/den);
        return ceil(val, parity);
    }

    boolean isRectInTrapezoid(long u1, long u2, long kL, long cL, long kR, long cR, long vMin, long vMax) {
        return (kL * u1 + cL <= vMin) && (kL * u2 + cL <= vMin) &&
               (kR * u1 + cR >= vMax) && (kR * u2 + cR >= vMax);
    }

    boolean isRectDisjointTrapezoid(long u1, long u2, long kL, long cL, long kR, long cR, long vMin, long vMax) {
        long maxR = Math.max(kR * u1 + cR, kR * u2 + cR);
        if (maxR < vMin) return true;

        long minL = Math.min(kL * u1 + cL, kL * u2 + cL);
        if (minL > vMax) return true;

        return false;
    }
}