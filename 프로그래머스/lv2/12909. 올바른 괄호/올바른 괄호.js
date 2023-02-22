function solution(s){
    var answer = true;

    let stack = [];
    for (i of s) {
        if (i === ')' && stack[stack.length - 1] === '(') {
            stack.pop();
        } else {
            stack.push(i);
        }
    }

    return stack.length === 0;
}