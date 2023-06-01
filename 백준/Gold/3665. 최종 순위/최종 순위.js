/*
  위상 정렬
  - 작년 순위를 토대로 그래프와 prior배열에 정보를 저장한다.
    - 작년 순위에서 i가 j보다 순위가 높다면 graph[i][j]는 true이다.
  - 이때 A와 B가 올해 순위가 바뀌었다면 A, B를 기존 순위에서 우열관계를 반전시켜 저장한다.
  - 그래프와 prior배열의 정보를 토대로 위상정렬하여 올해 순위를 출력한다.
    - prior이 0인 팀이 두 팀 이상이면 확실한 순위를 찾을 수 없으므로 '?'를 출력한다.
    - 그래프에 사이클이 생긴다면 데이터에 일관성이 없는 경우이므로 'IMPOSSIBLE'을 출력한다.
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
  const testcase = Number(input[0]);
  const result = [];
  for (let i = 1; i < input.length; ) {
    const n = Number(input[i]);
    const ranking = input[++i].split(" ").map(Number);

    // 작년 순위로 그래프, prior 저장
    const graph = Array.from(Array(n + 1), () => new Array(n + 1).fill(false));
    const prior = new Array(n + 1).fill(0);
    storeData(ranking, graph, prior);

    const m = Number(input[++i]);
    for (let j = 0; j < m; j++) {
      let [a, b] = input[++i].split(" ").map(Number);
      reverseRelation(a, b, graph, prior);
    }

    // 위상 정렬 수행
    let answer = topologicalSort(n, graph, prior);
    result.push(answer);

    i += 1;
  }

  console.log(result.join("\n"));
}
/** ranking을 토대로 graph와 prior에 정보를 저장하는 함수 */
function storeData(ranking, graph, prior) {
  for (let i = 0; i < ranking.length - 1; i++) {
    for (let j = i + 1; j < ranking.length; j++) {
      let [a, b] = [ranking[i], ranking[j]];
      graph[a][b] = true;
      prior[b] += 1;
    }
  }
}

/** a와 b의 우열관계를 반전시켜주는 함수 */
function reverseRelation(a, b, graph, prior) {
  // a와 b의 우열관계 반전
  let lead, behind;
  if (graph[a][b]) {
    // a가 b보다 앞선 경우 b->a로
    lead = b;
    behind = a;
  } else {
    //b가 a보다 앞선 경우 a->b로
    lead = a;
    behind = b;
  }
  graph[lead][behind] = true;
  prior[behind] += 1;
  graph[behind][lead] = false;
  prior[lead] -= 1;
}

/** graph와 prior을 이용하여 위상정렬 결과를 출력하는 함수 */
function topologicalSort(n, graph, prior) {
  let result = [];
  const queue = [];
  // prior이 0개인 정점을 큐에 넣음
  for (let i = 1; i <= n; i++) {
    if (prior[i] === 0) {
      queue.push(i);
    }
  }

  // 큐가 빌때까지 반복
  while (queue.length) {
    if (queue.length > 1) {
      return "?";
    }

    let target = queue.shift();
    result.push(target);
    for (let next = 1; next <= n; next++) {
      if (graph[target][next]) {
        graph[target][next] = false;
        prior[next] -= 1;
        if (prior[next] === 0) {
          queue.push(next);
        }
      }
    }
  }

  // 큐가 비었는데 result의 길이가 n개가 아니라면 사이클이 존재하는 경우
  if (result.length < n) {
    return "IMPOSSIBLE";
  } else {
    return result.join(" ");
  }
}