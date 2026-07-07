import java.util.*;

// 다시는 레벨 5 건드리지 않기를... 진짜로......
class Solution {
    Node[] nodeList;

    public long[] solution(int[] values, int[][] edges, int[][] queries) {
        // add node
        nodeList = new Node[values.length];
        for (int i = 0; i < values.length; i++) {
            nodeList[i] = new Node(i + 1, values[i]);
        }

        // connect nodes
        for (int[] edge : edges) {
            nodeList[edge[0] - 1].addLink(edge[1]);
            nodeList[edge[1] - 1].addLink(edge[0]);
        }

        // group nodes using HLD
        groupNodes(1, 0);

        // solve
        List<Long> answer = new ArrayList<>();
        for (int[] q : queries) {
            if (q[1] == -1) {
                answer.add(nodeList[q[0] - 1].getSum(q[0]));
            } // query 1
            else {
                nodeList[q[0] - 1].queryTwo(q[0], q[1]);
            } // query 2
        }

        // System.out.println(answer);
        long[] output = new long[answer.size()];
        for (int i = 0; i < answer.size(); i++) {
            output[i] = answer.get(i);
        }
        return output;
    }

    // use HLD to group nodes
    Deque<Integer> groupNodes(int targetId, int parentId) {
        Deque<Integer> idList = new ArrayDeque<Integer>();
        idList.addLast(targetId);

        boolean bRootGroup = (targetId == 1);

        Node node = nodeList[targetId - 1];
        Set<Integer> linkList = node.getLinkList();
        if (parentId > 0) {
            node.removeLink(parentId);
        }

        while (linkList.size() == 1) {
            parentId = targetId;
            targetId = (Integer)linkList.toArray()[0];

            node = nodeList[targetId - 1];
            node.removeLink(parentId);
            linkList = node.getLinkList();
            idList.addLast(targetId);
        }

        if (!linkList.isEmpty()) {
            final int LEN = linkList.size();
            Deque<Integer>[] idLists = (Deque<Integer>[])new Deque[LEN];
            int max = 0;
            int idx = 0;

            for (int id : linkList) {
                idLists[idx] = groupNodes(id, targetId);
                if (idLists[idx].size() > max) {
                    max = idLists[idx].size();
                }
                idx++;
            }

            boolean bHeavyGroupNotFound = true;
            for (int i = 0; i < LEN; i++) {
                if (bHeavyGroupNotFound && idLists[i].size() == max) {
                    // heavy
                    bHeavyGroupNotFound = false;
                    idList.addAll(idLists[i]);
                } else {
                    // light
                    groupNode(idLists[i]);
                }
            }
        }

        if (bRootGroup) {
            groupNode(idList);
            return null;
        } else {
            return idList;
        }
    }

    void groupNode(Deque<Integer> idList) {
        int[] nodeIds = new int[idList.size()];
        int[] nodeValues = new int[idList.size()];
        long[] nodeSegSums = new long[idList.size()];

        Node rootNode = nodeList[idList.peek() - 1];
        long totalValue = 0L;
        int idx = 0;
        Iterator<Integer> iter = idList.iterator();

        while (iter.hasNext()) {
            int curId = iter.next();
            Node curNode = nodeList[curId - 1];
            Set<Integer> curNodeLinkList = curNode.getLinkList();

            if (curNodeLinkList.size() > 1) {
                final int idInCurGroup = idList.peek();
                long curTotal = 0L;

                curNodeLinkList.remove(idInCurGroup);
                for (int linkId : curNodeLinkList) {
                    Node n = nodeList[linkId - 1];
                    n.setParent(rootNode);
                    n.setParentIdx(idx);
                    curTotal += n.getSum();
                }
                curNodeLinkList.add(idInCurGroup);

                totalValue += curTotal;
                nodeSegSums[idx] = curTotal;
            } else {
                nodeSegSums[idx] = 0L;
            }
            nodeIds[idx] = curId;
            int curValue = curNode.getValue(0);
            nodeValues[idx] = curValue;
            totalValue += curValue;
            idx++;
        }

        rootNode.grouping(nodeIds, nodeValues, nodeSegSums);
        rootNode.setSum(totalValue);
        for (int id : nodeIds) {
            nodeList[id - 1] = rootNode;
        }
    }
}

class Node {
    private Set<Integer> link;
    private int[] ids;
    private int[] values;
    private long[] segSums;
    private Node parent;
    private int parentIdx;
    private long sum;

    Node(int id, int value) {
        this.ids = new int[]{id};
        this.values = new int[]{value};
        this.link = new HashSet<>();
        this.segSums = new long[]{0L};
        this.parentIdx = -1;
    }

    void addLink(Integer id) {
        this.link.add(id);
    }

    void removeLink(Integer id) {
        this.link.remove(id);
    }

    Set<Integer> getLinkList() {
        return this.link;
    }

    void setSum(long sum) {
        this.sum = sum;
    }

    long getSum() {
        return this.sum;
    }

    long getSum(int id) {
        int target = -1;
        for (int i = 0; i < this.ids.length; i++) {
            if (this.ids[i] == id) {
                target = i;
                break;
            }
        }

        if (target == 0) {
            return this.sum;
        } else if (target > 0) {
            final int LEN = this.values.length;
            long partSum;

            if (target < ((LEN + 1) / 2)) {
                partSum = this.sum;
                for (int i = 0; i < target; i++) {
                    partSum -= this.values[i] + this.segSums[i];
                }
            } else {
                partSum = 0L;
                for (int i = target; i < LEN; i++) {
                    partSum += this.values[i] + this.segSums[i];
                }
            }

            return partSum;
        }
        return -1L;
    }

    int getValue(int idx) {
        if (idx < 0 || idx > this.values.length) {
            return -1;
        } else {
            return this.values[idx];
        }
    }

    void setParent(Node parent) {
        this.parent = parent;
    }

    Node getParent() {
        return this.parent;
    }

    void setParentIdx(int parentIdx) {
        this.parentIdx = parentIdx;
    }

    int getParentIdx() {
        return this.parentIdx;
    }

    void grouping(int[] ids, int[] values, long[] segSums) {
        this.values = values;
        this.ids = ids;
        this.segSums = segSums;
    }

    void queryTwo(final int ID, final int NEW_VALUE) {
        Node n = this;
        int deletedValue = -1;
        int idx = -1;

        for (int i = 0; i < this.ids.length; i++) {
            if (this.ids[i] == ID) {
                idx = i;
                break;
            }
        }

        if (idx != -1) {
            deletedValue = this.values[idx];
        } else {
            return;
        }

        while (n.parent != null) {
            if (n.values.length > 1) {
                System.arraycopy(n.values, 0, n.values, 1, idx);
            }
            idx = n.parentIdx;
            int parentValue = n.parent.values[idx];
            n.values[0] = parentValue;
            n.sum += parentValue - deletedValue;
            n.parent.segSums[idx] += parentValue - deletedValue;

            n = n.parent;
        }

        if (idx != -1) {
            if (n.values.length > 1) {
                System.arraycopy(n.values, 0, n.values, 1, idx);
            }
            n.values[0] = NEW_VALUE;
            n.sum += NEW_VALUE - deletedValue;
        }
    }
}