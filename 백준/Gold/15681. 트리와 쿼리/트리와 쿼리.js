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
  const [N, R, Q] = input[0].split(" ").map(Number);
  const adList = new Array(N + 1); // 인접리스트 만들기
  for (let i = 1; i < input.length - Q; i++) {
    let [a, b] = input[i].split(" ").map(Number);
    if (!adList[a]) adList[a] = [];
    if (!adList[b]) adList[b] = [];
    adList[a].push(b);
    adList[b].push(a);
  }

  // dp[n] = n을 루트로 하는 서브트리의 정점 개수.
  const dp = new Array(N + 1);
  const visited = new Array(N + 1).fill(false);
  const dfs = (v) => {
    if (visited[v]) return;

    visited[v] = true;
    dp[v] = 1;
    for (let ad of adList[v]) {
      if (visited[ad]) continue;

      if (!dp[ad]) {
        //메모이제이션
        dp[ad] = dfs(ad);
      }
      dp[v] += dp[ad];
    }
    return dp[v];
  };

  dfs(R); // 루트노드를 시작점으로 둔다.
  const query = input.slice(-1 * Q).map(Number);
  // 쿼리 수행
  console.log(query.map((n) => dp[n]).join("\n"));
}