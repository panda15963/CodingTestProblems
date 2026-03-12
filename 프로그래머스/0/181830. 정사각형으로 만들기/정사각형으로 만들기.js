function solution(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    const target = Math.max(rows, cols);
    
    return arr.map(row => [...row, ...Array(target - cols).fill(0)])
              .concat(Array(target - rows).fill()
                      .map(() => Array(target).fill(0)));
}
