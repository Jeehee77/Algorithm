function solution(arr) {
    return compression(arr);
}

/*
    arr의 0의 개수와 1의 개수를 구하는 함수
    - arr의 크기가 1일때 arr[0][0]이 0이면 zero + 1, 1이면 one + 1.
    - arr의 모든 숫자가 다 같을 때 arr[0][0]이 0이면 zero + 1, 1이면 one + 1.
    - arr의 모든 숫자가 같지 않다면 4개의 사각형으로 범위를 나누어 계산한다.
*/
function compression(arr, zero = 0, one = 0) {
    if (arr.length === 1) {
        if (arr[0][0] === 0) zero += 1;
        if (arr[0][0] === 1) one += 1;
        return [zero, one];
    }
    
    if (isSame(arr)) {
        if (arr[0][0] === 0) zero += 1;
        if (arr[0][0] === 1) one += 1;
        return [zero, one];
    } else {
        // 4개의 정사각형으로 나누기
        let n = arr.length / 2;
        let first = arr.slice(0, n).map(a => a.slice(0, n));
        let second = arr.slice(0, n).map(a => a.slice(n));
        let third = arr.slice(n).map(a => a.slice(0, n));
        let fourth = arr.slice(n).map(a => a.slice(n));
        
        // 4개의 작은 정사각형 각각의 0과 1의 개수를 더하여 반환한다.
        let r = [];
        r.push(compression(first));
        r.push(compression(second));
        r.push(compression(third));
        r.push(compression(fourth));
        return r.reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]]);
    }
}

// arr이 모두 한 숫자로 이루어졌는지 검사하는 함수
function isSame(arr) {
    let target = arr[0][0];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (target !== arr[i][j]) {
                return false;
            }
        }
    }
    return true;
}