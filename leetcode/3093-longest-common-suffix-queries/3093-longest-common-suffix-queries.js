const ALPHABET_SIZE = 26;

let trieChildren;
let trieLength;
let trieIndex;
let nodeCount;

function createTrieNode() {
    const nodeId = nodeCount++;
    trieChildren[nodeId] = new Array(ALPHABET_SIZE).fill(null);
    trieLength[nodeId] = Infinity;
    trieIndex[nodeId] = Infinity;
    return nodeId;
}

function insert(word, wordIndex) {
    let currentNode = 0;

    if (trieLength[currentNode] > word.length) {
        trieLength[currentNode] = word.length;
        trieIndex[currentNode] = wordIndex;
    }

    for (let i = word.length - 1; i >= 0; i--) {
        const c = word.charCodeAt(i) - 97;

        if (trieChildren[currentNode][c] === null) {
            trieChildren[currentNode][c] = createTrieNode();
        }

        currentNode = trieChildren[currentNode][c];

        if (trieLength[currentNode] > word.length) {
            trieLength[currentNode] = word.length;
            trieIndex[currentNode] = wordIndex;
        }
    }
}

function query(word) {
    let currentNode = 0;

    for (let i = word.length - 1; i >= 0; i--) {
        const c = word.charCodeAt(i) - 97;

        if (trieChildren[currentNode][c] === null) break;
        currentNode = trieChildren[currentNode][c];
    }

    return trieIndex[currentNode];
}

function stringIndices(wordsContainer, wordsQuery) {
    trieChildren = [];
    trieLength = [];
    trieIndex = [];
    nodeCount = 0;

    createTrieNode();

    for (let i = 0; i < wordsContainer.length; i++) {
        insert(wordsContainer[i], i);
    }

    const result = [];

    for (const word of wordsQuery) {
        result.push(query(word));
    }

    return result;
}