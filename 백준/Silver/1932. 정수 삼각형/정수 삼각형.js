/*
  DP
  - dp[i][j]는 (0, 0)부터 (i, j) 까지의 경로에 있는 수들의 합의 최대값을 의미한다.
  - dp[i][j]는 dp[i-1][j-1]와 dp[i-1][j] 중 큰 수에 (i, j) 위치의 수를 더한 값이다.
  ((0,0)부터 수를 선택할 때 현재층에서 대각선 왼쪽, 오른쪽 자식만 선택할 수 있기 때문이다.)
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
  let [N, ...arr] = input;
  const nums = arr.map((str) => str.split(" ").map(Number));
  for (let i = 1; i < N; i++) {
    for (let j = 0; j <= i; j++) {
      // nums[i][j]의 직전 수는 nums[i-1][j-1]과 nums[i-1][j]가 될 수 있다.
      // nums[i-1][j-1]과 nums[i-1][j]중 큰 수 고르기
      let max;
      if (j - 1 < 0) {
        max = nums[i - 1][j];
      } else if (j > i - 1) {
        max = nums[i - 1][j - 1];
      } else {
        max = Math.max(nums[i - 1][j - 1], nums[i - 1][j]);
      }
      nums[i][j] += max;
    }
  }
  console.log(nums[N - 1].sort((a, b) => b - a)[0]);
}