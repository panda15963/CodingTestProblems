function solution(m, musicinfos) {

    const result = [];

    const mList = parseMelody(m);

    for (let i = 0; i < musicinfos.length; i++) {

        const info = musicinfos[i].split(",");

        const [startH, startM] = info[0].split(":").map(Number);
        const [endH, endM] = info[1].split(":").map(Number);

        const playTime = (endH - startH) * 60 + (endM - startM);

        const melody = parseMelody(info[3]);

        const played = [];

        const a = Math.floor(playTime / melody.length);
        const b = playTime % melody.length;

        if (playTime >= melody.length) {

            for (let k = 0; k < a; k++) {
                played.push(...melody);
            }

            for (let k = 0; k < b; k++) {
                played.push(melody[k]);
            }

        } else {

            for (let k = 0; k < b; k++) {
                played.push(melody[k]);
            }
        }

        for (let k = 0; k <= played.length - mList.length; k++) {

            let same = true;

            for (let j = 0; j < mList.length; j++) {
                if (played[k + j] !== mList[j]) {
                    same = false;
                    break;
                }
            }

            if (same) {
                result.push({
                    order: i,
                    playTime,
                    title: info[2]
                });
                break;
            }
        }
    }

    if (result.length === 0) {
        return "(None)";
    }

    result.sort((a, b) => {

        if (a.playTime !== b.playTime) {
            return b.playTime - a.playTime;
        }

        return a.order - b.order;
    });

    return result[0].title;
}

function parseMelody(str) {

    const list = [];

    for (let i = 0; i < str.length; i++) {

        if (i + 1 < str.length && str[i + 1] === '#') {
            list.push(str[i] + '#');
            i++;
        } else {
            list.push(str[i]);
        }
    }

    return list;
}