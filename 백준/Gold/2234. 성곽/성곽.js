/*
  BFS
  - 한 칸의 벽에 대한 정보와 그 칸이 속한 방의 번호를 저장하는 배열을 만든다.
  - 성 전체를 탐색하면서 방문하지 않은 칸이 있으면 그 칸을 시작으로 BFS를 한다.
    - 현재 칸을 큐에 넣는다.
    - 큐에서 하나씩 꺼내어 방의 크기를 늘리고, 해당 칸에 방 번호를 부여한다.  
    - 현재 칸과 이어지는 칸이 상하좌우 중에 있으면 큐에 넣는다. (벽이 없다면 이어지는 칸으로 취급한다.)
    - 큐가 빌때까지 위의 과정을 반복한다.
  - 한 방에 대한 탐색을 마쳤다면 방의 크기를 room 배열에 넣는다.

  [하나의 벽을 제거하여 얻을 수 있는 가장 넓은 방의 크기 구하기]
  - 성 전체를 탐색하면서 현재 칸이 속한 방의 크기와, 
    현재 칸과 벽으로 막혀있는 칸이 속한 방의 크기를 더한 값의 최댓값을 구한다.
*/
const exp = require("constants");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line.trim());
}).on("close", function () {
  solution(input);
  process.exit();
});

function solution(input) {
  const [N, M] = input[0].split(" ").map(Number);
  const map = Array.from(Array(M), () => new Array(N));
  // map에 사방의 벽 존재여부를 나타내는 문자열과 번호를 저장.
  for (let i = 1; i < input.length; i++) {
    let list = input[i].split(" ").map(Number);
    for (let j = 0; j < list.length; j++) {
      let bit = list[j].toString(2).padStart(4, "0");
      map[i - 1][j] = { wall: bit, number: -1 };
    }
  }

  // 남 동 북 서 순으로 가리키도록 설정
  const dr = [1, 0, -1, 0];
  const dc = [0, 1, 0, -1];
  let room = [];
  let maxSize = 0;
  const visited = Array.from(Array(M), () => new Array(N).fill(false));
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (visited[i][j]) continue;

      const queue = [];
      queue.push([i, j]);
      visited[i][j] = true;
      let size = 0;
      let n = room.length;

      // 큐에서 하나씩 꺼내 사방을 탐색하여 이어지는 방이 있다면 큐에 넣는다.
      while (queue.length) {
        let [r, c] = queue.shift();
        size += 1;
        map[r][c].number = n;

        let wall = map[r][c].wall;
        // 상하좌우 방 중 map[r][c]와 이어진다면 큐에 넣는다.
        for (let k = 0; k < 4; k++) {
          let [nr, nc] = [r + dr[k], c + dc[k]];
          if (nr < 0 || nr >= M || nc < 0 || nc >= N || visited[nr][nc])
            continue;

          // 현재 방향의 벽이 0이면 이어지는 것
          if (wall[k] === "0") {
            queue.push([nr, nc]);
            visited[nr][nc] = true;
          }
        }
      }

      maxSize = Math.max(maxSize, size);
      room.push(size);
    }
  }

  // combined[i][j]는 i번 방과 j번 방을 합쳤을 때의 크기를 저장한다.
  const combined = Array.from(Array(room.length), () =>
    new Array(room.length).fill(0)
  );
  let combined_max = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      let wall = map[i][j].wall;
      let a = map[i][j].number;
      // map[i][j]와 벽으로 막힌 칸 찾기
      for (k = 0; k < 4; k++) {
        let [nr, nc] = [i + dr[k], j + dc[k]];
        if (nr < 0 || nr >= M || nc < 0 || nc >= N) continue;

        // map[i][j]의 방과 map[nr][nc]의 방을 아직 합쳐본 적 없다면 계산하여 결과 저장하기
        let b = map[nr][nc].number;
        if (wall[k] === "1" && a !== b) {
          if (combined[a][b] === 0) {
            combined[a][b] = room[a] + room[b];
            combined_max = Math.max(combined_max, combined[a][b]);
          }
        }
      }
    }
  }

  console.log(room.length);
  console.log(maxSize);
  console.log(combined_max);
}