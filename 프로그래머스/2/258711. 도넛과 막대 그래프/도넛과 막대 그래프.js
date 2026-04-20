function solution(edges) {
    let nodeInfo = {};
    let createdNode = 0;
    let donuts = 0, sticks = 0, eights = 0;

    // 1. 간선 정보 분석 (나가는 간선, 들어오는 간선)
    for (let [from, to] of edges) {
        if (!nodeInfo[from]) nodeInfo[from] = [0, 0]; // [out, in]
        if (!nodeInfo[to]) nodeInfo[to] = [0, 0];
        nodeInfo[from][0]++;
        nodeInfo[to][1]++;
    }

    // 2. 생성된 정점 찾기 및 그래프 판별
    for (let node in nodeInfo) {
        let [out, in_] = nodeInfo[node];
        
        // 생성된 정점: 나가는 간선 2개 이상, 들어오는 간선 0개
        if (out >= 2 && in_ === 0) {
            createdNode = Number(node);
        } 
        // 막대 그래프: 나가는 간선 0개 (끝 노드)
        else if (out === 0) {
            sticks++;
        }
        // 8자 그래프: 나가는 간선 2개, 들어오는 간선 2개 이상 (중앙 노드)
        else if (out >= 2 && in_ >= 2) {
            eights++;
        }
    }
    
    // 3. 도넛 그래프 개수 계산
    // 도넛 = 총 그래프 개수 - (막대 + 8자)
    donuts = nodeInfo[createdNode][0] - sticks - eights;
    
    return [createdNode, donuts, sticks, eights];
}
