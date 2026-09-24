var Twitter = function() {
    this.following = new Map();
    this.tweets = new Map();
    this.time = 0;
};

Twitter.prototype.postTweet = function(userId, tweetId) {
    if (!this.tweets.has(userId)) {
        this.tweets.set(userId, []);
    }

    this.tweets.get(userId).push([
        this.time++,
        tweetId
    ]);
};

Twitter.prototype.getNewsFeed = function(userId) {
    const result = [];
    const maxHeap = [];

    const push = (tweet) => {
        maxHeap.push(tweet);

        let i = maxHeap.length - 1;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);

            if (maxHeap[parent][0] >= maxHeap[i][0]) {
                break;
            }

            [maxHeap[parent], maxHeap[i]] =
                [maxHeap[i], maxHeap[parent]];

            i = parent;
        }
    };

    const pop = () => {
        const top = maxHeap[0];
        const last = maxHeap.pop();

        if (maxHeap.length > 0) {
            maxHeap[0] = last;

            let i = 0;

            while (true) {
                let largest = i;
                const left = i * 2 + 1;
                const right = i * 2 + 2;

                if (
                    left < maxHeap.length &&
                    maxHeap[left][0] > maxHeap[largest][0]
                ) {
                    largest = left;
                }

                if (
                    right < maxHeap.length &&
                    maxHeap[right][0] > maxHeap[largest][0]
                ) {
                    largest = right;
                }

                if (largest === i) {
                    break;
                }

                [maxHeap[i], maxHeap[largest]] =
                    [maxHeap[largest], maxHeap[i]];

                i = largest;
            }
        }

        return top;
    };

    // 자신의 트윗
    if (this.tweets.has(userId)) {
        const list = this.tweets.get(userId);

        for (
            let i = Math.max(0, list.length - 10);
            i < list.length;
            i++
        ) {
            push(list[i]);
        }
    }

    // 팔로우한 사용자의 트윗
    const followees =
        this.following.get(userId) || new Set();

    for (const followee of followees) {
        if (!this.tweets.has(followee)) {
            continue;
        }

        const list = this.tweets.get(followee);

        for (
            let i = Math.max(0, list.length - 10);
            i < list.length;
            i++
        ) {
            push(list[i]);
        }
    }

    // 최신 트윗부터 최대 10개
    while (maxHeap.length > 0 && result.length < 10) {
        result.push(pop()[1]);
    }

    return result;
};

Twitter.prototype.follow = function(followerId, followeeId) {
    if (!this.following.has(followerId)) {
        this.following.set(followerId, new Set());
    }

    this.following.get(followerId).add(followeeId);
};

Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (this.following.has(followerId)) {
        this.following.get(followerId).delete(followeeId);
    }
};