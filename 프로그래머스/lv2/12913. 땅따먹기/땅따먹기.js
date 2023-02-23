function solution(land) {
    
    const getMax = (...args) => {
        let max = 0;
        let nums = typeof args[0] === "object" ? args[0] : args;
        nums.forEach(n => {
            max = n > max ? n : max;
        })
        return max;
    }
    
    // land의 각 자리에 그 자리까지의 최대 점수합을 저장.
    for (let i = 1; i < land.length; i++) {
        land[i][0] += getMax(land[i-1][1], land[i-1][2], land[i-1][3]);
        land[i][1] += getMax(land[i-1][0], land[i-1][2], land[i-1][3]);
        land[i][2] += getMax(land[i-1][0], land[i-1][1], land[i-1][3]);
        land[i][3] += getMax(land[i-1][0], land[i-1][1], land[i-1][2]);
    }
    
    // 마지막줄의 최대값을 반환.
    return getMax(land[land.length-1]);
}