function solution(id_pw, db) {
    const [id, pw] = id_pw;
    for (let [dbId, dbPw] of db) {
        if (dbId === id) {
            return dbPw === pw ? "login" : "wrong pw";
        }
    }
    return "fail";
}
