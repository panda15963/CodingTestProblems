function solution(message, spoiler_ranges) {
    const notImportants = getNotImportants(message, spoiler_ranges);
    const importants = new Set();
    
    for (const range of spoiler_ranges) {
        const word = getCompleteWord(range, message);
        const splitWords = word.split(/\s+/);
        for (const w of splitWords) {
            const tw = w.trim();
            if (tw && !notImportants.has(tw)) {
                importants.add(tw);
            }
        }
    }
    
    return importants.size;
}

function getCompleteWord(range, origin) {
    let start = range[0];
    let end = range[1];
    const limit = origin.length;

    if (start < 0 || end >= limit || start > end) return "";

    while (start > 0 && origin[start - 1] !== ' ') {
        start--;
    }
    while (end < limit - 1 && origin[end + 1] !== ' ') {
        end++;
    }

    return origin.substring(start, end + 1).trim();
}

function getNotImportants(origin, spoiler_ranges) {
    const notImportants = new Set();
    const isSpoiled = new Array(origin.length).fill(false);

    for (const range of spoiler_ranges) {
        for (let i = range[0]; i <= range[1]; i++) {
            if (i >= 0 && i < origin.length) {
                isSpoiled[i] = true;
            }
        }
    }

    let i = 0;
    while (i < origin.length) {
        if (origin[i] === ' ') {
            i++;
            continue;
        }

        const start = i;
        while (i < origin.length && origin[i] !== ' ') {
            i++;
        }
        
        const end = i - 1;

        let hasSpoiler = false;
        for (let j = start; j <= end; j++) {
            if (isSpoiled[j]) {
                hasSpoiler = true;
                break;
            }
        }

        if (!hasSpoiler) {
            notImportants.add(origin.substring(start, end + 1));
        }
    }

    return notImportants;
}