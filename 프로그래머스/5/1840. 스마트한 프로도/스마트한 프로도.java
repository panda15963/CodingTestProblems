import java.util.*;

class Solution {
    static class Node {
        int num;
        ArrayList<Edge> edges = new ArrayList<>();
    }

    static class Edge {
        int num;
        int type = 0; // 1: m0, 2: mt, 3: m0&mt
        Node node1;
        Node node2;
        boolean enabled = true;

        boolean isAdjacent(Edge e2) {
            return node1 == e2.node1 || node1 == e2.node2 ||
                   node2 == e2.node1 || node2 == e2.node2;
        }
    }

    static class EdgeSet {
        ArrayList<Edge> edges = new ArrayList<>();

        boolean isAtomic() {
            return edges.size() == 1;
        }

        boolean isCycle() {
            if (edges.size() <= 2) return false;
            Edge front = edges.get(0);
            Edge back = edges.get(edges.size() - 1);
            return front.isAdjacent(back);
        }

        int countMtM0() {
            int r = 0;
            for (Edge e : edges) {
                if (e.type == 1) r--;
                else r++;
            }
            return r;
        }

        ArrayList<int[]> process() {
            ArrayList<int[]> result = new ArrayList<>();

            if (isCycle()) {
                if (edges.get(0).type == 2) {
                    Edge first = edges.remove(0);
                    edges.add(first);
                }
            } else if (edges.get(0).type == 1) {
                Collections.reverse(edges);
            }

            for (int i = 0; i < edges.size(); i++) {
                Edge e = edges.get(i);

                if (e.type == 2) {
                    if (i + 1 == edges.size()) {
                        result.add(new int[]{1, e.num});
                    }
                } else {
                    result.add(new int[]{0, e.num});
                    if (i - 1 >= 0) {
                        result.add(new int[]{1, edges.get(i - 1).num});
                    }
                }
            }

            return result;
        }

        void expand() {
            Node n1 = edges.get(0).node1;
            Node n2 = edges.get(0).node2;

            for (int i = 0; i < n1.edges.size(); i++) {
                Edge e = n1.edges.get(i);
                if (e.type == 1 || e.type == 2) {
                    if (!e.enabled) continue;
                    e.enabled = false;

                    edges.add(0, e);
                    if (e.node1 == n1) n1 = e.node2;
                    else n1 = e.node1;
                    i = -1;
                }
            }

            for (int i = 0; i < n2.edges.size(); i++) {
                Edge e = n2.edges.get(i);
                if (e.type == 1 || e.type == 2) {
                    if (!e.enabled) continue;
                    e.enabled = false;

                    edges.add(e);
                    if (e.node1 == n2) n2 = e.node2;
                    else n2 = e.node1;
                    i = -1;
                }
            }
        }
    }

    static boolean cmp(EdgeSet s1, EdgeSet s2) {
        return s1.countMtM0() > s2.countMtM0();
    }

    public int[][] solution(int n, int m, int[] a, int[] b, int k, int m1, int m2, int[] e1, int[] e2) {
        ArrayList<int[]> answer = new ArrayList<>();

        ArrayList<Node> nodes = new ArrayList<>();
        ArrayList<Edge> edges = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            Node node = new Node();
            node.num = i + 1;
            nodes.add(node);
        }

        for (int i = 0; i < m; i++) {
            Edge e = new Edge();
            e.num = i + 1;
            e.node1 = nodes.get(a[i] - 1);
            e.node2 = nodes.get(b[i] - 1);
            edges.add(e);
            nodes.get(a[i] - 1).edges.add(e);
            nodes.get(b[i] - 1).edges.add(e);
        }

        for (int i = 0; i < m1; i++) {
            edges.get(e1[i] - 1).type = 1;
        }
        for (int i = 0; i < m2; i++) {
            edges.get(e2[i] - 1).type += 2;
        }

        ArrayList<EdgeSet> es = new ArrayList<>();

        int i = 0;
        while (i < edges.size()) {
            Edge e = edges.get(i);
            i++;

            if ((!e.enabled) || e.type == 0 || e.type == 3) {
                continue;
            }

            e.enabled = false;
            EdgeSet eset = new EdgeSet();
            es.add(eset);
            eset.edges.add(e);
            eset.expand();
        }

        es.sort((s1, s2) -> Integer.compare(s2.countMtM0(), s1.countMtM0()));

        for (EdgeSet set : es) {
            ArrayList<int[]> temp = set.process();
            answer.addAll(temp);
        }

        int[][] ret = new int[answer.size()][2];
        for (int idx = 0; idx < answer.size(); idx++) {
            ret[idx] = answer.get(idx);
        }
        return ret;
    }
}