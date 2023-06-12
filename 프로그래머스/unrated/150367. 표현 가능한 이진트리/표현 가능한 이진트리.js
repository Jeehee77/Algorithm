/*
    - 주어진 이진수를 가지고 이진트리를 형상화할 수 있다.
      - 포화이진트리가 되도록 이진수의 길이가 (2**n + 1)의 형태가 될때까지 앞에 '0'을 더해준다.
      - 이진수의 길이가 l이라고 하면 포화이진트리의 루트는 중앙값인 Math.floor(l / 2)가 된다.
      - 0번 ~ mid-1번까지는 왼쪽 서브트리의 노드이고, mid+1 ~ l-1까지는 오른쪽 서브트리의 노드가 된다.
    - 부모노드가 0이고 자식노드가 1이라면 이진트리로 표현 불가능한 수이다.
    - 가공된 이진수를 가지고 이진탐색을 하여 표현 가능 여부를 판단한다.
*/
function solution(numbers) {
    let result = [];
    numbers.forEach(n => {
        let binary = n.toString(2);
        // 포화이진트리 만들기
        let temp = Math.log2(binary.length + 1);
        let pre = ''; // 앞에 덧붙일 문자열
        while (!Number.isInteger(temp)) {
            pre += '0';
            temp = Math.log2(binary.length + pre.length + 1);
        }
        binary = pre + binary;
        
        // 트리 검사
        result.push(isPossible(binary, 0, binary.length - 1) ? 1 : 0);
    });
    return result;
}

function isPossible(input, from, to) {
    if (from === to) return true;
    
    let rootIdx = Math.floor((from + to) / 2);
    let leftIdx = Math.floor((from + rootIdx - 1) / 2);
    let rightIdx = Math.floor((rootIdx + 1 + to) / 2);
    if (input[rootIdx] === '0' && 
        (input[leftIdx] === '1' || input[rightIdx] === '1')) {
        return false;
    }
    
    // 왼쪽 서브트리, 오른쪽 서브트리 검사
    if (isPossible(input, from, rootIdx - 1)) {
        return isPossible(input, rootIdx + 1, to);
    } else {
        return false;
    }
}