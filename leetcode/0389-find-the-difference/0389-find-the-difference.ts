function findTheDifference(s: string, t: string): string {
    let ascS: number = 0;
    let ascT: number = t.charCodeAt(t.length - 1);

    for (let i = 0; i < s.length; i++) {
        ascS += s.charCodeAt(i);
        ascT += t.charCodeAt(i);
    }

    return String.fromCharCode(ascT - ascS);
}