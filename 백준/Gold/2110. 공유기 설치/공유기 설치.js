/*
  이분 탐색
  - 가장 인접한 두 공유기 사이의 최대 거리 d를 이분탐색을 이용하여 찾는다.
  - d가 a와 b 사이의 어떤 수가 될 수 있다고 할 때, 중간값 mid를 구한다.
  - 모든 공유기를 mid 이상의 거리를 두고 설치가 가능하다면
    범위를 (mid + 1) ~ b로 좁힌다.
  - 설치가 불가능하다면 범위를 1 ~ (mid - 1)로 좁힌다.
  - d가 될 수 있는 숫자의 범위 a ~ b의 a가 b보다 작거나 같다면 위의 과정을 반복한다.
  - 탐색 종료 후 d가 될 수 있는 숫자의 범위 a ~ b가 구해졌다면 최대값은 b가 된다.
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
  let [nc, ...arr] = input;
  const [n, c] = nc.split(" ").map(Number);
  const homes = arr.map(Number).sort((a, b) => a - b);

  let start = 1;
  let end = homes.at(-1);
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    // 설치가 가능 여부에 따라 범위 좁혀주기
    if (installation(mid, homes, c)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  console.log(end);
}

/** dist 이상의 거리를 두고 모든 공유기 설치가 가능한지 반환하는 함수 */
function installation(dist, homes, c) {
  let cnt = 1; // 설치한 공유기 개수
  let prev = homes[0]; // 0번째 집에 첫 공유기 설치
  for (let cur of homes) {
    if (cur - prev >= dist) {
      // 직전에 설치한 집과 거리가 dist 이상이면 현재 집에 설치
      cnt += 1;
      prev = cur;
    }
    if (cnt === c) break;
  }

  return cnt >= c;
}