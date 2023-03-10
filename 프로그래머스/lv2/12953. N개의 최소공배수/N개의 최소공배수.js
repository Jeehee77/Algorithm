function solution(arr) {
    /*
        - a와 b의 최소공배수는 a * b를 a와 b의 최대공약수로 나눈 값이다.
        
        - arr의 제일 작은 수 두 개 a와 b를 배열에서 제거하고 a와 b의 최소공배수를 배열에 넣는다.
        - 위 과정을 배열에 최소공배수 하나만 남을때까지 반복한다.
    */
    var answer = 0;
    arr.sort((a, b) => b - a);
    
    while(arr.length > 1) {
        let a = arr.pop();
        let b = arr.pop();
        
        // a와 b의 최소공배수(the least common multiple)를 찾아 arr에 넣는다. 
        let LCM = (a * b) / getGCD(a,b);
        arr.push(LCM);
    }
    
    return arr.pop();
}
// greatest common denominator 두 수의 최대공약수를 찾는다.
function getGCD(a, b) {
    for (let i = a; i > 0; i--) {
        if (a % i === 0 && b % i === 0) return i;
    }
}
