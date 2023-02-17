function solution(arr, divisor) {
    var answer = [];
    
    arr.forEach((n) => {
        if (n % divisor === 0) answer.push(n);
    })
    
    if (!answer.length) answer.push(-1);
    
    return answer.sort((a, b) => a - b);
}