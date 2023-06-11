/*
    - 걸리는 시간을 이분탐색을 통하여 구한다.
    - a ~ b가 있을 때 중간값 mid를 구한다.
      - mid시간 동안 n명 심사가 가능하면 범위를 a ~ mid로 변경한다.
      - n명 심사가 불가능하면 범위를 mid+1 ~ b로 변경한다.
    - 최종 범위 a ~ b에서 최솟값인 a를 반환한다.
*/
function solution(n, times) {   
    let a = 0;
    let b = 10 ** 13;
    
    // 이분탐색
    while (a < b) {
        let mid = Math.floor((a + b) / 2);
        if (isPossible(n, times, mid)) {
            b = mid;
        } else {
            a = mid + 1;
        }
    }
    
    // n명 심사 가능한 범위 중 가장 작은 값 반환
    return a;
}

function isPossible(n, times, target) {
    // target 시간동안 각 심사관이 몇명을 심사할 수 있는지 계산하여 총 심사 가능한 사람의 수를 구한다.
    let total = times.map(t => Math.floor(target / t))
        .reduce((acc, cur) => acc + cur, 0);
    return total >= n;
}