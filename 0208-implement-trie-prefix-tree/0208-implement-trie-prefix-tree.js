class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null);
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let currentNode = this.root;

        for (const character of word) {
            const charIndex = character.charCodeAt(0) - 97;

            if (currentNode.children[charIndex] === null) {
                currentNode.children[charIndex] = new TrieNode();
            }

            currentNode = currentNode.children[charIndex];
        }

        currentNode.isEndOfWord = true;
    }

    search(word) {
        const node = this.searchPrefix(word);

        return node !== null && node.isEndOfWord;
    }

    startsWith(prefix) {
        return this.searchPrefix(prefix) !== null;
    }

    searchPrefix(prefix) {
        let currentNode = this.root;

        for (const character of prefix) {
            const charIndex = character.charCodeAt(0) - 97;

            if (currentNode.children[charIndex] === null) {
                return null;
            }

            currentNode = currentNode.children[charIndex];
        }

        return currentNode;
    }
}