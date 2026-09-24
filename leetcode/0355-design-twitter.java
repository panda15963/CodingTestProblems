import java.util.*;

class Twitter {
    private final Map<Integer, Set<Integer>> following;
    private final Map<Integer, List<int[]>> tweets;
    private int time;

    public Twitter() {
        following = new HashMap<>();
        tweets = new HashMap<>();
        time = 0;
    }

    public void postTweet(int userId, int tweetId) {
        tweets.putIfAbsent(userId, new ArrayList<>());
        tweets.get(userId).add(new int[]{time++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        List<Integer> result = new ArrayList<>();

        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(b[0], a[0])
        );

        // 자기 자신의 트윗
        if (tweets.containsKey(userId)) {
            List<int[]> list = tweets.get(userId);
            for (int i = Math.max(0, list.size() - 10); i < list.size(); i++) {
                pq.offer(list.get(i));
            }
        }

        // 팔로우 중인 사용자들의 트윗
        Set<Integer> followees =
            following.getOrDefault(userId, Collections.emptySet());

        for (int followee : followees) {
            if (!tweets.containsKey(followee)) {
                continue;
            }

            List<int[]> list = tweets.get(followee);

            for (int i = Math.max(0, list.size() - 10); i < list.size(); i++) {
                pq.offer(list.get(i));
            }
        }

        while (!pq.isEmpty() && result.size() < 10) {
            result.add(pq.poll()[1]);
        }

        return result;
    }

    public void follow(int followerId, int followeeId) {
        following.putIfAbsent(followerId, new HashSet<>());
        following.get(followerId).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        if (following.containsKey(followerId)) {
            following.get(followerId).remove(followeeId);
        }
    }
}