import java.util.*;

class Solution {
    static final int ALPHABET_SIZE = 26;

    List<int[]> trieChildren = new ArrayList<>();
    List<Integer> trieLength = new ArrayList<>();
    List<Integer> trieIndex = new ArrayList<>();

    int nodeCount = 0;

    int createTrieNode() {
        int nodeId = nodeCount++;

        trieChildren.add(new int[ALPHABET_SIZE]);
        Arrays.fill(trieChildren.get(nodeId), -1);

        trieLength.add(Integer.MAX_VALUE);
        trieIndex.add(Integer.MAX_VALUE);

        return nodeId;
    }

    void insert(String word, int wordIndex) {
        int currentNode = 0;

        if (trieLength.get(currentNode) > word.length()) {
            trieLength.set(currentNode, word.length());
            trieIndex.set(currentNode, wordIndex);
        }

        for (int i = word.length() - 1; i >= 0; i--) {
            int c = word.charAt(i) - 'a';

            if (trieChildren.get(currentNode)[c] == -1) {
                trieChildren.get(currentNode)[c] = createTrieNode();
            }

            currentNode = trieChildren.get(currentNode)[c];

            if (trieLength.get(currentNode) > word.length()) {
                trieLength.set(currentNode, word.length());
                trieIndex.set(currentNode, wordIndex);
            }
        }
    }

    int query(String word) {
        int currentNode = 0;

        for (int i = word.length() - 1; i >= 0; i--) {
            int c = word.charAt(i) - 'a';

            if (trieChildren.get(currentNode)[c] == -1) break;
            currentNode = trieChildren.get(currentNode)[c];
        }

        return trieIndex.get(currentNode);
    }

    public int[] stringIndices(String[] wordsContainer, String[] wordsQuery) {
        createTrieNode();

        for (int i = 0; i < wordsContainer.length; i++) {
            insert(wordsContainer[i], i);
        }

        int[] result = new int[wordsQuery.length];

        for (int i = 0; i < wordsQuery.length; i++) {
            result[i] = query(wordsQuery[i]);
        }

        return result;
    }
}