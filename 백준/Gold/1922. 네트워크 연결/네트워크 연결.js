/*
  크루스칼 알고리즘 (최소 스패닝 트리, 최소비용)
  - 가중치가 적은 간선을 선택한다.
  - 해당 간선을 선택했을 때의 사이클 여부를 판단하여 사이클이 생기지 않으면 트리에 추가한다.
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
  const N = Number(n);
  const M = Number(m);
  const edges = arr
    .map((el) => el.split(" ").map(Number))
    .sort((a, b) => a[2] - b[2]);

  // 크루스칼 알고리즘
  const dSet = new DisjointSet(N);
  let answer = 0;
  for (let i = 0; i < edges.length; i++) {
    let [u, v, w] = edges[i];
    if (dSet.find(u) === dSet.find(v)) continue;

    dSet.union(u, v);
    answer += w;
  }

  console.log(answer);
}

class DisjointSet {
  constructor(n) {
    this.parent = new Array(n + 1).fill(0).map((_, idx) => idx);
    this.rank = new Array(n + 1).fill(0);
  }

  find(v) {
    if (v === this.parent[v]) return v;
    this.parent[v] = this.find(this.parent[v]);
    return this.parent[v];
  }

  union(u, v) {
    let ur = this.find(u);
    let vr = this.find(v);

    if (this.rank[ur] > this.rank[vr]) {
      this.parent[vr] = ur;
    } else if (this.rank[vr] > this.rank[ur]) {
      this.parent[ur] = vr;
    } else {
      this.parent[vr] = ur;
      this.rank[ur] += 1;
    }
  }
}