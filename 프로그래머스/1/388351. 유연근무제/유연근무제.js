function solution(schedules, timelogs, startday) {
    let result = 0;
    schedules.forEach((e,i)=> {
        const hour = Math.floor(e / 100);
        const minute = e % 100;
        const time_value = (hour * 60) + minute;
        let flag = true;
        for(let j=0; j<7; j++){
            const now_day = (startday + j) % 7;
            const now_value = Math.floor(timelogs[i][j]/100) * 60 + timelogs[i][j] % 100;
            if(now_day === 0 || now_day === 6) {
                continue;
            }
            if(now_value > time_value + 10) {
                flag = false;
                break;
            }
        }
        if(flag) result++;
    })
    return result;
}