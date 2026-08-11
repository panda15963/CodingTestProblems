function ladderLength(
    beginWord: string,
    endWord: string,
    wordList: string[]
): number {
    const wordSet: Set<string> = new Set(wordList);

    let layer: Set<string> = new Set([beginWord]);
    let timeToBreak: boolean = false;
    let length: number = 1;

    while (layer.size > 0) {
        const newLayer: Set<string> = new Set();

        for (const word of layer) {
            for (let i = 0; i < beginWord.length; i++) {
                for (let code = 97; code <= 122; code++) {
                    const c: string = String.fromCharCode(code);

                    const newWord: string =
                        word.substring(0, i) +
                        c +
                        word.substring(i + 1);

                    if (wordSet.has(newWord)) {
                        if (newWord === endWord) {
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

        for (const word of newLayer) {
            wordSet.delete(word);
        }

        layer = newLayer;
    }

    return 0;
}