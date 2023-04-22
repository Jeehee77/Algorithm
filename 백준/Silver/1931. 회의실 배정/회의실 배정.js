/*
  탐욕법 (현재 상황에서의 최선의 선택을 한다.)
  - 회의 목록을 종료 시간이 빠른 순으로 정렬한다.
  - 종료 시간이 가장 빠른 회의를 선택한다.
  - 해당 종료 시간보다 같거나 늦게 시작하는 회의 중 종료 시간이 빠른 회의를 선택한다.
  - 위의 과정을 반복한다.
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
  list = list
    .map((str) => str.split(" ").map(Number))
    .sort((a, b) => {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      if (a[1] === b[1]) return a[0] - b[0];
    });

  let answer = 1;
  let end = list[0][1]; // 직전에 선택한 회의의 종료 시간
  for (let i = 1; i < list.length; i++) {
    if (list[i][0] >= end) {
      answer++;
      end = list[i][1];
    }
  }
  console.log(answer);
}