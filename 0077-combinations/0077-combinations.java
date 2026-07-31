class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> answer = new ArrayList<>();
        int[] output = new int[k];

        combination(1, 0, n, k, output, answer);

        return answer;
    }

    private void combination(int index, int selected, int n, int k,
                             int[] output, List<List<Integer>> answer) {
        if (selected == k) {
            List<Integer> list = new ArrayList<>();
            for (int num : output) {
                list.add(num);
            }
            answer.add(list);
            return;
        }

        if (index > n) {
            return;
        }

        output[selected] = index;
        combination(index + 1, selected + 1, n, k, output, answer);
        combination(index + 1, selected, n, k, output, answer);
    }
}