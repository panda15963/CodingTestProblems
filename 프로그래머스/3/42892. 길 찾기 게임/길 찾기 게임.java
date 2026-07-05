import java.util.*;

class Solution {
	static int idx = 0;
	static ArrayList<Node> nodes = new ArrayList<>();
	static int[][] answer;
	
    static class Node {
    	int idx;
    	int x, y;
    	Node left, right;
    	
    	Node(int idx, int x, int y) {
    		this.idx = idx;
    		this.x = x;
    		this.y = y;
    	}
    }

    public int[][] solution(int[][] nodeinfo) {
    	int n = nodeinfo.length;
    	answer = new int[2][n];
    	
    	for(int i=0;i<n;i++) 
    		nodes.add(new Node(i + 1, nodeinfo[i][0], nodeinfo[i][1]));
    	
    	nodes.sort((o1, o2) -> o1.y == o2.y ? o1.x - o2.x : o2.y - o1.y);
        
    	Node root = nodes.get(0);
    	setChild(root, nodes);
        
    	preOrder(root);
    	idx = 0;
    	postOrder(root);
    	
    	return answer;
    }
    
    static void preOrder(Node node) {
    	answer[0][idx++] = node.idx;
    	if(node.left != null) preOrder(node.left);
    	if(node.right != null) preOrder(node.right);
    }
    
    static void postOrder(Node node) {
    	if(node.left != null) postOrder(node.left);
    	if(node.right != null) postOrder(node.right);
    	answer[1][idx++] = node.idx;
    }
    
    static void setChild(Node node, ArrayList<Node> list) {
    	ArrayList<Node> left = new ArrayList<>();
    	ArrayList<Node> right = new ArrayList<>();
    	
    	for(int i=1;i<list.size();i++) {
    		Node next = list.get(i);
    		if(next.x < node.x)
    			left.add(next);
    		else
    			right.add(next);
    	}
    	
    	Node leftNode = left.size() == 0 ? null : left.get(0);
    	Node rightNode = right.size() == 0 ? null : right.get(0);
    	
    	node.left = leftNode;
    	node.right = rightNode;
    	if(leftNode != null)
    		setChild(leftNode, left);
    	if(rightNode != null)
    		setChild(rightNode, right);
    }
}