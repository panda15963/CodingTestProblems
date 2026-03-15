var minPartitions = function(n) {
    return Math.max(...n.split('').map(c => +c));
};
