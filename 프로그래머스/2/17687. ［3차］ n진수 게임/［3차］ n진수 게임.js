function solution(n, t, m, p) {
    var answer = '';
    let totCnt = t * m;
    let str = ""

    for(let i=0; str.length <= totCnt; i++){
        str += i.toString(n)
    }

    for(let j=0; j<str.length; j++){
        if((j+1)%m == (m==p?0:p)){
            answer += str.charAt(j)
        }
    }
    
    return answer.substr(0,t).toUpperCase();
}