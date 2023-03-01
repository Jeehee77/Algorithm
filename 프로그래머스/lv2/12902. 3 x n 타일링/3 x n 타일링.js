function solution(n) {
    /* DP - 점화식
    
    - 3*n크기의 타일을 채우는 방법의 수를 cases[n]이라고 한다.
    - n이 홀수인 경우 cases[n] = 0이다.
    - cases[2]는 3이다.
    - 모두 3 * 2씩 끊어진 형태로 채워지지는 않는다. 
    - n이 2씩 늘어날때마다 3*2씩 끊어지지 않는 형태로 타일을 채우는 방법이 2개씩 생긴다.
    (ex. 문제 설명에서 n=4인 경우 마지막 그림 2개)
    
    1. 3*n크기의 타일은 3*(n-2)의 타일의 오른쪽에 2칸짜리 타일을 붙인 것과 같다. (3*2씩 끊어진 형태)
    2. 3*n크기의 타일은 3*(n-4)의 타일의 왼쪽에 3*(n-2)크기 타일의 새로운 형태 2개를 붙인 것과 같다.
    3. n-2가 0이 될때까지 2씩 빼주면서 2번의 과정을 반복한다.
    4. 마지막으로 3 * n 타일의 새로운 형태 2개를 더해준다.
    -> cases[n] = 3*cases[n-2] + 2*cases[n-4] + 2*cases[n-6] + ... + 2*cases[2] + 2;
    -> cases[n] = 3*cases[n-2] + 2*(cases[n-4] + cases[n-6] + ... + cases[2] + 1);
    
    - 점화식을 편리하게 계산하기 위하여 마지막 cases[0]에 1을 저장한다.
    -> cases[n] = 3*cases[n-2] + 2*(cases[n-4] + cases[n-6] + ... + cases[2] + cases[0]);
    
    */
    
    const cases = [];
    cases[0] = 1;
    cases[1] = 0;
    cases[2] = 3;
    
    for (let i = 3; i <= n; i++) {
        if (i % 2 === 0) {
            cases[i] = 3 * cases[i-2];
            for (let j = i-4; j >= 0; j -= 2) {
                cases[i] += 2 * cases[j];
            }
            cases[i] %= 1000000007;
        } else cases[i] = 0;
    }
    
    return cases[n];
}