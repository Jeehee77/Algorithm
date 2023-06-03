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
  const N = Number(input[0]);
  const graph = Array.from(Array(N + 1), () => new Object());
  const prior = new Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    // 작업 i에 걸리는 시간 time과 선행이 되어야하는 cnt개의 작업을 담은 배열 arr
    let [time, cnt, ...arr] = input[i].split(" ").map(Number);
    graph[i].time = time;
    if (!graph[i].adjList) {
      graph[i].adjList = new Array();
    }
    if (cnt !== 0) {
      for (let u of arr) {
        // u가 선행되어야 i번 작업을 할 수 있다.
        // u의 인접리스트에 i를 넣고, prior[i]에 1을 더해준다.;
        if (!graph[u].adjList) {
          graph[u].adjList = [i];
        } else {
          graph[u].adjList = [...graph[u].adjList, i];
        }
        prior[i] += 1;
      }
    }
  }

  // 각 작업이 완료된 시간을 저장하는 배열
  const dp = new Array(N + 1).fill(0);
  // 위상 정렬을 하여 걸리는 시간 출력
  let total = 0; // 총 걸린 시간
  const queue = [];
  for (let i = 1; i <= N; i++) {
    if (prior[i] === 0) {
      queue.push(i);
      // dp에 작업 종료시간에 대한 초기값 입력
      dp[i] = graph[i].time;
    }
  }

  while (queue.length) {
    let target = queue.shift();
    total = Math.max(total, dp[target]); // total보다 dp[target]이 더 길다면 갱신

    for (let next of graph[target].adjList) {
      prior[next] -= 1;
      // next의 종료시간은 target의 종료시간 + next의 작업시간이다.
      dp[next] = Math.max(dp[next], dp[target] + graph[next].time);
      if (prior[next] === 0) {
        queue.push(next);
      }
    }
  }
  console.log(total);
}