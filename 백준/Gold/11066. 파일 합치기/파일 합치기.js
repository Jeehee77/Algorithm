/*
  DP
  - dp[i][j]는 i번째 파일부터 j번째 파일까지 합쳤을 때 최소비용을 나타낸다.
  - dp[i][j] 구하기
    dp[i][j]는 i와 j 사이의 임의의 숫자 k가 존재할 때,
    i번째부터 k번째까지 합치고, k+1번째부터 j번째까지 합친 후 두 임시파일을 합쳐서 구할 수 있다.
    -> dp[i][k] + dp[k+1][j] + (i번부터 j번파일의 총합)
    -> 이 중 최소값이 dp[i][j]가 된다.
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
  const size = Number(input[0]);
  let dp;
  const sum = new Array(501).fill(0);

  const result = [];
  for (let i = 1; i < input.length; i += 2) {
    let K = Number(input[i]);
    const files = input[i + 1].split(" ").map(Number);
    // sum 배열 초기화
    for (let j = 1; j <= K; j++) {
      sum[j] = sum[j - 1] + files[j - 1];
    }
    // dp 초기화
    dp = Array.from(Array(K + 1), () => new Array(K + 1).fill(0));
    // dp[1][K] 구하기
    let answer = combineFiles(1, K);
    result.push(answer);
  }
  console.log(result.join("\n"));

  function combineFiles(a, b) {
    if (a === b) {
      dp[a][b] = 0;
      return dp[a][b];
    } else if (a + 1 === b) {
      dp[a][b] = sum[b] - sum[a - 1];
      return dp[a][b];
    } else {
      let min = Infinity;
      for (let k = a; k < b; k++) {
        if (!dp[a][k]) {
          dp[a][k] = combineFiles(a, k);
        }
        if (!dp[k + 1][b]) {
          dp[k + 1][b] = combineFiles(k + 1, b);
        }
        min = Math.min(min, dp[a][k] + dp[k + 1][b] + sum[b] - sum[a - 1]);
      }
      dp[a][b] = min;
      return dp[a][b];
    }
  }
}