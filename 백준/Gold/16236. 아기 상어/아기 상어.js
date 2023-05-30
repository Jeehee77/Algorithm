/*
  - 아기 상어가 먹을 수 있는 물고기들을 찾아낸다.
  - 조건에 따라 거리가 제일 짧고, 제일 위에 있고, 제일 왼쪽에 있는 물고기를 먹는다.
    - 시간과 아기 상어의 위치, 크기를 갱신해준다.
  - 갱신된 아기 상어의 크기에 따른 먹을 수 있는 물고기들을 찾아낸다.
  - 더 이상 먹을 수 있는 물고기가 없을 때까지 위의 과정을 반복한다.

  [물고기 찾기] BFS
  - 초기값으로 아기상어의 현재 위치와 0초를 큐에 넣는다.
  - 큐에서 하나를 꺼낸다. [r, c, t]
  - 상하좌우를 탐색하여 먹을 수 있는 물고기가 발견되면 물고기의 위치와 거기까지 걸리는 시간을 배열에 저장한다.
  - 상하좌우를 탐색하여 아기 상어가 이동할 수 있는 곳이면 방문표시 후 큐에 넣는다.
  - 큐가 빌때까지 위의 과정을 반복한다.
*/
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
  const N = Number(input.shift());
  const board = Array.from(Array(N), () => new Array(N));
  const shark = { r: 0, c: 0, size: 2, fish: 0 };
  let fish; // 먹을 수 있는 물고기들을 찾아 저장할 배열
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  // board에 맵 저장, 아기 상어의 초기 상태 저장
  for (let i = 0; i < N; i++) {
    let nums = input[i].split(" ");
    for (let j = 0; j < N; j++) {
      let n = Number(nums[j]);
      board[i][j] = n;
      if (n === 9) {
        board[i][j] = 0;
        shark.r = i;
        shark.c = j;
      }
    }
  }

  /** 현재 아기 상어의 상태를 기준으로 먹을 수 있는 물고기들을 찾아 배열로 반환한다. */
  const BFS = (shark) => {
    fish = [];
    const visited = Array.from(Array(N), () => new Array(N).fill(false));
    const queue = [];
    queue.push([shark.r, shark.c, 0]);

    while (queue.length) {
      let [r, c, t] = queue.shift();
      // 상하좌우 칸 탐색
      for (let k = 0; k < 4; k++) {
        let [nr, nc, nt] = [r + dr[k], c + dc[k], t + 1];
        if (nr < 0 || nr >= N || nc < 0 || nc >= N || visited[nr][nc]) continue;
        // 이동 가능한 칸 찾기
        if (board[nr][nc] <= shark.size) {
          visited[nr][nc] = true;
          queue.push([nr, nc, nt]);
          // 먹을 수 있는지 판단
          if (board[nr][nc] !== 0 && board[nr][nc] < shark.size) {
            fish.push({ r: nr, c: nc, t: nt });
          }
        }
      }
    }
  };

  let result = 0;
  // 현재 상태에서 먹을 수 있는 물고기 탐색
  BFS(shark);
  // 먹을 수 있는 물고기가 없을 때까지 물고기 하나 먹고 탐색하기 반복
  while (fish.length > 0) {
    // 물고기 하나 먹기
    let target = selectFish(fish);

    // 보드, 상어 정보, 시간 갱신
    board[target.r][target.c] = 0;
    shark.r = target.r;
    shark.c = target.c;
    shark.fish += 1;
    if (shark.size === shark.fish) {
      shark.size += 1;
      shark.fish = 0;
    }
    result += target.t;

    BFS(shark);
  }
  console.log(result);
}

/** 배열에서 거리가 제일 짧고, 제일 위에 있고, 제일 왼쪽에 있는 물고기를 선택하는 함수 */
function selectFish(fish) {
  if (fish.length === 1) return fish[0];
  else
    return fish.sort((a, b) => {
      // 거리가 제일 짧은 거
      if (a.t < b.t) {
        return -1;
      } else if (b.t < a.t) {
        return 1;
      } else {
        // 제일 위에 있는 거
        if (a.r < b.r) {
          return -1;
        } else if (b.r < a.r) {
          return 1;
        } else {
          // 제일 왼쪽에 있는 거
          if (a.c < b.c) {
            return -1;
          } else if (b.c < a.c) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    })[0];
}