/*
  DP
  - dp[n]은 동물원의 크기가 2 * N일 때 사자를 배치하는 경우의 수를 말한다.
  - dp[n]은 
    N번째 줄에 사자를 배치하지 않을 경우 a, 
    N번째 줄 왼쪽 칸에 배치할 경우 b, 
    N번째 줄 오른쪽 칸에 배치할 경우 c
    이렇게 세 가지 경우를 가질 수 있다. => dp[n] = [a, b, c]와 같이 표현한다.
  - N번째 줄에 사자를 배치하지 않는 것은 N-1번째 줄이 어떤 상황이든 가능하기 때문에
    dp[n][0]은 dp[n-1]의 모든 경우의 수의 합과 같다.
  - N번째 줄 왼쪽 칸에 사자를 배치하려면 N-1번째 줄에서 왼쪽 칸에 사자를 배치하면 안되기 때문에
    dp[n][1] = dp[n-1][0] + dp[n-1][2]이다.
  - N번째 줄 오른쪽 칸에 사자를 배치하려면 N-1번째 줄에서 오른쪽 칸에 사자를 배치하면 안되기 때문에
    dp[n][2] = dp[n-1][0] + dp[n-1][1]이다.
*/

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

function solution(input) {
  const N = Number(input[0]);
  const dp = Array.from(Array(N + 1), () => new Array(3).fill(0));
  // 초기값 할당. 2 * 1 크기인 경우 각 경우의 수가 1이다.
  dp[1] = [1, 1, 1];

  for (let i = 2; i <= N; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % 9901;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % 9901;
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % 9901;
  }

  const answer = (dp[N][0] + dp[N][1] + dp[N][2]) % 9901;
  console.log(answer);
}