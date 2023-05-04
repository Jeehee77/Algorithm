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
  const size = Number(input[0]);

  const result = [];
  let idx = 1;
  while (idx < input.length) {
    // 함수들과 배열 파싱
    const func = input[idx].split("");
    const arr = input[idx + 2]
      .slice(1, -1)
      .split(",")
      .filter((el) => el !== "");
    idx += 3;

    // 함수 실행
    let error = false;
    let isReversed = false;
    let head = 0;
    let tail = arr.length;
    for (let i = 0; i < func.length; i++) {
      if (func[i] === "R") {
        isReversed = !isReversed;
      }

      // reverse 여부에 따라 head나 tail을 조작한다. 배열의 길이가 0이라면 error 발생.
      if (func[i] === "D") {
        if (head === tail) {
          error = true;
          break;
        }

        if (isReversed) {
          tail -= 1;
        } else {
          head += 1;
        }
      }
    }

    // 실행 결과인 배열을 result에 저장.
    if (error) {
      result.push("error");
    } else {
      let answer = [];
      if (isReversed) {
        for (let i = tail - 1; i >= head; i--) {
          answer.push(arr[i]);
        }
      } else {
        answer = arr.slice(head, tail);
      }

      result.push("[" + answer.join(",") + "]");
    }
  }

  console.log(result.join("\n"));
}