/*
  위상 정렬
  - 일부 학생들의 키를 비교한 결과를 토대로, 인접리스트와 prior배열에 정보를 저장한다.
    - prior[i]는 i와 다른 학생을 비교했을 때 i가 앞에 서게 되는 결과의 개수를 의미한다.
  - 결과가 A B라면 graph[A]의 인접리스트에 B를 추가하고, priror[B]의 개수를 하나 증가시킨다.
  - prior[i]가 0인 즉, 자신이 앞에서야되는 결과가 없는 학생 i를 큐에 넣는다.
  - 큐에서 하나를 꺼내어 i의 인접정점 j에 대해 [i => j]인 간선을 그래프에서 제거하고,
    prior[j]를 하나 감소시킨다.
    - 이때 prior[j]가 0이 되었다면 큐에 j를 넣는다.
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
  const [n, m] = input[0].split(" ").map(Number);
  const graph = Array.from(Array(n + 1), () => new Array());
  const prior = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    let [v, u] = input[i].split(" ").map(Number);
    graph[v].push(u);
    prior[u] += 1;
  }

  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (prior[i] === 0) {
      queue.push(i);
    }
  }

  let result = [];
  while (queue.length) {
    let target = queue.shift();
    result.push(target);

    for (let next of graph[target]) {
      prior[next] -= 1;
      if (prior[next] === 0) {
        queue.push(next);
      }
    }
  }

  console.log(result.join(" "));
}