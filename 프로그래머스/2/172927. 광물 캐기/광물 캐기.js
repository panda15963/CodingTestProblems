function solution(picks, minerals) {
    let answer = 0;
    //곡괭이 없는 경우
    if(picks[0] === 0 && picks[1] === 0 && picks[2] === 0) return answer;
    let count = Math.ceil(minerals.length / 5);
    //총 곡괭이 갯수
    let pickLen = picks.reduce((a, b) => a + b);
    //곡괭이로 캐지 못하는 광물 삭제하기
    minerals = minerals.splice(0, pickLen * 5);
    
    let groups = [];
    for(let i = 0; i < count; i++){
        let m = {diamond: 0, iron: 0, stone: 0};
        minerals.splice(0, 5).map((mineral) => {
            m[mineral]++;
        });
        
        groups.push([m.diamond + m.iron + m.stone, m.diamond * 5 + m.iron + m.stone, m.diamond * 25 + m.iron * 5 + m.stone]);
    }
    
    groups = groups.sort((a, b) => b[2] - a[2])
    for(let j = 0; j < picks.length; j++){
        let pickCount = picks[j];
        while(pickCount--){
            if(groups.length === 0){
                return answer;
            }
            answer += groups.shift()[j];
        }
    }
    
    return answer;
}