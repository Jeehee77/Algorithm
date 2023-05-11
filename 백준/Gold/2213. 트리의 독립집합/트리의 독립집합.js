/*
  트리에서의 DP
  - 각 정점의 인접 여부를 2차원 배열에 저장한다.
  - dp[n]= [n이 포함되지 않을 경우 독립집합의 최댓값, n이 포함되었을 경우 독립집합의 최댓값]
  - dp[n] 구하기
    1. n과 인접하고 아직 방문하지 않은 정점 m을 찾는다.
    2. dp[m]을 구한다.
    3. dp[n][0]은 m의 포함 여부에 관계없이 dp[m] 중 최대값을 더해준다.
      dp[n][1]은 n이 포함되었으므로 m이 포함 안된 dp[m][0]을 더해준다.
  - 임의로 s를 시작점으로 정하여 dfs를 수행하면 dp[s][0], dp[s][1] 중 최댓값이 해답이 된다.
  
  - 최대값을 가지는 독립집합의 원소 역추적하기
  최댓값이 저장된 s에 대해 trace를 수행한다.
  1. 시작점 s에 대해 dp[s][1]이 dp[s][0]보다 크다면 s는 집합에 포함된다.
  2. s의 인접정점이면서 아직 trace를 수행하지 않은 ad에 대해 trace를 다시 수행한다.
  3. 현재 탐색하는 정점을 cur, 직전에 탐색한 정점을 prev라고 할 때,
    prev가 독립집합에 포함되어 있다면, cur을 포함될 수 없다. (둘이 인접하기 때문)
    prev가 포함되어 있지않고, dp[cur][1]이 크다면 cur이 독립집합에 포함된다.
  
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
  let [n, m, ...arr] = input;
  const N = Number(n);
  const weight = [0].concat(m.split(" ").map(Number));
  const adList = new Array(N + 1).fill([]); // 인접리스트에 인접정점 저장
  for (let i = 0; i < arr.length; i++) {
    let [a, b] = arr[i].split(" ").map(Number);
    if (!adList[a].includes(b)) {
      adList[a] = [...adList[a], b];
    }
    if (!adList[b].includes(a)) {
      adList[b] = [...adList[b], a];
    }
  }

  const dp = Array.from(Array(N + 1), () => new Array(2).fill(0));
  const visited = new Array(N + 1).fill(false);
  const dfs = (v) => {
    if (visited[v]) return;

    visited[v] = true;
    dp[v][0] = 0;
    dp[v][1] = weight[v];
    for (let ad of adList[v]) {
      if (visited[ad]) continue;

      dfs(ad);
      dp[v][0] += Math.max(dp[ad][0], dp[ad][1]);
      dp[v][1] += dp[ad][0];
    }
  };

  const traced = new Array(N + 1).fill(false);
  const elements = [];
  const trace = (cur, prev = 0) => {
    if (traced[cur]) return;

    traced[cur] = true;
    // prev가 포함되지 않은 경우
    if (!elements.includes(prev)) {
      if (dp[cur][1] > dp[cur][0]) {
        elements.push(cur);
      }
    }
    for (let ad of adList[cur]) {
      if (traced[ad]) continue;
      trace(ad, cur);
    }
  };

  dfs(N);
  trace(N);

  console.log(Math.max(dp[N][0], dp[N][1]));
  console.log(elements.sort((a, b) => a - b).join(" "));
}