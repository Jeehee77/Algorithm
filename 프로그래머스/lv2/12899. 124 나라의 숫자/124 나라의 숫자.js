function solution(n) {
    /* 
     1. n을 3으로 나눈 몫 a와 나머지 b를 구한다.
     2. a가 3보다 크다면 다시 a를 3으로 나누어 몫과 나머지를 구한다.
     3. 이때 나머지가 0이라면 a = a - 1, b = 3으로 대체한다.
     3. 더 이상 몫이 3보다 크지 않을 때까지 위의 과정을 반복한 후 몫과 나머지를 순서대로 나열한다.
     4. 모든 '3'을 '4'로 바꿔준다.
     
     37 -> a=12, b=1 -> a1=4, b1=0, b=1 -> a1=3, b1=3, b=1 -> 331 -> 441
    */
    
    const nums = [0, 1, 2, 4];
    let quotient = n;
    let remainder = 0;
    let answer = [n === 3 ? 4 : n];

    while (quotient > 3) {
        remainder = quotient % 3;
        quotient = parseInt(quotient / 3);

        if (remainder === 0) {
            remainder = 3;
            quotient -= 1;
        }
        
        answer.pop();
        answer.push(remainder === 3 ? 4 : remainder);
        answer.push(quotient === 3 ? 4 : quotient);
    }
    
    return answer.reverse().join('');
}