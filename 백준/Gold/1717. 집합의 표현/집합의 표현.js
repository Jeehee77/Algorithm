/*
  UnionFind
  - 각 원소가 속한 집합의 최상위 노드를 저장한 parent 배열을 만든다.
  - find(v): v가 속한 집합의 최상위 노드 찾기
    parent[v]이 v이라면 최상위 노드이다.
    최상위 노드를 찾을때까지 부모를 거슬러 올라간다.
  - union(a, b): a가 속한 집합과 b가 속한 집합 합치기
    a가 속한 집합의 최상위 노드를 b가 속한 집합의 최상위 노드로 바꿔준다.
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
  const [n, m] = input[0].split(" ").map(Number);
  const parent = new Array(n + 1).fill(0).map((_, idx) => idx);
  const find = (v) => {
    if (v === parent[v]) return v;
    parent[v] = find(parent[v]);
    return parent[v];
  };
  const union = (a, b) => {
    let root_a = find(a);
    let root_b = find(b);
    parent[root_a] = root_b;
  };

  for (let i = 1; i <= m; i++) {
    let [op, a, b] = input[i].split(" ").map(Number);
    if (op === 0) {
      // a의 집합과 b의 집합을 합치기
      union(a, b);
    }
    if (op === 1) {
      // a와 b가 같은 집합에 속해있는지에 대한 답변 출력
      let answer = find(a) === find(b) ? "YES" : "NO";
      console.log(answer);
    }
  }
}