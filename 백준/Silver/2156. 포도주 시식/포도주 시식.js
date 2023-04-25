/*
  DP
  - dp[i]는 i번째 포도주까지 있을 때 마실 수 있는 포도주의 최대값을 의미한다.
  - 연속된 세 잔 중 한 잔은 무조건 선택되지 않아야 한다.
  - dp[i]
    - i번째가 선택되지 않은 경우 => dp[i] = dp[i-1]
    - (i-1)번째가 선택되지 않은 경우 => dp[i] = dp[i-2] + wine[i]
    - (i-2)번째가 선택되지 않은 경우 => dp[i] = dp[i-3] + wine[i-1] + wine[i]
  - 위 세 가지 상황 중 가장 dp[i]가 큰 값을 가지는 경우를 선택한다.
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
  const wine = arr.map(Number);
  const dp = new Array(N);

  // 포도주 잔 개수가 2 이하일 때
  if (N === 1) {
    console.log(wine[0]);
    return;
  } else if (N === 2) {
    console.log(wine[0] + wine[1]);
    return;
  }

  // dp 초기값 할당
  dp[0] = wine[0];
  dp[1] = dp[0] + wine[1];
  dp[2] = Math.max(dp[1], dp[0] + wine[2], wine[1] + wine[2]);

  let first = 0;
  let second = 0;
  let third = 0;
  for (let i = 3; i < N; i++) {
    first = dp[i - 1];
    second = dp[i - 2] + wine[i];
    third = dp[i - 3] + wine[i - 1] + wine[i];
    dp[i] = Math.max(first, second, third);
  }

  console.log(dp[N - 1]);
}