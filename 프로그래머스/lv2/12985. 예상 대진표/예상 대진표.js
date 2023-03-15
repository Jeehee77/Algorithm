function solution(n,a,b)
{
    /*
        a가 현재 라운드에서 이기면 
        다음 라운드에서는 a가 홀수라면 (a / 2) + 1, a가 짝수라면 a / 2번째 번호를 받게 된다.
        
        a와 b가 매치에서 붙게 되려면 
        - a와 b의 차이가 1이어야 한다.
        - a와 b 중 작은 수가 홀수여야 한다.
    */
    let round = 1;
    while (Math.abs(a - b) > 1 || Math.min(a, b) % 2 !== 1 ) {
        a = parseInt(a / 2) + a % 2;
        b = parseInt(b / 2) + b % 2;
        min = Math.min(a, b);
        round++;
    }
    return round;
}