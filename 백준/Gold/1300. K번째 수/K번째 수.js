/*
  이분 탐색
  - B[k]는 1 ~ N*N 사이의 수이다.
  - 이분탐색의 초기값은 1과 n*n의 중앙값이다.
  - mid는 현재 범위의 중앙값을 의미한다.
  - 배열 A에서 mid보다 작거나 같은 수의 개수를 센다.
  - k개 이상이라면 mid를 저장해놓는다.
    k개보다 적다면 범위를 (mid + 1) ~ n*n으로 바꿔주고,
    k개보다 많다면 범위를 1 ~ (mid - 1)로 바꿔준다.

  배열 A에서 mid보다 작거나 같은 숫자의 개수를 세는 방법
  - A[i][j]는 i*j이므로 [i*j <= mid]인 i와 j를 찾으면 된다.
  - i행에서 mid보다 작거나 같은 숫자의 열 j는 [j <= mid / i]로 표현할 수 있다.
    따라서 i행에서 mid보다 작거나 같은 숫자는 (mid / i)개라고 할 수 있다.
  - 만약 (mid / i)가 n보다 크다면 i행의 n개의 숫자 모두 mid보다 작거나 같은 것이다.
  - 따라서 i행에서 mid보다 작거나 같은 숫자는 Math.min(n, (mid / i))이다.

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
  const [N, K] = input.map(Number);
  let answer = 0;

  let left = 1;
  let right = N * N;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let count = 0;

    // 배열 A의 각 행에서 mid보다 작거나 같은 숫자의 개수 구하기
    for (let i = 1; i <= N; i++) {
      count += Math.min(N, parseInt(mid / i));
    }

    if (count >= K) {
      answer = mid;
      right = mid - 1;
    } else if (count < K) {
      left = mid + 1;
    }
  }
  console.log(answer);
}