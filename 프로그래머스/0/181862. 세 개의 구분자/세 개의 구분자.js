function solution(myStr) {
    const result = myStr.split(/[abc]/g).filter(str => str !== "");
    return result.length > 0 ? result : ["EMPTY"];
}
