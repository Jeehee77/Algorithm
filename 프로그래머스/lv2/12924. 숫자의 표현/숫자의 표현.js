function solution(n) {
    // 시간복잡도 O(N^2)
    var answer = 0;
    
    for (let i = 1; i <= n; i++) {
        let sum = 0;
        for (let j = i; j <=n; j++) {
            sum += j;
            
            if (sum >= n) {
                answer = sum === n ? answer + 1 : answer;
                break;
            }
        }
    }
    
    return answer;
}