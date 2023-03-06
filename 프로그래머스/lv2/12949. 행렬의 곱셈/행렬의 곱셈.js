function solution(arr1, arr2) {
    /*
        a가 N * M 크기이고, b가 M * O 크기일 때 a에 b를 곱한 결과는 N * O 크기이다.
    */
    
    const N = arr1.length;
    const M = arr1[0].length;
    const O = arr2[0].length;
    const answer = Array.from(Array(N), () => new Array(O));
    
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < O; j++) {
            let sum = 0;
            for (let k = 0; k < M; k++) {
                sum += arr1[i][k] * arr2[k][j]; 
            }
            answer[i][j] = sum;
        }
    }
    return answer;
}