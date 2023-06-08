/* Union-Find를 이용하여 구현*/
function solution(n, computers) {
    const dSet = new DisjointSet(n);
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) { // 본인 다음 컴퓨터부터 탐색 (중복방지)
            if (computers[i][j] === 1) { // 연결되어있다면 합병
                dSet.union(i, j);
            }
        }
    }
    let network = new Set();
    for (let i = 0; i < n; i++) {
        network.add(dSet.find(i));
    }
    return network.size;
}
class DisjointSet {
    constructor(n) {
        this.parent = new Array(n).fill(0).map((_, idx) => idx);
    }
    
    find(v) {
        if (v === this.parent[v]) return v;
        this.parent[v] = this.find(this.parent[v]);
        return this.parent[v];
    }
    
    union(a, b) {
        let root_a = this.find(a);
        let root_b = this.find(b);
        this.parent[root_a] = root_b;
    }
}
/*
    012
    110
    110
    001
    
    networkA = [0, 1]
    
     012
    0110
    1111
    2011
    A = [0,1,2]
*/