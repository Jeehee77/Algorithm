/*
  탐욕법, 최소힙
  - 남은 강의 중 가장 빨리 시작하는 강의를 선택한다. (cur)
  - 현재 강의 중인 강의 목록을 저장한다. (최소힙에 종료시간을 저장)
  - 최소힙에서 가장 빨리 끝나는 강의를 min이라고 한다.
  - min의 종료시간보다 cur의 시작시간이 빠르다면 
    최소힙에서 min을 추출하고 cur을 넣어준다. (min의 강의실에서 cur을 강의하는 형식)
  - min의 종료시간보다 cur의 시작시간이 느리다면 
    강의실을 추가해줘야 하기때문에 최소힙에 cur을 넣어준다.
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
  let [N, ...list] = input;
  const sorted = list
    .map((el) => el.split(" ").map(Number))
    .sort((a, b) => {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      if (a[0] === b[0]) return a[1] - b[1];
    });

  const minHeap = [sorted[0][1]];
  for (let i = 1; i < sorted.length; i++) {
    let [s, e] = sorted[i];
    let min = minHeap[0];
    if (min <= s) {
      extractMin(minHeap);
    }
    minHeap.push(e);
    heapify(minHeap);
  }
  console.log(minHeap.length);
}

function extractMin(heap) {
  const min = heap[0];
  const end = heap.pop();

  if (heap.length) {
    heap[0] = end;
    let curIdx = 0;
    let cur = heap[curIdx];
    while (true) {
      let leftIdx = curIdx * 2 + 1;
      let rightIdx = curIdx * 2 + 2;
      let swap = null;

      if (leftIdx < heap.length && heap[leftIdx] < cur) {
        swap = leftIdx;
      }
      if (rightIdx < heap.length) {
        if (swap === null && heap[rightIdx] < cur) {
          swap = rightIdx;
        }
        if (swap !== null && heap[rightIdx] < heap[leftIdx]) {
          swap = rightIdx;
        }
      }

      if (swap === null) break;
      heap[curIdx] = heap[swap];
      heap[swap] = cur;
      curIdx = swap;
    }
  }

  return min;
}

function heapify(heap) {
  let curIdx = heap.length - 1;
  while (curIdx) {
    let parentIdx = Math.floor((curIdx - 1) / 2);
    let parent = heap[parentIdx];
    if (heap[curIdx] >= parent) break;

    heap[parentIdx] = heap[curIdx];
    heap[curIdx] = parent;
    curIdx = parentIdx;
  }
}