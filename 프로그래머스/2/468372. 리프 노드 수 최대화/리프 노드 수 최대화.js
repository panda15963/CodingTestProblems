function solution(dist_limit, split_limit) {
    var answer = 0;

    if (dist_limit === 0) return 1;

    const dfs = (childrenCnt, dist, split) => {

        for (let i = 2; i <= 3; i++) {
            if (split * i > split_limit) {
                answer = Math.max(answer, childrenCnt);
                continue;
            }

            if (dist + childrenCnt > dist_limit) {
                const remainDist = dist_limit - dist
                answer = Math.max(answer, childrenCnt + (remainDist * (i - 1)));
                continue;
            }

            dfs(childrenCnt * i, dist + childrenCnt, split * i);
        }
    }

    dfs(1, 0, 1);

    return answer;
}