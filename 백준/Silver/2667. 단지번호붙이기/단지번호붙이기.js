/*
  BFS
  - (i, j)를 시작점으로 queue에 넣는다.
  - (i, j)의 상하좌우 칸의 값이 1이고 방문하지 않았다면 queue에 넣고 단지수를 증가시킨다.
  - queue의 길이가 0이 될때까지 위 과정을 반복한다.
  - 탐색이 끝나면 단지수를 result 배열에 넣는다.
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
  const maps = input.slice(1, N + 1).map((str) => str.split("").map(Number));
  const queue = [];
  const result = [];
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (maps[i][j] === 0) continue;
      queue.push([i, j]);
      maps[i][j] = 0; // 방문 표시
      let size = 1;
      while (queue.length) {
        let [i, j] = queue.shift();
        // maps[i][j]의 상하좌우 칸이 1이고 방문 전이면 같은 단지이므로 단지 수 증가시키기
        for (let k = 0; k < 4; k++) {
          let [r, c] = [i + dr[k], j + dc[k]];
          if (r < 0 || r >= N || c < 0 || c >= N) continue;
          if (maps[r][c] === 0) continue;
          size += 1;
          maps[r][c] = 0;
          queue.push([r, c]);
        }
      }
      result.push(size);
    }
  }

  console.log(result.length);
  console.log(result.sort((a, b) => a - b).join("\n"));
}