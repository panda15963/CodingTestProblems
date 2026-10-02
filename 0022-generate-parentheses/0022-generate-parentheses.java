class Solution {
    private List<String> answer = new ArrayList<>();
    private int N;

    private void backTracking(int front, int back, String tmp) {
        if (front == N && back == N) {
            answer.add(tmp);
            return;
        }

        if (front < N) {
            backTracking(front + 1, back, tmp + "(");
        }

        if (front > back) {
            backTracking(front, back + 1, tmp + ")");
        }
    }

    public List<String> generateParenthesis(int n) {
        N = n;
        backTracking(0, 0, "");
        return answer;
    }
}