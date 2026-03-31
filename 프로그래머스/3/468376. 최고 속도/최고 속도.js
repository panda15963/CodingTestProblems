function intersect(x1, y1, x2, y2, x11, y11, x22, y22) {
    const type1 = x1 === x2 ? "column" : "row";
    const type2 = x11 === x22 ? "column" : "row";

    if(type1 === type2) return null;

    const x = type1 === "column" ? x1 : x11;
    const y = type1 === "column" ? y11 : y1;

    if(x1 <= x && x <= x2 && y1 <= y && y <= y2) {
        if(x11 <= x && x <= x22 && y11 <= y && y <= y22) return [x, y];
    }

    return null;
}

function getLimit(x, y, camera) {
    const key = x + "|" + y;

    if(camera.has(key)) return camera.get(key);
    return Infinity;
}

function solution(city, road) {
    const map = new Map();
    const result = new Map();
    const camera = new Map();

    for (let [x1, y1, x2, y2, limit] of road) {
        const x = (x1 + x2) / 2;
        const y = (y1 + y2) / 2;
        const key = x + "|" + y;

        if (!camera.has(key)) camera.set(key, limit);
        camera.set(key, Math.min(camera.get(key), limit));
    }

    for(let [x1, y1, x2, y2, limit] of road) {
        const arr = [];

        arr.push([x1, y1, getLimit(x1, y1, camera)]);
        arr.push([x2, y2, getLimit(x2, y2, camera)]);

        arr.push([(x1+x2)/2, (y1+y2)/2, getLimit((x1+x2)/2, (y1+y2)/2, camera)]);

        for(let [x, y] of city) {
            if(x1 <= x && x <= x2 && y1 <= y && y <= y2) arr.push([x, y, getLimit(x, y, camera)]);
        }

        for(let [x11, y11, x22, y22] of road) {
            const node = intersect(x1, y1, x2, y2, x11, y11, x22, y22);
            if(node) arr.push([...node, getLimit(node[0], node[1], camera)]);
        }

        if(x1 === x2) arr.sort((a,b)=>a[1]-b[1]);
        if(y1 === y2) arr.sort((a,b)=>a[0]-b[0]);

        for(let i = 0; i < arr.length-1; i++) {
            const key1 = arr[i][0] + "|" + arr[i][1];
            const key2 = arr[i+1][0] + "|" + arr[i+1][1];
            const limit = Math.min(arr[i][2], arr[i+1][2]);

            if(key1 === key2) continue;

            if(!map.has(key1)) map.set(key1, []);
            if(!map.has(key2)) map.set(key2, []);
            map.get(key1).push([key2, limit]);
            map.get(key2).push([key1, limit]);
        }
    }

    const queue = [];
    const key = city[0][0] + "|" + city[0][1];
    queue.push(key);
    result.set(key, Infinity);

    while(queue.length > 0) {
        const current = queue.shift();
        for(let [next, limit] of map.get(current) || []) {
            if(!result.has(next) || result.get(next) < Math.min(result.get(current), limit)) {
                queue.push(next);
                result.set(next, Math.min(result.get(current), limit));
            }
        }
    }

    return city.slice(1).map(v => {
        const key = v[0] + "|" + v[1];
        return result.get(key) === Infinity ? 0 : result.get(key);
    })
}