/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let ascS = 0;
    let ascT = t.charCodeAt(t.length-1);
    for(let i=0; i<s.length; i++){
        ascS += s.charCodeAt(i);
        ascT += t.charCodeAt(i);
    }
    return String.fromCharCode(ascT - ascS);
};