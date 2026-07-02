function solution(absolutes, signs) {
    let sum = 0;
    
    for(let i = 0; i < absolutes.length; i++){
        let num = absolutes[i];
        let isPositive = signs[i];
        
        // signs[i]가 true이면 양수
        if(isPositive){
            sum += num;
        } else {
            // false이면 음수이다.
            sum -= num;
        }
    }
    
    return sum;
}