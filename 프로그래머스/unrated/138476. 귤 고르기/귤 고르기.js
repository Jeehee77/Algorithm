function solution(k, tangerine) {
    // 귤의 크기별 개수를 저장.
    const size = {};
    tangerine.forEach(t => {
        if (!size[t]) {
            size[t] = 0;
        }
        size[t] += 1;
    })
    
    // 개수가 많은 순으로 정렬 후 순서대로 result에 넣고 k개가 되면 크기 종류를 반환.
    const size_arr = Object.entries(size).sort((a, b) => b[1] - a[1]);
    let result = []; // 크기 종류를 저장
    let sum = 0; // 귤의 개수
    for (i = 0; i < size_arr.length; i++) {
        result.push(size_arr[i][0]);
        sum += Number(size_arr[i][1]);
        if (sum >= k) {
            break;
        }
    }
    
    return result.length;
}