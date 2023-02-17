function solution(a, b) {
    var answer = 0;
    let bigger = a > b ? a : b;
    let smaller = a < b ? a : b;
    
    for (let i = smaller; i <= bigger; i++) {
        answer += i;
    }
    
    return answer;
}