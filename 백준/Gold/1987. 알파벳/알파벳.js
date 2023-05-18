/*
  DFS
  - 현재 칸의 상하좌우 칸 중 아직 방문하지 않은 칸이 있다면 방문 표시 후 dfs함수를 재귀호출한다.
  - 방문 상태를 이전으로 돌리고 상하좌우 칸의 탐색을 이어나간다. (백트래킹)
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
  let [rc, ...board] = input;
  const [R, C] = rc.split(" ").map(Number);
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let max = 0;
  const visited = new Array(26).fill(false); // 알파벳의 방문 여부 표시
  const dfs = (r, c, step) => {
    let move = false;
    for (let i = 0; i < 4; i++) {
      let [nr, nc] = [r + dr[i], c + dc[i]];
      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      let n = board[nr][nc].charCodeAt(0) - 65;
      if (visited[n]) continue;

      visited[n] = true;
      dfs(nr, nc, step + 1);
      visited[n] = false;
    }

    // 상하좌우 중 아무곳도 이동할 수 없다면 현재 step이 최대이므로 max와 비교해서 갱신
    if (!move) {
      max = Math.max(max, step);
    }
  };

  // (0, 0)에서 시작하므로 (0, 0)칸의 알파벳에 방문표시 해주기
  let a = board[0][0].charCodeAt(0) - 65;
  visited[a] = true;
  dfs(0, 0, 1);
  console.log(max);
}