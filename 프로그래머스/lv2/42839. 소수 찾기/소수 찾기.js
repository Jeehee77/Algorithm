function solution(numbers) {
    const answer = [];
    for (let i = 0; i < numbers.length; i++) {
        makeNumber(numbers, i+1, [], answer);
    }
    return answer.length;
}

function makeNumber(numbers, toPick, picked, result) {
    /*
        - numbers에서 toPick만큼 index를 뽑아 완성 시킨 경우.
        - 뽑은 index를 기반으로 숫자를 만들고 소수인지 판별하여 소수면 result에 추가한다.
    */
    if (toPick === 0) {
        let num = Number(picked.map((n) => numbers[n]).join(''));
        if (isPrime(num) && !result.includes(num)) {
            result.push(num);
        }
        return;
    }
    
    /* 
        - numbers의 index 중 하나를 뽑아서 picked에 넣고 재귀호출을 한다.
        - 이미 뽑힌 index는 다시 뽑힐 수 없다.
        - 재귀호출이 종료되면 picked에 추가했던 index를 제거한다.
    */
    for (let i = 0; i < numbers.length; i++) {
        if (!picked.includes(i)) {
            picked.push(i);
            makeNumber(numbers, toPick - 1, picked, result);
            picked.pop();
        }
    }
}

/*
    - n이 소수인지 판별하는 함수.
    - n을 2부터 n의 제곱근 까지의 수로 나눈다.
    - 나머지가 0이 되는 경우가 존재하지 않는다면 n은 소수이다.
*/
function isPrime(n) {
    if (n <= 1) return false;
    
    const sqrt = Math.sqrt(n);
    
    for (let i = 2; i <= sqrt; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    
    return true;
}