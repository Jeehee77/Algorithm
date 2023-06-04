/*
  - 괄호에 포함되어 먼저 계산하는 연산자의 위치를 뽑는다.
    - 수식에서 연산자의 위치는 1, 3, 5, ... , length-1 과 같다.
    - 괄호 안에 하나의 연산자가 있어야 하기 때문에 expression[i]위치의 연산자를 골랐다면,
      expression[i+4]번째 연산자부터 뽑을 수 있다.
    - DFS와 백트래킹을 이용하여 연산자를 뽑는다.
  - 뽑힌 연산자의 위치를 담고 있는 배열과 수식을 이용해 결과를 계산한다.
  - max 값과 비교하여 갱신한다.
*/
const exp = require("constants");
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
  const N = Number(input[0]);
  const ex = input[1].split("").map((c, idx) => {
    if (idx % 2 === 0) {
      return Number(c);
    } else {
      return c;
    }
  }); // 연산자의 위치는 1, 3, 5, ... ,

  let max = -Infinity;
  const pickBracket = (brackets) => {
    // 괄호 추가한대로 계산한 결과와 max 비교
    // console.log(brackets, getTotal(ex, brackets));
    max = Math.max(max, getTotal(ex, brackets));

    let lastIdx = 1;
    if (brackets.length) {
      lastIdx = brackets.at(-1) + 4;
    }
    for (let i = lastIdx; i < ex.length; i += 2) {
      brackets.push(i);
      pickBracket(brackets);
      brackets.pop();
    }
  };

  pickBracket([]);
  console.log(max);
}

/** 수식과 먼저 계산해야 되는 연산자의 위치 배열을 입력받아 총합을 구하는 함수  */
function getTotal(expression, brackets) {
  const ex = [...expression];
  // 수식의 뒤에서부터 하나씩 스택에 넣는다. brackets에 속한 연산자라면 바로 계산하여 결과를 스택에 넣는다.
  const stack = [];
  let idx = brackets.length - 1;
  for (let i = ex.length - 1; i >= 0; i--) {
    // 계산하여 결과를 스택에 넣음
    if (idx >= 0 && i === brackets[idx]) {
      let op = ex[i];
      let n1 = ex[i - 1];
      let n2 = stack.pop();
      stack.push(calc(op, n1, n2));
      i -= 1;
      idx -= 1;
    } else {
      stack.push(ex[i]);
    }
  }

  // 스택에 있는 숫자와 연산자를 하나씩 꺼내서 순서대로 계산한다.
  let total = stack.pop();
  while (stack.length) {
    let cur = stack.pop();
    if (isNaN(cur)) {
      total = calc(cur, total, stack.pop());
    }
  }
  return total;
}

/** op와 num1, num2를 입력하면 계산 결과를 반환하는 함수 */
function calc(op, n1, n2) {
  n1 = Number(n1);
  n2 = Number(n2);
  if (op === "+") {
    return n1 + n2;
  } else if (op === "-") {
    return n1 - n2;
  } else if (op === "*") {
    return n1 * n2;
  }
}