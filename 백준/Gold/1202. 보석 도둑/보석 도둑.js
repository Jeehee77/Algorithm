/*
  탐욕법
  - 가방을 수용가능 무게를 기준으로 오름차순으로 정렬한다. 보석은 무게를 기준으로 오름차순으로 정렬한다.
  - 제일 적게 들어가는 가방부터 해당 가방에 들어갈 수 있는 보석들을 최대힙으로 저장한다.
  - 가격이 제일 높은 보석을 해당 가방에 담는다. (최대힙에서 추출, result에 가격 더해주기)
  - 가방 개수만큼 보석을 고를때까지 위의 과정을 반복한다.
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
  const [N, K] = input.shift().split(" ").map(Number);
  const gem = input
    .splice(0, N)
    .map((s) => s.split(" ").map(Number))
    .sort((a, b) => a[0] - b[0]);
  const bag = input.map(Number).sort((a, b) => a - b);

  let result = 0;
  // 작은 가방부터 수용 가능한 보석들 최대힙에 넣기
  const maxHeap = new MaxHeap();
  let gemIdx = 0;
  for (let b of bag) {
    while (gemIdx < N && gem[gemIdx][0] <= b) {
      maxHeap.insert(gem[gemIdx][1]);
      gemIdx += 1;
    }

    // 가장 비싼 보석을 가방에 넣기
    if (maxHeap.values.length > 0) {
      result += maxHeap.extractMax();
    }
  }
  console.log(result);
}

class MaxHeap {
  constructor() {
    this.values = [];
  }

  insert(n) {
    this.values.push(n);
    let idx = this.values.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (parent >= n) break;

      this.values[parentIdx] = n;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      this.values[0] = end;
      let idx = 0;
      const element = this.values[0];
      const length = this.values.length;
      while (true) {
        let leftChildIdx = 2 * idx + 1;
        let rightChildIdx = 2 * idx + 2;
        let leftChild, rightChild;
        let swap = null;

        if (leftChildIdx < length) {
          leftChild = this.values[leftChildIdx];
          if (leftChild > element) swap = leftChildIdx;
        }

        if (rightChildIdx < length) {
          rightChild = this.values[rightChildIdx];
          if (
            (swap === null && rightChild > element) ||
            (swap !== null && rightChild > leftChild)
          )
            swap = rightChildIdx;
        }

        if (swap === null) break;
        this.values[idx] = this.values[swap];
        this.values[swap] = element;
        idx = swap;
      }
    }

    return max;
  }
}