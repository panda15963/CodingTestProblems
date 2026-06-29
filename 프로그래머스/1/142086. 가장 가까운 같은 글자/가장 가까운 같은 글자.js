function solution(s) {
    
    var answer_arr = [];
    var s_str = s; //substr함수를 쓰기 위해 문자열 형태의 변수를 만들었다.
    s = s.split('');
    
    for(var i=0;i<s.length;i++) {
        var answer = -1; //중복 문자가 없으면 -1을 반환하기 위해
        for(var j=0;j<i;j++) {
            if(s[i] == s[j]) { //중복 문자가 있으면
                //기준 인덱스에 비교 인덱스를 뺀 값을 추출한다.
                answer = i - s_str.substr(0, i).lastIndexOf(s[j]); 
            }    
        }
        //가장 큰 인덱스가 남아 배열에 저장된다.
        answer_arr.push(answer);
    }
   
    return answer_arr;
}