/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    let obj = {}
    let newWord = word.toLowerCase()
    for(let i=0; i<word.length; i++) { 
        if(!obj[newWord[i]]) {
            if(newWord[i] !== word[i]) {
                if(word.includes(newWord[i])) obj[newWord[i]] = true
            }else {
                if(word.includes(newWord[i].toUpperCase())) obj[newWord[i]] = true
            }
        }
    }

    return Object.values(obj).length
};