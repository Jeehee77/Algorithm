/*
  트리에서의 DP
  - dp[n] = [n번마을이 우수마을이 아닌 경우의 최대값, n번마을이 우수마을인 경우의 최대값]
  - dp[n] 계산하기
    1.n번마을과 인접하고 아직 방문하지 않은 마을 m을 찾는다.
    2.m에 대해 dp[m]을 계산하는 함수를 재귀호출하여 dp[m]을 구한다.
    3.dp[m]을 이용하여 dp[n]을 구한다.
    - dp[n][0]은 n번 마을이 우수마을이 아니므로 m은 우수마을이 될 수도 있고, 아닐수도 있다.
      따라서 dp[m][0], dp[m][1] 중 최댓값을 더해준다.
    - dp[n][1]은 n번 마을이 우수마을이므로 m은 우수마을일 수 없다. 
      따라서 dp[m][0]을 더해준다.
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
  let [n, w, ...arr] = input;
  const N = Number(n);
  const weight = [0].concat(w.split(" ").map(Number));
  const edge = new Array(N + 1).fill([]);
  for (let i = 0; i < arr.length; i++) {
    let [s, e] = arr[i].split(" ").map(Number);
    if (!edge[s].includes(e)) {
      edge[s] = [...edge[s], e];
    }
    if (!edge[e].includes(s)) {
      edge[e] = [...edge[e], s];
    }
  }

  let answer = 0;
  const visited = new Array(N + 1).fill(false);
  const dp = Array.from(Array(N + 1), () => new Array(2).fill(0));
  const dfs = (v) => {
    visited[v] = true;
    // 초기값 할당
    dp[v][0] = 0;
    dp[v][1] = weight[v];

    // v와 인접한 마을 탐색
    for (let ad of edge[v]) {
      if (visited[ad]) continue;

      dfs(ad);
      dp[v][0] += Math.max(dp[ad][0], dp[ad][1]);
      dp[v][1] += dp[ad][0];
    }
    answer = Math.max(answer, dp[v][0], dp[v][1]);
  };
  dfs(1);
  console.log(answer);
}