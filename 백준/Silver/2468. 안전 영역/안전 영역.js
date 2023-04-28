/*
  - 물에 잠기는 높이를 0부터 오름차순으로 모든 땅이 물에 잠길때까지 대입한다.
  
  안전영역 구하기 (BFS)
  - 전체 영역을 검사하면서 한 땅이 물에 안 잠긴다면 그 땅의 상하좌우 땅을 방문표시하고 큐에 넣는다.
  - 큐에서 하나씩 꺼내서 해당 칸의 상하좌우 칸을 검사하는 과정을 큐가 빌때까지 반복한다.
  - 큐가 비면 안전영역의 개수를 하나 증가시킨다.
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
  let [N, ...lands] = input;
  N = Number(N);
  lands = lands.map((str) => str.split(" ").map(Number));
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  const bfs = (i, j, height, visited) => {
    const queue = [[i, j]];
    visited[i][j] = true;
    while (queue.length) {
      let [r, c] = queue.shift();
      for (let i = 0; i < 4; i++) {
        let [nr, nc] = [r + dr[i], c + dc[i]];
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (lands[nr][nc] > height && !visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  };

  let max = 0;
  for (let height = 0; height <= 100; height++) {
    let size = 0;
    const visited = Array.from(Array(N), () => new Array(N).fill(false));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // 물에 안 잠긴다면
        if (lands[i][j] > height && !visited[i][j]) {
          size += 1;
          bfs(i, j, height, visited);
        }
      }
    }
    max = Math.max(max, size);
    if (size === 0) break;
  }

  console.log(max);
}