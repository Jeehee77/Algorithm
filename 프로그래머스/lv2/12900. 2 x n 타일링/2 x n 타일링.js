function solution(n) {
    /* DP - 문제의 크기를 분할하여 생각하기
    
    - 2 * n의 직사각형을 채우는 방법을 cases[n]이라고 한다.
    - 2*n의 직사각형은 2*(n-1)의 직사각형을 채운 후 맨 앞에 2*1크기의 타일을 놓은 것과 같다.
    - 2*n의 직사각형은 2*(n-2)의 직사각형을 채운 후 맨 앞에 1*2크기의 타일 2개를 놓은 것과 같다.
    -> 따라서 cases[n] = cases[n-1] + cases[n-2]이다. (단, cases[1] = 1, cases[2] = 2)
    
    */
    
    const cases = [];
    cases[0] = 0;
    cases[1] = 1;
    cases[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        cases[i] = (cases[i-1] + cases[i-2]) % 1000000007;
    }
    
    return cases[n];
}