/*
  BFS
  - 큐를 shift한다. -> [current, count]
  - current에서 앞으로 한칸, 뒤로 한칸, 순간이동한 위치를 아직 방문하지 않았다면, 큐에 저장한다.
  - 큐가 빌때까지 혹은 K에 도달할때까지 위의 과정을 반복한다.
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
  let [N, K] = input[0].split(" ").map(Number);
  const visited = new Array(100001).fill(0);
  const queue = [];
  let answer;

  queue.push([N, 0]);
  visited[N] = 1;
  while (queue.length) {
    let [current, count] = queue.shift();
    if (current === K) {
      answer = count;
      break;
    }
    for (next of [current - 1, current + 1, 2 * current]) {
      if (visited[next] === 0 && next >= 0 && next <= 100000) {
        visited[next] = 1;
        queue.push([next, count + 1]);
      }
    }
  }

  console.log(answer);
}