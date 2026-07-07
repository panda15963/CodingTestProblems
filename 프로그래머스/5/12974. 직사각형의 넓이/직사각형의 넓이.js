const MAX = 100000;
const x1=0, y1=1, x2=2, y2=3
const OPEN = 1, CLOSE = -1

var tree = new Uint32Array(MAX*8+1);
var count = new Uint32Array(MAX*8+1);
var weights;

function update(x, start, end, left, right, weight) {

    if(right < start || end < left){
        return;
    } 

    if(left <= start && end <= right){
        count[x] += weight;
    }else{
        var mid = Math.floor((start + end) / 2);
        update(x * 2, start, mid, left, right, weight);
        update(x * 2 + 1, mid + 1, end, left, right, weight);
    }

    if(count[x]){
        tree[x] = weights[end] - weights[start - 1];
    }else{
        if(start == end){
            tree[x] = 0;
        }else{
            tree[x] = tree[x * 2] + tree[x * 2 + 1];
        }
    }
}

function solution(rectangles){

    var ys = new Set

    var infos = []
    rectangles.forEach((rc, i)=>{
        infos.push({x:rc[x1], y1:rc[y1], y2:rc[y2], value:OPEN});
        infos.push({x:rc[x2], y1:rc[y1], y2:rc[y2], value:CLOSE});
        ys.add(rc[y1])
        ys.add(rc[y2])
    });

    infos.sort((a,b)=>a.x - b.x)
    weights = new Uint32Array([... ys].sort((a,b)=>a-b))
    var yIndexes = {}
    for(var x = 0, len = weights.length; x < len; x++){
        yIndexes[weights[x]] = x
    }

    var answer = BigInt(0)
    var last = 0;
    for(var info of infos){
        answer += BigInt(tree[1] * (info.x-last));
        update(1, 1, weights.length-1, yIndexes[info.y1]+1, yIndexes[info.y2], info.value);
        last = info.x;
    }

    return answer;
}