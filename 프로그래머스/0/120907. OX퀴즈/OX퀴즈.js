function solution(quiz) {
    return quiz.map(eq => {
        const [xStr, op, yStr, , zStr] = eq.split(" ");
        const x = Number(xStr);
        const y = Number(yStr);
        const z = Number(zStr);

        let result;
        if (op === "+") result = x + y;
        else if (op === "-") result = x - y;

        return result === z ? "O" : "X";
    });
}
