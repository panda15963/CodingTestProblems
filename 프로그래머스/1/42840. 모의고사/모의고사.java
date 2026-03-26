class Solution {
    public int[] solution(int[] answers) {
        int[] p1 = {1,2,3,4,5};
        int[] p2 = {2,1,2,3,2,4,2,5};
        int[] p3 = {3,3,1,1,2,2,4,4,5,5};
        
        int[] score = new int[4];
        for (int i = 0; i < answers.length; i++) {
            if (answers[i] == p1[i%5]) score[1]++;
            if (answers[i] == p2[i%8]) score[2]++;
            if (answers[i] == p3[i%10]) score[3]++;
        }
        
        int max = Math.max(Math.max(score[1], score[2]), score[3]);
        java.util.List<Integer> list = new java.util.ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            if (score[i] == max) list.add(i);
        }
        return list.stream().mapToInt(Integer::intValue).toArray();
    }
}
