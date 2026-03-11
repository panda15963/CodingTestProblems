function solution(rank, attendance) {
    let new_rank = [];
    for(let i=0; i<rank.length; i++){
        if(attendance[i]){
            new_rank.push(rank[i]);
        }
    }
    new_rank.sort((a, b) => a-b);
    console.log(new_rank);
    
    function rank_idx(idx){
        return rank.indexOf(new_rank[idx]);
    }
    
    return 10000 * rank_idx(0) + 100 * rank_idx(1) + rank_idx(2);
    
}