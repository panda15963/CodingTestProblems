// Store all shortest transformation sequences
let result;

// Map to store predecessors for each word in the shortest paths
let predecessors;

var findLadders = function (beginWord, endWord, wordList) {
    result = [];

    // Convert word list to Set for O(1) lookup
    const wordSet = new Set(wordList);

    // endWord가 wordList에 없으면 불가능
    if (!wordSet.has(endWord)) {
        return result;
    }

    // beginWord는 다시 방문하지 않도록 제거
    wordSet.delete(beginWord);

    // 각 단어까지의 거리
    const distanceMap = new Map();
    distanceMap.set(beginWord, 0);

    // 각 단어의 이전 단어들을 저장
    predecessors = new Map();

    // BFS queue
    const queue = [];
    queue.push(beginWord);

    let targetFound = false;
    let currentStep = 0;

    // BFS로 최단 경로 탐색
    while (queue.length > 0 && !targetFound) {
        currentStep++;

        const levelSize = queue.length;

        // 현재 레벨 처리
        for (let i = 0; i < levelSize; i++) {
            const currentWord = queue.shift();
            const wordChars = currentWord.split('');

            // 각 문자 위치를 변경
            for (
                let charIndex = 0;
                charIndex < wordChars.length;
                charIndex++
            ) {
                const originalChar = wordChars[charIndex];

                // a ~ z까지 변경
                for (let charCode = 97; charCode <= 122; charCode++) {
                    const newChar = String.fromCharCode(charCode);

                    wordChars[charIndex] = newChar;

                    const transformedWord = wordChars.join('');

                    // 같은 거리에서 발견된 단어라면
                    // 또 다른 predecessor로 추가
                    if (
                        (distanceMap.get(transformedWord) ?? 0) ===
                        currentStep
                    ) {
                        predecessors
                            .get(transformedWord)
                            ?.add(currentWord);
                    }

                    // 이미 방문했거나 존재하지 않는 단어
                    if (!wordSet.has(transformedWord)) {
                        continue;
                    }

                    // predecessor Map 초기화
                    if (!predecessors.has(transformedWord)) {
                        predecessors.set(
                            transformedWord,
                            new Set()
                        );
                    }

                    // 현재 단어를 predecessor로 추가
                    predecessors
                        .get(transformedWord)
                        .add(currentWord);

                    // 방문 처리
                    wordSet.delete(transformedWord);

                    // 다음 BFS 레벨에 추가
                    queue.push(transformedWord);

                    // 거리 저장
                    distanceMap.set(
                        transformedWord,
                        currentStep
                    );

                    // endWord 도착
                    if (transformedWord === endWord) {
                        targetFound = true;
                    }
                }

                // 원래 문자 복구
                wordChars[charIndex] = originalChar;
            }
        }
    }

    // 최단 경로가 존재하면 DFS로 경로 복원
    if (targetFound) {
        const currentPath = [endWord];

        buildPaths(
            currentPath,
            beginWord,
            endWord
        );
    }

    return result;
};

/**
 * endWord에서 beginWord까지
 * predecessor를 따라가며 모든 최단 경로 생성
 */
function buildPaths(currentPath, beginWord, currentWord) {
    // beginWord에 도착
    if (currentWord === beginWord) {
        result.push([...currentPath]);
        return;
    }

    // 현재 단어의 predecessor들
    const currentPredecessors =
        predecessors.get(currentWord);

    if (currentPredecessors) {
        for (const predecessor of currentPredecessors) {
            // 경로 앞에 predecessor 추가
            currentPath.unshift(predecessor);

            // 재귀적으로 이전 단어 탐색
            buildPaths(
                currentPath,
                beginWord,
                predecessor
            );

            // Backtracking
            currentPath.shift();
        }
    }
}