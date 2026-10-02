function decodeString(s: string): string {
    const numStack: number[] = [];
    const stringStack: string[] = [];

    let strCur: string = "";
    let numCur: string = "";

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if ('0' <= char && char <= '9') {
            numCur += char;
        } else if ('a' <= char && char <= 'z') {
            strCur += char;
        } else if (char === '[') {
            stringStack.push(strCur);
            numStack.push(Number(numCur));

            numCur = "";
            strCur = "";
        } else {
            strCur =
                stringStack.pop()! +
                strCur.repeat(numStack.pop()!);
        }
    }

    return strCur;
}