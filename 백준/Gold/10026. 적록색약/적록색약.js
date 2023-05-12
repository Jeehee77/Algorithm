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
  const map = Array.from(Array(N), () => new Array(N));
  for (let i = 1; i < input.length; i++) {
    map[i - 1] = input[i].split("");
  }

  const queue = [];
  const rg_queue = [];
  const visited = Array.from(Array(N), () => new Array(N).fill(false));
  const rg_visited = Array.from(Array(N), () => new Array(N).fill(false));
  const count = [0, 0]; // [적록색약이 아닌 사람이 봤을 때의 구역개수, 적록색약이 봤을 때의 구역개수]
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        // 아직 방문 안 했으면 BFS 수행
        count[0] += 1; // 새로운 구역이 생기는 것이므로 1 더해주기
        queue.push([i, j]);
        visited[i][j] = true;
        bfs(queue, visited, map);
      }

      if (!rg_visited[i][j]) {
        // 아직 방문 안 했으면 BFS 수행
        count[1] += 1; // 새로운 구역이 생기는 것이므로 1 더해주기
        rg_queue.push([i, j]);
        rg_visited[i][j] = true;
        bfs(rg_queue, rg_visited, map, 1);
      }
    }
  }
  console.log(count.join(" "));
}

function bfs(q, visited, map, option = 0) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, 1, -1];
  const N = map.length;
  while (q.length) {
    let [r, c] = q.shift();

    // 상하좌우 구역 탐색
    for (let k = 0; k < 4; k++) {
      let [nr, nc] = [r + dr[k], c + dc[k]];
      if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
      if (visited[nr][nc]) continue;

      // option이 0이라면 두 구역이 같은 색이면 큐에 넣는다
      if (option === 0) {
        if (map[nr][nc] === map[r][c]) {
          visited[nr][nc] = true;
          q.push([nr, nc]);
        }
      }

      // option이 1이면 빨강,초록을 같은색으로 취급한다.
      if (option === 1) {
        if (
          ["R", "G"].includes(map[r][c]) &&
          ["R", "G"].includes(map[nr][nc])
        ) {
          visited[nr][nc] = true;
          q.push([nr, nc]);
        }
        if (map[r][c] === "B" && map[nr][nc] === "B") {
          visited[nr][nc] = true;
          q.push([nr, nc]);
        }
      }
    }
  }
}