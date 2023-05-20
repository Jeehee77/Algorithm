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
  const [a, b] = input.map((str) => str.split(""));
  const dp = Array.from(Array(a.length + 1), () =>
    new Array(b.length + 1).fill(0)
  );

  // a의 1~i-1번째까지의 수열과 b의 1~j-1번째까지의 수열의 LCS를 dp[i][j]에 저장.
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  console.log(dp[a.length][b.length]);
}