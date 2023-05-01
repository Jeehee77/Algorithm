/*
  DP
  - dp[n]은 스티커가 2 * n의 형태로 있다고 했을 때 
    n번째 열에서 스티커를 안 고를 경우, 윗칸의 스티커를 고를경우, 아랫칸의 스티커를 고를 경우를 저장한다.
  - dp[n+1]은 다음과 같이 나타낼 수 있다.
    dp[n] 중 최댓값 + 아무것도 안 고른 경우
    Math.max(dp[n][0], dp[n][2]) + n+1열에서 윗칸의 스티커를 고른 경우
    Math.max(dp[n][0], dp[n][1]) + n+1열에서 아랫칸의 스티커를 고른 경우

  ex)
  50 10 100 20 40
  30 50 70 10 60 
  => dp[0] = [0, 50, 30];
  => dp[1] = [50, 30 + 10, 50 + 50] => [50, 40, 100];
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
  const answer = [];

  // N개의 테스트 케이스에 대해 연산
  for (let i = 0; i < N; i++) {
    const length = Number(input[i * 3 + 1]);
    const up = input[i * 3 + 2].split(" ").map(Number);
    const down = input[(i + 1) * 3].split(" ").map(Number);

    const dp = Array.from(Array(length), () => new Array(3).fill(0));
    dp[0] = [0, up[0], down[0]];
    for (let j = 1; j < length; j++) {
      dp[j][0] = Math.max(dp[j - 1][0], dp[j - 1][1], dp[j - 1][2]);
      dp[j][1] = Math.max(dp[j - 1][0], dp[j - 1][2]) + up[j];
      dp[j][2] = Math.max(dp[j - 1][0], dp[j - 1][1]) + down[j];
    }
    let max = Math.max(dp[length - 1][0], dp[length - 1][1], dp[length - 1][2]);
    answer.push(max);
  }

  console.log(answer.join("\n"));
}