/*
  DP
  - dp[i][j]는 i개의 집들을 칠하고 마지막집이 j색깔인 경우의 최솟값을 나타낸다. r: 0, g: 1, b: 2
  - i번째 집을 칠하는 최소비용은 dp[i][0], dp[i][1], dp[i][2] 중 최솟값이다.
  - dp[i][0] = dp[i][0] + Math.min(dp[i-1][1], dp[i-1][2])
    (i번째 집을 0번으로 칠하는 최소비용은 i-1번째 집을 1번 혹은 2번으로 칠한 비용 중 최솟값에 현재 비용을 더한 값이다.)
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
  const [N, ...house] = input;
  const dp = house.map((str) => str.split(" ").map(Number));

  // i번째 집의 색깔로 r, g, b를 선택한 경우 각각의 상황을 계산한다.
  for (let i = 1; i < N; i++) {
    dp[i][0] += Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] += Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] += Math.min(dp[i - 1][0], dp[i - 1][1]);
  }
  console.log(Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]));
}