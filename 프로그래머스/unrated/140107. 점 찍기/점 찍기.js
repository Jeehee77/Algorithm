function solution(k, d) {
    
    /*
        - (a*k, 0), (0, b*k), (a*k, b*k)와 같은 형태의 점들을 찍을 수 있다.
        - a와 b는 1부터 d까지 k만큼 커진다.
        - a를 결정한 후 조건에 맞는 b의 개수를 센다.
    */
    let answer = 0;
    for (let i = 0; i <= d; i += k) {
        // a가 i일 때 b의 최대값을 구한다.
        let max_b = Math.floor(Math.sqrt(d*d - i*i));
        // b는 0부터 max_b사이에 존재하는 k의 배수이다.
        answer += Math.floor(max_b / k) + 1
    }
    return answer;
}