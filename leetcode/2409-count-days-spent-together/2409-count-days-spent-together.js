var countDaysTogether = function(arriveAlice, leaveAlice, arriveBob, leaveBob) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const a = arriveAlice < arriveBob ? arriveBob : arriveAlice;
    const b = leaveAlice < leaveBob ? leaveAlice : leaveBob;

    const x = f(a);
    const y = f(b);

    return Math.max(y - x + 1, 0);

    function f(s) {
        const month = parseInt(s.substring(0, 2), 10) - 1;
        let res = 0;

        for (let j = 0; j < month; ++j) {
            res += days[j];
        }

        res += parseInt(s.substring(3), 10);
        return res;
    }
};