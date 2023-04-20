/*
  DP (분할과 정복)
  - (0,0)부터 (i,j)까지의 최소 이동 횟수를 dp[i][j]라고 한다.
  - (i, j)에서 움직일 수 있는 칸은 상하좌우 칸 중 값이 1인 칸이다.
  - dp[i][j]는 (i, j)의 상하좌우에 있고 값이 1인 칸들 중 제일 작은 값 + 1이다.
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
  const [N, M] = input[0].split(" ").map(Number);
  const maps = input.slice(1, N + 1).map((str) => str.split("").map(Number));
  const dp = Array.from(Array(N), () => new Array(M).fill(Infinity));
  const queue = [];
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  queue.push([0, 0]);
  dp[0][0] = 1;
  while (queue.length) {
    let [i, j] = queue.shift();
    if (maps[i][j] === 0) continue;

    // maps[i][j]의 상하좌우 칸들의 이동횟수 갱신하기
    for (let k = 0; k < 4; k++) {
      let [r, c] = [i + dr[k], j + dc[k]];
      if (r < 0 || r >= N || c < 0 || c >= M) continue;
      if (maps[r][c] === 0) continue;
      if (dp[i][j] + 1 < dp[r][c]) {
        dp[r][c] = dp[i][j] + 1;
        queue.push([r, c]);
      }
    }
  }

  console.log(dp[N - 1][M - 1]);
}