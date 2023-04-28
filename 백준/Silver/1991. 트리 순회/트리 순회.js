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
  let nodes = input.slice(1);

  const t = {};

  nodes.forEach((node) => {
    const [value, left, right] = node.split(" ");
    t[value] = { value, left, right };
  });
  //console.log(t);

  const preorder = () => {
    let visited = [];
    function traverse(node) {
      visited.push(node.value);
      if (t[node.left]) traverse(t[node.left]);
      if (t[node.right]) traverse(t[node.right]);
    }
    traverse(t["A"]);
    return visited.join("");
  };

  const inorder = () => {
    let visited = [];
    function traverse(node) {
      if (t[node.left]) traverse(t[node.left]);
      visited.push(node.value);
      if (t[node.right]) traverse(t[node.right]);
    }
    traverse(t["A"]);
    return visited.join("");
  };

  const postorder = () => {
    let visited = [];
    function traverse(node) {
      if (t[node.left]) traverse(t[node.left]);
      if (t[node.right]) traverse(t[node.right]);
      visited.push(node.value);
    }
    traverse(t["A"]);
    return visited.join("");
  };

  console.log(preorder());
  console.log(inorder());
  console.log(postorder());
}