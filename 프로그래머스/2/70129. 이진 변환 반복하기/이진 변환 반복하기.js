function solution(s) {
    const ans = [0, 0];
    while(s !== '1'){
        const cnt = s.match(/1/g).length;
        ans[0]++;
        ans[1] += s.length - cnt;
        s = cnt.toString(2);
    }
    
    return ans;
}