/*
  DP
  - dp[i][j]는 길이가 i이고 맨 뒤의 숫자가 j인 계단 수의 개수를 의미한다.
  - dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  - 길이가 i이고 맨 뒤가 j인 계단 수는
    길이가 i-1이고 맨 뒤가 j와 연속된 수에 j를 덧붙여 만들 수 있다.
  - 따라서 dp[i][j]는 dp[i-1][j-1] + dp[i-1][j+1]이다.
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
  const N = Number(input);
  const dp = Array.from(Array(N + 1), () => new Array(10).fill(0));
  // 길이가 1일때의 값 초기화
  for (let k = 1; k <= 9; k++) {
    dp[1][k] = 1;
  }

  for (let i = 2; i <= N; i++) {
    for (let j = 0; j <= 9; j++) {
      if (j > 0) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % 10 ** 9;
      }
      if (j < 9) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j + 1]) % 10 ** 9;
      }
    }
  }
  console.log(dp[N].reduce((acc, cur) => (acc + cur) % 10 ** 9));
}