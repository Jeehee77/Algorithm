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
  let [n, list, m, ...query] = input;
  const N = Number(n);
  const M = Number(m);
  const nums = [0].concat(list.split(" ").map(Number));
  const dp = Array.from(Array(N + 1), () => new Array(N + 1).fill(null));
  const answer = [];
  /*
    - dp[i][j]는 i번째부터 j번째까지의 수가 팰린드롭인지 여부를 나타낸다.
    - i번째 수와 j번째 수가 같고 dp[i+1][j-1]이 1이라면 dp[i][j]도 1이다.
    - dp[i+1][j-1]이 null이라면 재귀호출을 이용하여 dp[i+1][j-1]을 먼저 구한다.

    * dp[i][i]는 항상 1이다.
    * i와 j의 차가 1이라면 i와 j만 비교하여 dp[i][j]를 구할 수 있다.
  */
  for (let i = 0; i < query.length; i++) {
    let [a, b] = query[i].split(" ").map(Number);
    if (dp[a][b] === null) {
      isPalindrome(a, b);
    }
    answer.push(dp[a][b]);
  }
  console.log(answer.join("\n"));

  function isPalindrome(a, b) {
    if (a > b) return;

    if (nums[a] !== nums[b]) {
      dp[a][b] = 0;
      return dp[a][b];
    }

    if (a === b || b - a === 1) {
      dp[a][b] = 1;
      return dp[a][b];
    }

    if (dp[a + 1][b - 1] === null) {
      dp[a + 1][b - 1] = isPalindrome(a + 1, b - 1);
    }
    dp[a][b] = dp[a + 1][b - 1];
    return dp[a][b];
  }
}