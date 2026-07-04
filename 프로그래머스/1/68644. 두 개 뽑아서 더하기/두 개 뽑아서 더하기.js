function solution(numbers) {
    const p = [];
    for(let i=0; i<numbers.length; i++){
        for(let j=i+1; j<numbers.length; j++){
            const res = numbers[i]+numbers[j];
            if(!p.includes(res)) p.push(res)
        }
    }
    p.sort((a,b) => a-b);
    return p;
}