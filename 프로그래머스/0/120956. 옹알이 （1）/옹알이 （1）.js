function solution(babbling) {
    const words = ["aya", "ye", "woo", "ma"];
    return babbling.filter(b => {
        let temp = b;
        for (let w of words) {
            temp = temp.replaceAll(w, " ");
        }
        return temp.trim() === "";
    }).length;
}
