/*
  누적합
  - 공의 크기를 기준으로 오름차순으로 정렬한다. (크기가 같으면 색깔 기준)
  - 정렬된 공이 각각 몇번 플레이어의 공이었는지를 저장한다.
  - 정렬된 배열을 탐색한다.
    - color: 현재까지 탐색한 i번 색깔 공들의 크기의 합을 저장한다.
    - sum: 1번 ~ i번 공까지의 합을 저장한다.
    - {색깔: c, 크기: s, 정렬된순서: k }의 공이 잡을 수 있는 공
      j: k 이전의 공 중 k와 가장 가깝고, s보다 작은 공의 위치
      j_color: color[c]에서 자신보다 크거나 같은 공의 크기를 빼준 값
      -> sum[j] - j_color
  - 처음에 주어진 번호대로 다시 정렬하여 결과 출력.
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
  const balls = [];
  const color = new Map(); // c 색깔 공의 크기의 합을 저장.
  for (let i = 1; i <= N; i++) {
    let [c, s] = input[i].split(" ").map(Number);
    balls.push({ color: c, size: s, number: i });
    // color초기화
    if (!color.has(c)) {
      color.set(c, 0);
    }
  }

  // 정렬
  const sorted = balls.sort((a, b) => {
    if (a.size < b.size) {
      return -1;
    } else if (b.size < a.size) {
      return 1;
    } else {
      return a.color - b.color;
    }
  });

  const sum = new Array(N).fill(0);
  // 0번 공에 대한 정보 입력
  color.set(sorted[0].color, sorted[0].size);
  sum[0] = sorted[0].size;
  sorted[0].result = 0;
  for (let i = 1; i < sorted.length; i++) {
    let c = sorted[i].color;
    let s = sorted[i].size;

    // 중복 크기 거르기
    let j = i - 1; // 자신보다 작은 공의 위치 찾기
    let j_color = color.get(c); // c색깔 공들의 합 중에서 s와 크기가 같은 공을 빼준 값.
    while (j >= 0 && sorted[j].size >= s) {
      if (sorted[j].color === c) {
        j_color -= sorted[j].size;
      }
      j -= 1;
    }
    if (j === -1) {
      // 자신보다 작은 공이 없는 경우
      sorted[i].result = 0;
    } else {
      let answer = sum[j] - j_color; // 답 구해서 저장
      sorted[i].result = answer;
    }

    // sum과 color에 현재 공의 크기 더해주기
    sum[i] = sum[i - 1] + s;
    color.set(c, color.get(c) + s);
  }

  // 원래 부여받은 번호대로 정렬해서 결과 출력
  console.log(
    sorted
      .sort((a, b) => a.number - b.number)
      .map((b) => b.result)
      .join("\n")
  );
}