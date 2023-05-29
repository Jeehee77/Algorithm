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
  const n = Number(input[0]);
  const A = [];
  const B = [];
  const C = [];
  const D = [];
  for (let i = 1; i <= n; i++) {
    let [a, b, c, d] = input[i].split(" ").map(Number);
    A.push(a);
    B.push(b);
    C.push(c);
    D.push(d);
  }

  const AB = new Map();
  // a + b를 AB에 저장
  for (let a of A) {
    for (let b of B) {
      if (!AB.has(a + b)) {
        AB.set(a + b, 1);
      } else {
        AB.set(a + b, AB.get(a + b) + 1);
      }
    }
  }

  let result = 0;
  // -(c + d)가 AB에 있다면 그 횟수만큼 result에 더해주기
  for (let c of C) {
    for (let d of D) {
      let target = (c + d) * -1;
      if (AB.has(target)) {
        result += AB.get(target);
      }
    }
  }
  console.log(result);
}