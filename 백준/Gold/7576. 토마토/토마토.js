/*
  BFS
  - list[i][j]가 1이라면 queue에 넣는다.
  - queue에서 하나씩 꺼내어 해당 칸의 상하좌우에 0인 칸이 있다면 1로 변경 후 queue에 넣는다.
  - queue가 빌때까지 위의 과정을 반복한다.

  날짜 세기
  * 맨 처음 queue의 length가 n이라면, queue에서 n개를 shift한 후 날짜가 바뀐다.
  - count라는 변수에 맨 처음 queue의 길이를 저장한다.
  - queue에서 shift 후 상하좌우를 검사하는 과정을 count만큼 반복한 후 날짜를 더해준다.
  - 그 과정에서 새롭게 익은 토마토가 있다면 flag를 true로 변경한다.
  - flag가 true라면 위의 과정을 반복하고, 
    false라면 더 이상 익을 수 있는 토마토가 없는 것이므로 종료한다.

  소요 시간 줄이기
  - queue를 shift하지 않고 인덱스를 통해 값에 접근하도록 수정.
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
  let [size, ...arr] = input;
  const [N, M] = size.split(" ").map(Number);

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  let total = 0; // 익은 토마토가 들어있거나 토마토가 들어있지 않은 칸의 개수
  let day = 0;

  // 익은 토마토가 있는 칸을 큐에 넣는다.
  let list = [];
  const queue = [];
  for (let i = 0; i < M; i++) {
    list.push(
      arr[i].split(" ").map((n, j) => {
        if (Number(n) === -1) {
          total += 1;
        }
        if (Number(n) === 1) {
          queue.push([i, j]);
          total += 1;
        }
        return Number(n);
      })
    );
  }

  let curIdx = 0;
  while (queue.length) {
    let length = queue.length; // 어제 익은 토마토의 개수
    let flag = false;
    // 어제 익은 토마토들의 상하좌우 칸을 검사하여 아직 안 익었으면 1로 표시 후 큐에 넣는다.
    for (let i = curIdx; i < length; i++) {
      let [r, c] = queue[i];
      for (let k = 0; k < 4; k++) {
        let [nr, nc] = [r + dr[k], c + dc[k]];
        if (nr < 0 || nr >= M || nc < 0 || nc >= N) continue;

        if (list[nr][nc] === 0) {
          flag = true;
          list[nr][nc] = 1;
          queue.push([nr, nc]);
          total += 1;
        }
      }
    }

    if (flag === false) break;
    day += 1;
    curIdx = length;
  }

  // 익은 토마토가 들어있거나, 토마토가 안들어있는 칸의 개수가 n * m보다 작으면 익지 않은 토마토가 존재하는 것
  if (total < N * M) {
    console.log(-1);
  } else {
    console.log(day);
  }
}