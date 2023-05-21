/*
  탐욕법
  - 각 알파벳의 자릿수의 총합을 구한다.
  - 자릿수의 총합이 많은 알파벳부터 큰 수를 부여해준다.
  - 각 알파벳의 (부여해준 숫자 * 자릿수)를 계산하여 단어들의 총합을 구한다.
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
  let [n, ...str] = input;
  // 알파벳 별 자릿수 저장
  const numOfAlphabet = {};

  for (let word of str) {
    for (let i = 0; i < word.length; i++) {
      let s = word[i];
      if (!numOfAlphabet[s]) {
        numOfAlphabet[s] = 0;
      }

      let j = word.length - 1 - i;
      numOfAlphabet[s] += 10 ** j;
    }
  }

  /* 
    1. numOfAlphabet을 배열로 바꾸어 자릿수 기준 내림차순으로 정렬. 
    2. i번째 원소를 (자릿수 * (9 - i))로 매핑.
    3. 모든 원소를 더해준다.
  */
  const result = Object.entries(numOfAlphabet)
    .sort((a, b) => b[1] - a[1])
    .map(([_, n], idx) => n * (9 - idx))
    .reduce((acc, cur) => acc + cur);
  console.log(result);
}