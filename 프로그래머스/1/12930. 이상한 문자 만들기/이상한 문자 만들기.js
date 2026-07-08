function solution(s) {
    return s.split(' ').map(word => {
        return word.split('').map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');
    }).join(' ');
}
