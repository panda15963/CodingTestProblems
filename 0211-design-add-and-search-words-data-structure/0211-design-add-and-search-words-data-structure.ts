class TrieNode {
    children: (TrieNode | null)[];
    isEndOfWord: boolean;

    constructor() {
        this.children = new Array(26).fill(null);
        this.isEndOfWord = false;
    }

    insert(word: string): void {
        let currentNode: TrieNode = this;

        for (const char of word) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);

            if (currentNode.children[index] === null) {
                currentNode.children[index] = new TrieNode();
            }

            currentNode = currentNode.children[index]!;
        }

        currentNode.isEndOfWord = true;
    }
}

class WordDictionary {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        this.root.insert(word);
    }

    search(word: string): boolean {
        return this.dfsSearch(word, 0, this.root);
    }

    private dfsSearch(
        word: string,
        index: number,
        currentNode: TrieNode
    ): boolean {
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