function solution(numbers, target) {
    var answer = 0;
    
    // numbers의 0번부터 순서대로 연산자를 선택하여 계산한 결과가 target이면 answer에 1을 더한다.
    const dfs = (cur, total, str) => {
        if (cur === numbers.length) {
            if (total === target) {
                answer = answer + 1;
            }
            return;
        }
        
        dfs(cur + 1, total - numbers[cur]);
        dfs(cur + 1, total + numbers[cur]);
    }
    dfs(0, 0);
    return answer;
}