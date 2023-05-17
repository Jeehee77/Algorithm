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
  let [n, ...data] = input;
  const N = Number(n);
  const stars = data.map((s) => s.split(" ").map(Number));
  let edges = [];
  for (let i = 0; i < stars.length; i++) {
    let [ix, iy] = stars[i];
    for (let j = i + 1; j < stars.length; j++) {
      let [jx, jy] = stars[j];
      let dx = Math.pow(ix - jx, 2);
      let dy = Math.pow(iy - jy, 2);
      let dist = Math.sqrt(dx + dy);
      edges.push([i, j, dist]);
    }
  }
  edges = edges.sort((a, b) => a[2] - b[2]);

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
  }

  console.log(answer);
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