function solution(p) {
    if (p.length === 0) return '';
    p = convertToCorrect(p);
    return p;
}

function convertToCorrect(p) {
    if (correctBracket(p)) return p;
    
    let [u, v] = seperate(p);
    if (correctBracket(u)) {
        return u + convertToCorrect(v);
    } else {
        let result = '(' + convertToCorrect(v) + ')';
        return result + changeDirection(u.slice(1, -1));
    }
}

// 문자열 p를 균형잡힌 괄호 문자열 u, v로 분리
function seperate(p) {
    const result = [];
    let left = 0;
    let right = 0;
    for (let i = 0; i < p.length; i++) {
        if (p[i] === '(') {
            left = left + 1;
        }
        if (p[i] === ')') {
            right = right + 1;
        }
        
        if (left === right) {
            result.push(p.slice(0, i+1));
            result.push(p.slice(i+1));
            break;
        }
    }
    return result;
}

// 괄호 방향을 뒤집은 문자열을 반환
function changeDirection(p) {
    let result = '';
    for (let i = 0; i < p.length; i++) {
        if (p[i] === '(') result += ')';
        if (p[i] === ')') result += '(';
    }
    return result;
}

// p가 올바른 괄호 문자열인지 검사하는 함수
function correctBracket(p) {
    const stack = [];
    for (let i = 0; i < p.length; i++) {
        let last = stack[stack.length - 1];
        
        if (last === '(' && p[i] === ')') {
            stack.pop();
        } else {
            stack.push(p[i]);
        }
    }
    return stack.length === 0;
}