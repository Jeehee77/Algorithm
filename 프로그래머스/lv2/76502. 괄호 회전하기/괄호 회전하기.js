function solution(s) {
    var answer = 0;
    
    for (let i = 0; i < s.length; i++) {
        // i만큼 회전하였을때 문자열인 cur_s가 올바른 괄호 문자열이라면 answer + 1.
        let stack = [];
        let cur_s = s.slice(i) + s.slice(0, i);
        if (isCorrect(cur_s)) answer += 1;
    }
    return answer;
}

// s가 올바른 괄호 문자열인지 검사하는 함수
function isCorrect(s) {
    const stack = [s[0]];
    
    for (let i = 1; i < s.length; i++) {
        let last = stack[stack.length-1];
        let cur = s[i];
        
        if ((last === '(' && cur === ')') || (last === '{' && cur === '}')
            || (last === '[' && cur === ']')) {
            stack.pop();
        } else {
            stack.push(cur);
        }
    }
    
    return stack.length === 0;
}