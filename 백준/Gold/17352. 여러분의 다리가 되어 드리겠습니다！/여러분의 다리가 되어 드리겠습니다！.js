/*
  UnionFind
  - 두 섬이 이어져 있다면 union을 수행하여 두 섬을 병합한다.
  - 다리가 하나만 무너진 것이기 때문에 집합이 두개로 나뉘고,
    1번부터 N번 섬이 속한 집합의 최상위노드는 a 혹은 b일 것이다.
  - 임의로 1번 섬이 속한 집합의 최상위노드를 a로 놓고,
    모든 섬을 탐색하며 a와 다른 최상위 노드를 갖는 섬을 찾아 두 섬을 연결해준다.
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
  let [n, ...arr] = input;
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

  for (let i of arr) {
    let [s, e] = i.split(" ").map(Number);
    union(s, e);
  }

  let a = find(1);
  for (let i = 2; i < parent.length; i++) {
    if (find(i) !== a) {
      console.log("1 " + i);
      break;
    }
  }
}