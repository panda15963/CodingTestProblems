const largestAltitude = function(gain) {
    let altitudes = 0
    
    const sum = gain.reduce((prev, curr) => {
        if(prev > altitudes)
            altitudes = prev
        return prev + curr
    }, 0)
    
    return altitudes > sum ? altitudes : sum
};