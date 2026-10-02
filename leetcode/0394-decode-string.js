/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    // num 값
    const numStack = []
    // bracket 바깥
    const outOfBracket = []
    
    let strCur = ""
    let numCur = ""
    for(let i=0; i<s.length; i++) {
        if('0' <= s[i] && s[i] <='9') {
           numCur = numCur + s[i]
        } else if('a' <= s[i] && s[i] <='z') {
            strCur = strCur + s[i]
        } else if(s[i] === '[') {
            outOfBracket.push(strCur)
            numStack.push(+numCur)
            numCur = ""
            strCur = ""
        } else {
            strCur = outOfBracket.pop() + strCur.repeat(numStack.pop()) 
        }
    }

    return strCur
};