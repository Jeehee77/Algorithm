/*
  - move(N, 1, 3)은 1~N번 원판들을 순서대로 1번 타워에서 3번 타워로 옮기는 과정이다.
  - 1~N번 원판들을 1번에서 3번 타워로 옮기려면 먼저 N번 원판이 3번 타워의 제일 아래로 와야한다.
  - 따라서 1~N-1번 원판들을 2번 타워에 옮겨놓은 후 N번 원판을 3번에 옮기고 1~N-1원판들을 3번에 옮기면 된다.
  
  move(N, 1, 3) => move(N-1, 1, 2) + N번 원판 3번으로 이동 + move(N-1, 2, 3)
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
  const N = Number(input);
  const result = [];

  const move = (n, from, to, other) => {
    if (n <= 0) return; // n이 0 이하면 종료

    // 1~N-1원판들을 other로 이동
    move(n - 1, from, other, to);
    // N번 원판 이동
    result.push([String(from) + " " + String(to)]);
    // 옮겨놨던 1~N-1원판들 최종 목적지로 이동
    move(n - 1, other, to, from);
  };
  move(N, 1, 3, 2);
  console.log(result.length);
  console.log(result.join("\n"));
}