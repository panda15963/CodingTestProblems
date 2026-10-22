var Trie = function() {
    this.children = new Array(26).fill(null);
    this.isEnd = false;
};

Trie.prototype.insert = function(w) {
    let node = this;

    for (const c of w) {
        const idx = c.charCodeAt(0) - 97;

        if (node.children[idx] === null) {
            node.children[idx] = new Trie();
        }

        node = node.children[idx];
    }

    node.isEnd = true;
};

var findAllConcatenatedWordsInADict = function(words) {
    const trie = new Trie();
    const ans = [];

    words.sort((a, b) => a.length - b.length);

    for (const w of words) {
        if (dfs(w, trie)) {
            ans.push(w);
        } else {
            trie.insert(w);
        }
    }

    return ans;
};

function dfs(w, trie) {
    if (w === "") {
        return true;
    }

    let node = trie;

    for (let i = 0; i < w.length; i++) {
        const idx = w.charCodeAt(i) - 97;

        if (node.children[idx] === null) {
            return false;
        }

        node = node.children[idx];

        if (node.isEnd && dfs(w.substring(i + 1), trie)) {
            return true;
        }
    }

    return false;
}