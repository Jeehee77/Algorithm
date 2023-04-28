/*
  - 0개 이상인 연산자 중 하나를 선택하여 계산하고 해당 연산자의 개수를 하나 줄인다.
  - 연산 결과와 현재 연산자들의 남은 개수, 다음에 계산해야할 수의 위치를 전달한다.
  - 수열의 마지막 수의 연산이 완료될때까지 위의 과정을 반복한다.
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
  let [N, nums, op] = input;
  N = Number(N);
  nums = nums.split(" ").map(Number);
  op = op.split(" ").map(Number);

  let min = Infinity;
  let max = -Infinity;
  const calculate = (nums, op, current, result) => {
    if (current === N) {
      min = Math.min(min, result);
      max = Math.max(max, result);
      return;
    }

    for (let i = 0; i < op.length; i++) {
      if (op[i] > 0) {
        let newResult;
        switch (i) {
          case 0:
            newResult = result + nums[current];
            break;
          case 1:
            newResult = result - nums[current];
            break;
          case 2:
            newResult = result * nums[current];
            break;
          case 3:
            if (result < 0) {
              newResult = Math.floor((-1 * result) / nums[current]) * -1;
            } else {
              newResult = Math.floor(result / nums[current]);
            }
            break;
        }
        op[i] -= 1;
        calculate(nums, op, current + 1, newResult);
        op[i] += 1;
      }
    }
  };

  calculate(nums, op, 1, nums[0]);
  console.log(max + "\n" + min);
}