/*
  DP
  - dp[i][j]는 1번부터 i번째까지의 물건들 중 j무게만큼 넣었을 때의 최대 가치를 의미한다.
  - dp[i][j]를 계산할 때 i번째 물건을 넣을 수도 있고, 안 넣을 수도 있다.
    (당연히 j가 i번째 물건의 무게 V보다 작다면 넣을 수 없다.)
  - i번째 물건의 무게와 가치를 W, V라고 할때
    i번째 물건을 안 넣는다면 1~i-1의 범위에서 선택한 경우와 같다. 즉 dp[i-1][j]이다.
    i번째 물건을 넣는다면 1~i-1의 범위의 상태에서 무게를 W만큼 빼주고 가치는 V만큼 더한다.
    즉, dp[i-1][j-W] + V이다.
  - dp[i]는 위 두 경우 중 최대값을 갖게 된다.
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
  const [N, K] = input[0].split(" ").map(Number);
  // 계산하기 편하도록 N과 K가 0인 경우를 포함시킨다.
  const dp = Array.from(Array(N + 1), () => new Array(K + 1).fill(0));
  for (let i = 1; i <= N; i++) {
    let [W, V] = input[i].split(" ").map(Number);

    for (let j = 1; j <= K; j++) {
      if (W > j) {
        // i번째 물건의 무게 W보다 j가 작다면 i번째 물건을 넣을 수 없다.
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j - W] + V, dp[i - 1][j]);
      }
    }
  }
  console.log(dp[N][K]);
}