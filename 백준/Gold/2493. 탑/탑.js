/*
  - 앞에서부터 스택에 삽입된 상태일때 pop을 반복하여 현재 탑보다 큰 탑의 높이를 찾는다.
  - 이렇게 하면 스택에서 최댓값이면서 현재 탑과 가장 가까운 위치에 있는 값을
    스택에 제일 높은 위치에 저장해놓을 수 있다.

  스택
  - 주어진 탑들을 순서대로 탐색한다.
  - 현재 탑의 높이보다 큰 탑을 만날때까지 pop을 해준다.
  - 현재 탑의 높이보다 큰 탑을 만나면 
    pop을 하지 않고 result에 저장하고 현재 탑의 높이를 스택에 넣은 후 반복문을 종료한다.
  - 스택이 비어있다면 현재 탑의 높이를 스택에 넣고 반복문을 종료한다.
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
  const N = Number(input[0]);
  const tower = input[1].split(" ").map(Number);
  const result = [];

  const stack = [];
  for (let i = 0; i < N; i++) {
    let current = tower[i];
    while (true) {
      if (!stack.length) {
        result.push(0);
        stack.push([current, i + 1]);
        break;
      }

      let [peek, idx] = stack.at(-1);
      if (peek > current) {
        result.push(idx);
        stack.push([current, i + 1]);
        break;
      } else {
        stack.pop();
      }
    }
  }

  console.log(result.join(" "));
}