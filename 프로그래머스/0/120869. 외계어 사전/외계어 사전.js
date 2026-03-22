function solution(spell, dic) {
    const spellStr = spell.sort().join('');
    return dic.some(word => word.length === spell.length && 
                          [...word].sort().join('') === spellStr) ? 1 : 2;
}