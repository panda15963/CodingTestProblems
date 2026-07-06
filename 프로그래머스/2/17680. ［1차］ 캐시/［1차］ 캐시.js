function solution(cacheSize, cities) {

    const cache = [];
    let time = 0;

    if (cacheSize === 0) {
        return cities.length * 5;
    }

    for (let city of cities) {

        city = city.toLowerCase();

        const idx = cache.indexOf(city);

        if (idx !== -1) { // Cache Hit

            cache.splice(idx, 1);
            cache.push(city);

            time += 1;

        } else { // Cache Miss

            if (cache.length === cacheSize) {
                cache.shift();
            }

            cache.push(city);

            time += 5;
        }
    }

    return time;
}