import java.util.*;

class Solution {
    
    public static class Result{
        int no;
        String status;
        
        public Result(int no, String status){
            this.no = no;
            this.status = status;
        }
    }
    
    public static class Node implements Comparable<Node>{
        int no;
        ArrayList<Node> list = new ArrayList<>();
        int numCount = 0;
        ArrayList<Integer> countList = new ArrayList<>();
        ArrayList<Integer> numList = new ArrayList<>();
        
        int target;
        int route = 0;
        boolean isleap = true;
        

        public Node(int no, int target){
            this.no = no;
            this.target = target;
        }
        public void addChild(Node child){
            list.add(child);
        }
        
        public void startSet(){
            isleap = list.size() == 0;
            if(!isleap){
                list.sort(null);
                route = 0;
            }
        }
        
        public Result addNum(int num){
            if(isleap){
                if(numCount >= target){
                    return new Result(no,"over");
                }
                numCount++;
                countList.add(num);
                if(numCount <= target && numCount*3 >= target){
                    numList.clear();
                    for(int i = 0; i < numCount; i++){
                        numList.add(1);
                    }
                    int needNum = target - numCount;
                    for(int i = numCount-1; i >= 0; i--){
                        if(needNum == 0) break;
                        else if(needNum == 1){
                            numList.set(i,2);
                            break;
                        }else{
                            numList.set(i,3);
                            needNum -= 2;
                        }
                    }
                    System.out.println(numList);
                    return new Result(no,"possible");
                }
                return new Result(no,"less");
                
            }else{
                int temp = route;
                route = (route+1)%list.size();
                return list.get(temp).addNum(num);
            }
        }

        @Override
        public int compareTo(Node o){
            return this.no - o.no;
        }
    }
    
    public int[] solution(int[][] edges, int[] target) {
        Map<Integer,Node> memo = new HashMap<>();
        Node root = new Node(1,-1);
        memo.put(1,root);
        int sum = Arrays.stream(target).sum();
        
        for(int[] edge : edges){
            int parent = edge[0];
            int child = edge[1];
            
            if(!memo.containsKey(child)){
                memo.put(child,new Node(child,target[child-1]));
            }
            if(!memo.containsKey(parent)){
                memo.put(parent,new Node(parent,target[parent-1]));
            }
            memo.get(parent).addChild(memo.get(child));
            
        }
        
        for(int n : memo.keySet()){
            memo.get(n).startSet();
        }
        
        int count = 1;
        boolean[] statusBoard = new boolean[target.length];
        for(int i = 0 ; i < target.length; i++){
            if(target[i] == 0)statusBoard[i] = true;
        }
        boolean isComplete = true;
        while(true){
            Result result = root.addNum(count++);
            
            if(result.status == "over")break;
            
            if(result.status == "possible"){
                statusBoard[result.no-1] =true;
            }else{
                statusBoard[result.no-1] =false;
            }
            isComplete = true;
            for(boolean r : statusBoard){
                if(!r){
                    isComplete = false;
                    break;
                }
            }
            if(isComplete)break;
        }
        
        if(!isComplete) return new int[] {-1};
        
        ArrayList<Integer> answer = new ArrayList<>();
        
        for(int i = 1; i < count; i++){
            for(int x = 1; x <= target.length; x++){
                Node temp = memo.get(x);
                if(!temp.countList.contains(i))continue;
                answer.add(temp.numList.get(temp.countList.indexOf(i)));
                break;
            }
        }
        
        int[] answerArr = new int[answer.size()];
        for(int i = 0 ; i < answer.size(); i++){
            answerArr[i] = answer.get(i);
        }
            
        return answerArr;
    }
}