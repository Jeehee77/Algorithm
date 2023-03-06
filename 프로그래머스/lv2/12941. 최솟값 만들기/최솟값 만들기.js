function solution(A,B){
    var answer = 0;
    const N = A.length;
    
    A = A.sort((a, b) => a - b);
    B = B.sort((a, b) => b - a);
    
    for (let i = 0; i < N; i++) {
        answer += A[i] * B[i];
    }

    return answer;
}