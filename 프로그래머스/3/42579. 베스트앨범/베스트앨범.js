function solution(genres, plays) {
    const genreTotal = {};
    const genreSongs = {};
    
    // 장르별 총합과 노래 목록 계산
    for (let i = 0; i < genres.length; i++) {
        const g = genres[i];
        genreTotal[g] = (genreTotal[g] || 0) + plays[i];
        if (!genreSongs[g]) genreSongs[g] = [];
        genreSongs[g].push([plays[i], i]);
    }
    
    // 장르 총합 내림차순 정렬
    const sortedGenres = Object.keys(genreTotal).sort((a, b) => genreTotal[b] - genreTotal[a]);
    
    const answer = [];
    for (let g of sortedGenres) {
        // 각 장르 노래 재생수 내림차순, 번호 오름차순 정렬 후 상위 2개
        genreSongs[g].sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);
        answer.push(genreSongs[g][0][1]);
        if (genreSongs[g].length > 1) answer.push(genreSongs[g][1][1]);
    }
    
    return answer;
}
