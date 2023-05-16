/*
  - 크루스칼 알고리즘을 이용하여 최소 스패닝 트리를 찾고 최소비용을 구한다.
  - 위에서 구한 답은 모든 집이 연결되었을 경우의 최소 비용이므로,
    두 개의 마을로 분리하기 위해 하나의 간선을 제거해준다.
  - 이 때 가장 가중치가 높은 간선을 제거하면 
    두 마을의 각 집을 모두 연결한 트리의 최소 비용을 구할 수 있다.
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
  let [nums, ...arr] = input;
  const [N, M] = nums.split(" ").map(Number);
  const edges = arr
    .map((el) => el.split(" ").map(Number))
    .sort((a, b) => a[2] - b[2]);

  // 최소 스패닝 트리에 추가된 간선의 가중치 중 최댓값을 저장한다.
  let maxWeight = 0;

  // 최소 스패닝 트리 구하기
  const dSet = new DisjointSet(N);
  let answer = 0;
  for (let i = 0; i < edges.length; i++) {
    let [u, v, w] = edges[i];
    let ur = dSet.find(u);
    let vr = dSet.find(v);
    if (ur === vr) continue;

    dSet.union(u, v);
    answer += w;
    maxWeight = Math.max(maxWeight, w);
  }

  console.log(answer - maxWeight);
}

class DisjointSet {
  constructor(n) {
    this.parent = new Array(n + 1).fill(0).map((_, idx) => idx);
    this.rank = new Array(n + 1).fill(1);
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
      [this.rank[ur], this.rank[vr]] = [this.rank[vr], this.rank[ur]];
    }
    this.parent[ur] = vr;

    if (this.rank[ur] === this.rank[vr]) {
      this.rank[vr] += 1;
    }
  }
}