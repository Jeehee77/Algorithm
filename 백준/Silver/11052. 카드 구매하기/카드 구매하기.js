/*
  DP
  - dp[n]은 카드 n개를 갖기 위해 지불해야 하는 금액의 최댓값을 의미한다.
  - dp[n]은 아래의 경우 중 최대값이다.
    dp[n-1] + pack[1]
    dp[n-2] + pack[2]
    dp[n-3] + pack[3]
    ...
    dp[1] + pack[n-1]
    pack[n]
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
  N = Number(N);
  arr = arr[0].split(" ").map(Number);
  const pack = [0, ...arr];
  const dp = new Array(N + 1).fill(0);
  dp[1] = pack[1];

  for (let i = 2; i <= N; i++) {
    let max = pack[i];
    for (let j = i - 1; j > 0; j--) {
      let current = dp[j] + pack[i - j];
      if (current > max) max = current;
    }
    dp[i] = max;
  }
  console.log(dp[N]);
}