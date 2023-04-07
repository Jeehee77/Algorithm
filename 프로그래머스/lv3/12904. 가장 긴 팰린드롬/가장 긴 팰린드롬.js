function solution(s) {
    /*
        DP 이용하기
        - 문자열 s에 대해 dp[i][j]는 i부터 j까지의 문자열이 palindrome인지 여부를 저장한다.
        - s[i-1]과 s[j+1]이 같고 dp[i][j]가 true라면 dp[i-1][j+1]도 true이다.
    */
    const dp = Array.from(Array(s.length), () => Array(s.length).fill(0));
    dp.forEach((value, index) => {
        dp[index][index] = true;
    })
    
    let max = 1;
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j < s.length; j++) {
            if (checkPalindrome(s, i, j, dp)) {
                max = Math.max(max, j - i + 1);
            }
        }
    }
    // console.log(dp)
    return max;
}

function checkPalindrome(s, start, end, memo) {
    if (s[start] === s[end]) {
        if (end - start === 1) {
            memo[start][end] = true;
        } else {
            if (memo[start+1][end-1] === 0) {
                memo[start][end] = checkPalindrome(s, start+1, end-1, memo);
            } else {
                memo[start][end] = memo[start+1][end-1];
            }
        }
    } else {
        memo[start][end] = false;
    }
    
    return memo[start][end];
}