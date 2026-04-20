function solution(n, tops) {
    // n번째 삼각형이 case 0 ~ 2일 때, n번째까지의 누적 경우의 수 배열
    const case0to2 = Array(n).fill(1);
    // n번째 삼각형이 case 3일 때, n번째까지의 누적 경우의 수 배열
    const case3 = Array(n).fill(1);
    
    // 첫 번째 삼각형에서 가능한 case의 개수
    case0to2[0] = tops[0] ? 3 : 2;
    case3[0] = 1;
    for(let i = 1; i < n; i++) {
        if(tops[i]){
            case0to2[i] = (case0to2[i - 1] * 3 + case3[i - 1] * 2) % 10007
        } else {
            case0to2[i] = (case0to2[i - 1] * 2 + case3[i - 1]) % 10007
        }
        // case 3의 경우, 삼각형 존재여부와 관계없이 동일
        case3[i] = (case0to2[i - 1] + case3[i - 1]) % 10007
    }
    //  현재 삼각형이 case 0 ~ 2인 누적 경우의 수 + case 3인 누적 경우의 수
    return (case0to2[n - 1] + case3[n - 1]) % 10007;
}