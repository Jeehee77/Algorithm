function solution(n)
{
    // 거꾸로 생각해보기
    let jump = 0;
    
    while (n > 0) {
        if (n % 2 === 1) {
            n--;
            jump++;
        } else {
            n /= 2;
        }
    }
    
    return jump;
}