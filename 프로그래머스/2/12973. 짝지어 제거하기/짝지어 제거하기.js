function solution(s){
    let answer = [];
    for(var i=0; i<s.length; i++){
        answer[answer.length-1] != s[i] ? answer.push(s[i]) : answer.pop();
    }
    
    return answer.length == 0 ? 1 : 0 ;
}