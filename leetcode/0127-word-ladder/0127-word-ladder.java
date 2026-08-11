class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);

        Set<String> layer = new HashSet<>();
        layer.add(beginWord);

        boolean timeToBreak = false;
        int length = 1;

        while (!layer.isEmpty()) {
            Set<String> newLayer = new HashSet<>();

            for (String word : layer) {
                for (int i = 0; i < beginWord.length(); i++) {
                    for (char c = 'a'; c <= 'z'; c++) {
                        String newWord =
                            word.substring(0, i)
                            + c
                            + word.substring(i + 1);

                        if (wordSet.contains(newWord)) {
                            if (newWord.equals(endWord)) {
                                timeToBreak = true;
                            }

                            newLayer.add(newWord);
                        }
                    }
                }
            }

            length++;

            if (timeToBreak) {
                return length;
            }

            wordSet.removeAll(newLayer);
            layer = newLayer;
        }

        return 0;
    }
}