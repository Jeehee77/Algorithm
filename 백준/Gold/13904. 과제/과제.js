/*
  우선순위 큐
  - 점수가 높을 수록, 마감일이 가까울수록 우선순위가 높다.
  - 우선순위 큐에 과제들을 넣는다.
  - 우선순위 큐에서 과제를 하나씩 꺼내어 가능한 마감기한에 직전에 과제를 수행하도록 한다.
  - 우선순위 큐가 빌때까지 위의 과정을 반복한다.
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
  let [n, ...arr] = input;
  const pq = new PriorityQueue();
  for (let str of arr) {
    let [deadline, score] = str.split(" ").map(Number);
    pq.enqueue(score, deadline);
  }

  // i번째 날에 과제를 수행했는지 여부를 저장하는 배열
  const day = new Array(1001).fill(false);
  let result = 0;
  while (pq.size() > 0) {
    let first = pq.dequeue();
    let date = first.deadline;
    // 과제를 수행가능한, 마감기한과 가장 가까운 날짜 찾기
    while (day[date] && date > 0) {
      date -= 1;
    }

    if (date !== 0) {
      // 과제 수행
      day[date] = true;
      result += first.score;
    }
  }

  console.log(result);
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(score, deadline) {
    const newVal = { score: score, deadline: deadline };
    this.values.push(newVal);
    let idx = this.values.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      // 부모보다 newVal의 우선순위가 더 높다면 자리바꾸기
      if (this.getHigherPriority(newVal, parent) === newVal) {
        this.values[parentIdx] = newVal;
        this.values[idx] = parent;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  dequeue() {
    const first = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      let idx = 0;
      const element = end;
      const length = this.values.length;
      while (true) {
        let leftChildIdx = 2 * idx + 1;
        let rightChildIdx = 2 * idx + 2;
        let leftChild = this.values[leftChildIdx];
        let rightChild = this.values[rightChildIdx];
        let swapIdx = null;

        // 왼쪽 자식의 우선순위가 더 높다면 swapIdx 갱신
        if (
          leftChildIdx < length &&
          this.getHigherPriority(element, leftChild) === leftChild
        ) {
          swapIdx = leftChildIdx;
        }
        // 오른쪽 자식의 우선순위가 더 높다면 swapIdx 갱신
        if (rightChildIdx < length) {
          if (
            (swapIdx === null &&
              this.getHigherPriority(element, rightChild) === rightChild) ||
            (swapIdx !== null &&
              this.getHigherPriority(leftChild, rightChild) === rightChild)
          ) {
            swapIdx = rightChildIdx;
          }
        }

        if (swapIdx === null) break;
        this.values[idx] = this.values[swapIdx];
        this.values[swapIdx] = element;
        idx = swapIdx;
      }
    }
    return first;
  }

  /** a와 b 중 우선순위가 높은 것을 반환 (둘이 같다면 null 반환) */
  getHigherPriority(a, b) {
    // 점수가 높다면, 점수가 같고 마감일이 더 가깝다면 우선순위가 높은 것
    if (a.score > b.score) {
      return a;
    } else if (b.score > a.score) {
      return b;
    } else if (a.deadline < b.deadline) {
      return a;
    } else if (b.deadline < a.deadline) {
      return b;
    } else {
      return null;
    }
  }

  /** 우선순위 큐의 길이를 반환하는 함수 */
  size() {
    return this.values.length;
  }
}