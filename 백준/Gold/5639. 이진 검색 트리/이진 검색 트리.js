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
  const preorder = input.map(Number);
  const tree = new BST(preorder[0]);

  for (let i = 1; i < preorder.length; i++) {
    tree.insert(preorder[i]);
  }
  tree.postorder();
}

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    }

    if (value > this.value) {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }

  postorder() {
    if (this.left) {
      this.left.postorder();
    }
    if (this.right) {
      this.right.postorder();
    }
    console.log(this.value);
  }
}