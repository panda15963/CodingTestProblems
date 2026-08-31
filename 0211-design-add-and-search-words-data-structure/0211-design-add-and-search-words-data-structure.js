class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null);
        this.isEndOfWord = false;
    }

    insert(word) {
        let currentNode = this;

        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);

            if (currentNode.children[index] === null) {
                currentNode.children[index] = new TrieNode();
            }

            currentNode = currentNode.children[index];
        }

        currentNode.isEndOfWord = true;
    }
}

class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word) {
        this.root.insert(word);
    }

    search(word) {
        return this.dfsSearch(word, 0, this.root);
    }

    dfsSearch(word, index, currentNode) {
        // 단어 끝까지 도착
        if (index === word.length) {
            return currentNode.isEndOfWord;
        }

        const currentChar = word[index];

        // 일반 문자
        if (currentChar !== '.') {
            const childIndex =
                currentChar.charCodeAt(0) - 'a'.charCodeAt(0);

            const childNode = currentNode.children[childIndex];

            if (
                childNode !== null &&
                this.dfsSearch(word, index + 1, childNode)
            ) {
                return true;
            }

            return false;
        }

        // '.' → 모든 자식 노드 탐색
        for (const childNode of currentNode.children) {
            if (
                childNode !== null &&
                this.dfsSearch(word, index + 1, childNode)
            ) {
                return true;
            }
        }

        return false;
    }
}