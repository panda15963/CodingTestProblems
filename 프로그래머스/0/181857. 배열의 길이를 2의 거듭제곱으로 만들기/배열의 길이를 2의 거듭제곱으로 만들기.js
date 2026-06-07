function solution(arr) {
    let length = 1;

    while (length < arr.length) {
        length *= 2;
    }

    const result = new Array(length).fill(0);

    for (let i = 0; i < arr.length; i++) {
        result[i] = arr[i];
    }

    return result;
}