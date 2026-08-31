class TrieNode {
    constructor() {
        // 26개의 자식 노드 (a ~ z)
        this.children = new Array(26).fill(null);

        // words 배열의 인덱스
        // -1이면 단어의 끝이 아님
        this.ref = -1;
    }
}

// Trie에 단어 삽입
function insertWord(root, word, referenceIndex) {
    let currentNode = root;

    // 단어의 각 문자 탐색
    for (let i = 0; i < word.length; i++) {
        // a = 0, b = 1, ..., z = 25
        const charIndex = word.charCodeAt(i) - 97;

        // 해당 경로가 없으면 새로운 TrieNode 생성
        if (currentNode.children[charIndex] === null) {
            currentNode.children[charIndex] = new TrieNode();
        }

        // 다음 노드로 이동
        currentNode = currentNode.children[charIndex];
    }

    // 단어의 끝에 words 배열의 인덱스 저장
    currentNode.ref = referenceIndex;
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    // Trie 생성
    const trieRoot = new TrieNode();

    // 모든 단어를 Trie에 삽입
    for (let i = 0; i < words.length; i++) {
        insertWord(trieRoot, words[i], i);
    }

    const rows = board.length;
    const cols = board[0].length;
    const result = [];

    // 상, 우, 하, 좌
    const directions = [-1, 0, 1, 0, -1];

    // DFS
    const dfs = (node, row, col) => {
        // 현재 board 문자를 숫자로 변환
        const charIndex = board[row][col].charCodeAt(0) - 97;

        // Trie에 해당 문자가 없으면 종료
        if (node.children[charIndex] === null) {
            return;
        }

        // 다음 Trie 노드로 이동
        node = node.children[charIndex];

        // 단어를 찾았다면 결과에 추가
        if (node.ref !== -1) {
            result.push(words[node.ref]);

            // 중복 추가 방지
            node.ref = -1;
        }

        // 현재 칸 방문 처리
        const originalChar = board[row][col];
        board[row][col] = '#';

        // 4방향 탐색
        for (let k = 0; k < 4; k++) {
            const nextRow = row + directions[k];
            const nextCol = col + directions[k + 1];

            // 범위 체크 + 방문 여부 체크
            if (
                nextRow >= 0 &&
                nextRow < rows &&
                nextCol >= 0 &&
                nextCol < cols &&
                board[nextRow][nextCol] !== '#'
            ) {
                dfs(node, nextRow, nextCol);
            }
        }

        // 원래 문자 복구
        board[row][col] = originalChar;
    };

    // 모든 칸에서 DFS 시작
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dfs(trieRoot, i, j);
        }
    }

    return result;
};