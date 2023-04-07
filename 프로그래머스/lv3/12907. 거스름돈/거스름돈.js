function solution(n, money) {
    /*
        DP 이용하기 (범위를 나누어 생각하기)
       
        - n을 거슬러 주는 방법의 수를 dp[n]이라고 한다.
        - money 배열이 [1, 2, 5]이고, n이 5일때
        dp[5]는 (1원 1개와 4원을 거슬러 주는 방법) + (2원 1개와 3원을 거슬러 주는 방법)
        + (5원 1개와 0원을 거슬러 주는 방법)이라고 볼 수 있다.
        => dp [5] = dp[5 - 1] + dp[5 - 2] + dp[5 - 5]
    */
    
    // 1원부터 n원까지 i원을 거슬러 주는 방법의 개수를 저장하고 있는 배열
    const dp = new Array(n+1).fill(0);
    dp[0] = 1;
    money.forEach((current) => {
        for (let i = current; i <= n; i++) {
            dp[i] += dp[i - current];
        }
    })
    return dp[n];
}