/*
  UnionFind
  - 연결된 두 도시의 집합은 병합한다.
  - 여행 계획의 도시들을 탐색하며 직전 도시와 현재 도시가 같은 집합에 속해있는지 확인한다.
  - a에서 b로 갈 때 a와 b가 같은 집합에 속해있다면 여행이 가능한 것이다.
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
  let [n, m, ...arr] = input;
  const parent = new Array(Number(n) + 1).fill(0).map((_, idx) => idx);
  const find = (v) => {
    if (v === parent[v]) return v;
    parent[v] = find(parent[v]);
    return parent[v];
  };
  const union = (a, b) => {
    let root_a = find(a);
    let root_b = find(b);
    if (root_a === root_b) return;

    parent[root_b] = root_a;
  };

  for (let i = 0; i < arr.length - 1; i++) {
    let data = arr[i].split(" ").map(Number);
    for (let j = 0; j < data.length; j++) {
      if (data[j] === 1) {
        // i+1과 j+1이 연결 (도시가 1번부터 시작함)
        union(i + 1, j + 1);
      }
    }
  }

  let answer = "YES";
  const plan = arr.at(-1).split(" ").map(Number);
  let start = find(plan[0]);
  for (let i = 1; i < plan.length; i++) {
    let end = find(plan[i]);
    if (start !== end) {
      answer = "NO";
      break;
    }
  }
  console.log(answer);
}